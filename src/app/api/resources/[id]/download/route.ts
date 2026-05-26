import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { safeEqual } from "@/lib/safe-equal";
import { getResourceById } from "@/lib/resources";

const COOKIE_NAME = "resources_auth";

const INLINE_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  const secret = process.env.RESOURCES_SECRET;

  if (!cookie || !secret || !safeEqual(cookie.value, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const resource = await getResourceById(id);

  if (!resource) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const blobRes = await fetch(resource.blobUrl);
  if (!blobRes.ok) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const contentType =
    blobRes.headers.get("Content-Type") ?? "application/octet-stream";
  const disposition = INLINE_TYPES.has(contentType) ? "inline" : "attachment";
  const safeFilename = encodeURIComponent(resource.filename);

  return new NextResponse(blobRes.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${disposition}; filename*=UTF-8''${safeFilename}`,
      "Cache-Control": "private, no-store",
    },
  });
}
