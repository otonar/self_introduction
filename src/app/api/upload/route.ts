import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import { addResource } from "@/lib/resources";
import type { ResourceType } from "@/lib/resources";
import { safeEqual } from "@/lib/safe-equal";
import { validateMagicBytes } from "@/lib/magic-bytes";

const COOKIE_NAME = "resources_auth";
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const MAX_TITLE = 255;
const MAX_SUBJECT = 255;
const MAX_YEAR = 50;
const MAX_DESC = 2000;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "application/zip",
]);

const VALID_EXTENSIONS: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
  "application/zip": [".zip"],
};

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  const secret = process.env.RESOURCES_SECRET;

  if (!cookie || !secret || !safeEqual(cookie.value, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string | null)?.trim();
  const subject = (formData.get("subject") as string | null)?.trim();
  const year = (formData.get("year") as string | null)?.trim();
  const type = (formData.get("type") as ResourceType) ?? "other";
  const description = (formData.get("description") as string | null)?.trim() ?? "";

  if (!file || file.size === 0)
    return NextResponse.json({ error: "ファイルを選択してください" }, { status: 400 });
  if (!title)
    return NextResponse.json({ error: "タイトルを入力してください" }, { status: 400 });
  if (title.length > MAX_TITLE)
    return NextResponse.json({ error: `タイトルは${MAX_TITLE}文字以内にしてください` }, { status: 400 });
  if (!subject)
    return NextResponse.json({ error: "科目名を入力してください" }, { status: 400 });
  if (subject.length > MAX_SUBJECT)
    return NextResponse.json({ error: `科目名は${MAX_SUBJECT}文字以内にしてください` }, { status: 400 });
  if (!year)
    return NextResponse.json({ error: "年度・学期を入力してください" }, { status: 400 });
  if (year.length > MAX_YEAR)
    return NextResponse.json({ error: `年度・学期は${MAX_YEAR}文字以内にしてください` }, { status: 400 });
  if (description.length > MAX_DESC)
    return NextResponse.json({ error: `説明は${MAX_DESC}文字以内にしてください` }, { status: 400 });

  if (!ALLOWED_MIME_TYPES.has(file.type))
    return NextResponse.json(
      { error: "このファイル形式は許可されていません（PDF・Office・画像・ZIP のみ）" },
      { status: 400 }
    );

  // Validate file extension matches declared MIME type
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!VALID_EXTENSIONS[file.type]?.includes(ext))
    return NextResponse.json(
      { error: "ファイルの拡張子がファイル形式と一致しません" },
      { status: 400 }
    );

  if (file.size > MAX_FILE_SIZE)
    return NextResponse.json(
      { error: "ファイルサイズは 50MB 以下にしてください" },
      { status: 400 }
    );

  const headerBuffer = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (!validateMagicBytes(headerBuffer, file.type))
    return NextResponse.json(
      { error: "ファイルの内容がファイル形式と一致しません" },
      { status: 400 }
    );

  const safeName = file.name
    .replace(/[^a-zA-Z0-9.\-_]/g, "_")
    .replace(/^\.+/, "")
    .replace(/\.{2,}/g, "_")
    .slice(0, 255);

  const blob = await put(`resources/files/${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  await addResource({
    title,
    subject,
    year,
    type,
    description,
    blobUrl: blob.url,
    filename: file.name,
  });

  return NextResponse.json({ success: true });
}
