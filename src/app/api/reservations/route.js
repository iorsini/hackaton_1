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

    let query = {};
    if (roomId) query.room = roomId;
    if (date) query.date = new Date(date);

    const reservations = await Reservation.find(query)
      .populate('room')
      .sort({ date: 1, startTime: 1 });

    return NextResponse.json({ success: true, data: reservations });
  } catch (error) {
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

    // Verificar conflitos de horário
    const conflicts = await Reservation.find({
      room: body.room,
      date: new Date(body.date),
      status: { $ne: 'cancelled' },
      $or: [
        { startTime: { $lt: body.endTime }, endTime: { $gt: body.startTime } }
      ]
    });

    if (conflicts.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Horário já reservado' },
        { status: 409 }
      );
    }

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
    }

    return NextResponse.json(
      { success: true, data: populatedReservation },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}