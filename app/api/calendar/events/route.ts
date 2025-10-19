import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { GoogleCalendarService } from "@/lib/google-calendar";

export async function GET() {
  const session = await getServerSession();
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const calendarService = new GoogleCalendarService(session.accessToken);
    const events = await calendarService.listEvents();
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const calendarService = new GoogleCalendarService(session.accessToken);
    const event = await calendarService.createEvent(body);
    return NextResponse.json({ event });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}