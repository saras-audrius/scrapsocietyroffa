export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  registrationOpen: boolean;
  spotsLeft?: number;
}

// Sample events data - replace with your actual events or connect to a CMS
export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Punchcard Party!",
    date: "1st February",
    time: "2pm - 5pm",
    location: "Central Library, Librijesteeg, Rotterdam",
    description:
      "Join us for an afternoon of punchcard crafting! Bring your favorite scraps and create unique paper art.",
    registrationOpen: true,
    spotsLeft: 8,
  },
  {
    id: "2",
    title: "Zine Making Workshop",
    date: "23rd November",
    time: "2pm - 5pm",
    location: "Central Library, Rotterdam",
    description:
      "Learn the art of zine making! Bring scissors and a glue stick. All other materials provided.",
    registrationOpen: true,
    spotsLeft: 5,
  },
  {
    id: "3",
    title: "Collage Night",
    date: "15th December",
    time: "6pm - 9pm",
    location: "Central Library, Rotterdam",
    description:
      "Evening session perfect for after-work creativity. Snacks and drinks provided!",
    registrationOpen: false,
  },
];

export const pastEvents: Event[] = [
  {
    id: "past-1",
    title: "Summer Scrap Session",
    date: "August 2024",
    time: "2pm - 5pm",
    location: "Craft Park Rotterdam",
    description: "Our outdoor summer special at Craft Park!",
    registrationOpen: false,
  },
  {
    id: "past-2",
    title: "Junk Journal Basics",
    date: "July 2024",
    time: "2pm - 5pm",
    location: "Central Library, Rotterdam",
    description: "Introduction to junk journaling for beginners.",
    registrationOpen: false,
  },
];
