import { NextResponse } from "next/server";
import { getContent, setContent } from "@/lib/kv";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const { key, value } = await request.json();
  const content = await getContent();
  content[key] = value;
  await setContent(content);
  return NextResponse.json({ ok: true });
}
