import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../lib/db';

export async function GET() {
  try {
    await dbConnect()
    return NextResponse.json({ message: "Connected successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect" }, { status: 500 })
  }
}