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
  images: string[]; // Vercel Blob URLs or local /images/ paths
  tikkieUrl?: string;
}

export interface ContentSection {
  key: string;
  label: string;
  value: string;
}

const SEED_EVENTS: Event[] = [
  {
    id: "1",
    title: "Punchcard Party!",
    date: "1st February",
    time: "2pm - 5pm",
    location: "Central Library, Librijesteeg, Rotterdam",
    description: "Join us for an afternoon of punchcard crafting! Bring your favorite scraps and create unique paper art.",
    isPast: false,
    registrationOpen: true,
    spotsLeft: 8,
    images: [],
  },
  {
    id: "2",
    title: "Zine Making Workshop",
    date: "23rd November",
    time: "2pm - 5pm",
    location: "Central Library, Rotterdam",
    description: "Learn the art of zine making! Bring scissors and a glue stick. All other materials provided.",
    isPast: false,
    registrationOpen: true,
    spotsLeft: 5,
    images: [],
  },
  {
    id: "3",
    title: "Collage Night",
    date: "15th December",
    time: "6pm - 9pm",
    location: "Central Library, Rotterdam",
    description: "Evening session perfect for after-work creativity. Snacks and drinks provided!",
    isPast: false,
    registrationOpen: false,
    images: [],
  },
  {
    id: "past-1",
    title: "Punchcard Party",
    date: "January 2026",
    time: "2pm - 5pm",
    location: "Central Library, Rotterdam",
    description: "Our first punchcard crafting session of 2026!",
    isPast: true,
    registrationOpen: false,
    images: ["/images/punchcard1.jpeg", "/images/punchcard2.jpeg"],
  },
  {
    id: "past-2",
    title: "Junk Journal Basics",
    date: "July 2024",
    time: "2pm - 5pm",
    location: "Central Library, Rotterdam",
    description: "Introduction to junk journaling for beginners.",
    isPast: true,
    registrationOpen: false,
    images: [],
  },
];

export async function getEvents(): Promise<Event[]> {
  const events = await kv.get<Event[]>("events");
  return events ?? SEED_EVENTS;
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
