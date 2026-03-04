import { NextResponse } from "next/server";
import { getContent } from "@/lib/kv";

export async function GET() {
  const content = await getContent();
  return NextResponse.json({ url: content["site:logo"] ?? null });
}
