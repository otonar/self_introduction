import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { works } from "@/data/works";
import WorkCard from "@/components/WorkCard";

export default function Home() {
  const featured = works.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex min-h-[calc(60vh-4rem)] flex-col justify-center py-18">
        <div className="flex flex-col-reverse items-center gap-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-6 max-w-2xl">
          {profile.available && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for work
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight leading-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="text-base text-muted-foreground font-medium sm:text-xl">
            {profile.role}
          </p>
          <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
            {profile.tagline}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </div>
          <div className="flex gap-4 pt-2">
            <Link href="/works" className={buttonVariants()}>
              Works を見る <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
              Contact
            </Link>
          </div>
        </div>
        <img
          src="https://api.dicebear.com/9.x/lorelei/svg?seed=f73202d5-4759-4da6-"
          alt="avatar"
          className="w-50 h-50 rounded-full shrink-0 sm:w-52 sm:h-52"
        />
        </div>
      </section>

      {/* Skills */}
      <section className="py-6 border-t border-border/40">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-5 border-t border-border/40">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Featured Works
          </h2>
          <Link
            href="/works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            すべて見る <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </section>
    </div>
  );
}
