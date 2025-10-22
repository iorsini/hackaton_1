import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reservation from '@/models/Reservation';
import Room from '@/models/Room';
import { sendReservationEmail } from '@/lib/mail';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');
    const date = searchParams.get('date');

    let query = { status: { $ne: 'cancelled' } };
    if (roomId) query.room = roomId;
    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      query.date = { $gte: selectedDate, $lt: nextDay };
    }

    const reservations = await Reservation.find(query)
      .populate('room')
      .sort({ date: 1, startTime: 1 });

    return NextResponse.json({ success: true, data: reservations });
  } catch (error) {
    console.error('Erro GET /api/reservations:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validações básicas
    if (!body.room || !body.date || !body.startTime || !body.endTime) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Converter horários para números para comparação
    const startTimeNum = parseInt(body.startTime.replace(':', ''));
    const endTimeNum = parseInt(body.endTime.replace(':', ''));

    if (endTimeNum <= startTimeNum) {
      return NextResponse.json(
        { success: false, error: 'Horário de fim deve ser posterior ao horário de início' },
        { status: 400 }
      );
    }

    // Verificar conflitos de horário detalhadamente
    const selectedDate = new Date(body.date);
    const nextDay = new Date(body.date);
    nextDay.setDate(nextDay.getDate() + 1);

    const existingReservations = await Reservation.find({
      room: body.room,
      date: { $gte: selectedDate, $lt: nextDay },
      status: { $ne: 'cancelled' }
    });

    // Verificar cada reserva existente
    for (const reservation of existingReservations) {
      const existingStart = parseInt(reservation.startTime.replace(':', ''));
      const existingEnd = parseInt(reservation.endTime.replace(':', ''));

      // Verifica se há sobreposição de horários
      const hasOverlap = (
        (startTimeNum >= existingStart && startTimeNum < existingEnd) ||
        (endTimeNum > existingStart && endTimeNum <= existingEnd) ||
        (startTimeNum <= existingStart && endTimeNum >= existingEnd)
      );

      if (hasOverlap) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Esta sala já está reservada das ${reservation.startTime} às ${reservation.endTime}` 
          },
          { status: 409 }
        );
      }
    }

    // Criar a reserva
    const reservation = await Reservation.create(body);
    const populatedReservation = await Reservation.findById(reservation._id).populate('room');

    // Enviar email de confirmação (opcional)
    try {
      await sendReservationEmail({
        to: body.userEmail,
        reservation: populatedReservation,
        room: populatedReservation.room,
      });
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError);
      // Não falhar a reserva por causa do email
    }

    return NextResponse.json(
      { success: true, data: populatedReservation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro POST /api/reservations:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}