import { kv } from "@vercel/kv";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isPast: boolean;
  registrationOpen: boolean;
  spotsLeft?: number;
  images: string[]; // Vercel Blob URLs
}

export interface ContentSection {
  key: string;
  label: string;
  value: string;
}

export async function getEvents(): Promise<Event[]> {
  const events = await kv.get<Event[]>("events");
  return events ?? [];
}

export async function setEvents(events: Event[]): Promise<void> {
  await kv.set("events", events);
}

export async function getContent(): Promise<Record<string, string>> {
  const content = await kv.get<Record<string, string>>("content");
  return content ?? {};
}

export async function setContent(content: Record<string, string>): Promise<void> {
  await kv.set("content", content);
}
