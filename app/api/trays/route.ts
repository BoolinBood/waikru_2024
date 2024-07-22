import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import TrayModel from '@/app/models/TrayModel';

export async function GET() {
    try {
        await dbConnect()
        const trays = await TrayModel.find({})
        return NextResponse.json(trays)
    } catch (error) {
        return NextResponse.json({ error: "Failed to connect" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
      await dbConnect()
      const body = await request.json()
      const newTray = new TrayModel(body)
      const savedTray = await newTray.save()
      return NextResponse.json({ message: "Tray created successfully", tray: savedTray }, { status: 201 })
    } catch (error) {
      return NextResponse.json({ error: "Failed to create tray", details: error.message }, { status: 500 })
    }
  }