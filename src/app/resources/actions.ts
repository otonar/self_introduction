"use server";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { removeResource } from "@/lib/resources";
import { safeEqual } from "@/lib/safe-equal";
import { checkRateLimit } from "@/lib/rate-limit";

const COOKIE_NAME = "resources_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function assertAuthenticated(): Promise<void> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  const secret = process.env.RESOURCES_SECRET;

  if (!cookie || !secret || !safeEqual(cookie.value, secret)) {
    throw new Error("Unauthorized");
  }
}

export async function login(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed } = checkRateLimit(`login:${ip}`);
  if (!allowed) {
    return { error: "試行回数が多すぎます。しばらく待ってから再試行してください。" };
  }

  const password = formData.get("password") as string;
  const expected = process.env.RESOURCES_PASSWORD ?? "";

  const valid = safeEqual(password, expected);

  if (!valid) {
    await new Promise((r) => setTimeout(r, 800));
    return { error: "パスワードが違います" };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, process.env.RESOURCES_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  redirect("/resources");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/resources/login");
}

export async function deleteResource(id: string): Promise<void> {
  await assertAuthenticated();
  await removeResource(id);
  redirect("/resources/admin");
}
