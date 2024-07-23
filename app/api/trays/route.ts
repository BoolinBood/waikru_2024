import { NextRequest, NextResponse } from 'next/server';
import TrayModel from '@/app/models/TrayModel';

export async function GET() {
    try {
        const trays = await TrayModel.find({})
        return NextResponse.json(trays)
    } catch (error) {
        return NextResponse.json({ error: "Failed to connect" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const newTray = new TrayModel(body)
      const savedTray = await newTray.save()
      return NextResponse.json({ message: "Tray created successfully", tray: savedTray }, { status: 201 })
    } catch (error : any) {
      return NextResponse.json({ error: "Failed to create tray", details: error.message }, { status: 500 })
    }
  }


  export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: "Tray ID is required" }, { status: 400 })
        }

        const deletedTray = await TrayModel.findByIdAndDelete(id)
        if (!deletedTray) {
            return NextResponse.json({ error: "Tray not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Tray deleted successfully", tray: deletedTray })
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to delete tray", details: error.message }, { status: 500 })
    }
}