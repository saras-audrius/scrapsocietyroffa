import { NextResponse } from "next/server";
import { list, del } from "@vercel/blob";

export async function GET() {
  const { blobs } = await list();
  return NextResponse.json(blobs);
}

export async function DELETE(request: Request) {
  const { url } = await request.json();
  await del(url);
  return NextResponse.json({ ok: true });
}
