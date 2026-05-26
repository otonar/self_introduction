import { del } from "@vercel/blob";
import { eq, ilike, or, desc } from "drizzle-orm";
import { getDb } from "@/db";
import { resources } from "@/db/schema";

export type { Resource } from "@/db/schema";
export type ResourceType = "slides" | "notes" | "report" | "other";

export type NewResourceInput = {
  title: string;
  subject: string;
  year: string;
  type: ResourceType;
  description: string;
  blobUrl: string;
  filename: string;
};

export async function getResources(query?: string) {
  const db = getDb();
  if (query?.trim()) {
    const q = query.trim();
    return db
      .select()
      .from(resources)
      .where(
        or(
          ilike(resources.title, `%${q}%`),
          ilike(resources.subject, `%${q}%`),
          ilike(resources.year, `%${q}%`),
          ilike(resources.description, `%${q}%`)
        )
      )
      .orderBy(desc(resources.uploadedAt))
      .limit(200);
  }
  return db.select().from(resources).orderBy(desc(resources.uploadedAt)).limit(200);
}

export async function addResource(input: NewResourceInput): Promise<void> {
  await getDb().insert(resources).values(input);
}

export async function getResourceById(id: string) {
  const db = getDb();
  const [resource] = await db
    .select()
    .from(resources)
    .where(eq(resources.id, id));
  return resource ?? null;
}

export async function removeResource(id: string): Promise<void> {
  const db = getDb();
  const [resource] = await db
    .select()
    .from(resources)
    .where(eq(resources.id, id));

  if (resource) {
    await del(resource.blobUrl);
  }

  await db.delete(resources).where(eq(resources.id, id));
}
