import { NextResponse } from "next/server";
import { getEvents, setEvents } from "@/lib/kv";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const events = await getEvents();
  const idx = events.findIndex((e) => e.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  events[idx] = { ...events[idx], ...body, id };
  await setEvents(events);
  return NextResponse.json(events[idx]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const events = await getEvents();
  const filtered = events.filter((e) => e.id !== id);

  if (filtered.length === events.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await setEvents(filtered);
  return NextResponse.json({ ok: true });
}
