import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Room from '@/models/Room';

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find({ isActive: true }).sort({ name: 1 });
    return NextResponse.json({ success: true, data: rooms });
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
    const room = await Room.create(body);
    return NextResponse.json({ success: true, data: room }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}