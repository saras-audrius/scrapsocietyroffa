import { NextResponse } from "next/server";
import { getEvents, setEvents, type Event } from "@/lib/kv";
import { randomUUID } from "crypto";

export async function GET() {
  const events = await getEvents();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();
  const events = await getEvents();

  const newEvent: Event = {
    id: randomUUID(),
    title: body.title ?? "",
    date: body.date ?? "",
    time: body.time ?? "",
    location: body.location ?? "",
    description: body.description ?? "",
    isPast: body.isPast ?? false,
    registrationOpen: body.registrationOpen ?? true,
    spotsLeft: body.spotsLeft,
    images: body.images ?? [],
    tikkieUrl: body.tikkieUrl || undefined,
  };

  events.unshift(newEvent);
  await setEvents(events);
  return NextResponse.json(newEvent, { status: 201 });
}
