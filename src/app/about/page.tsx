import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
};

const timeline = [
  { year: "2023", event: "大学に入学しプログラミングを始める" },
  { year: "2024", event: "山梨AIハッカソン出場「nashitora」開発" },
  { year: "2026", event: "「otoAgora」開発" },
  { year: "2026", event: "ポートフォリオサイト開設" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 space-y-20">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">About</p>
        <h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
        <p className="text-lg text-muted-foreground">{profile.role}</p>
      </div>

      {/* Bio + Timeline */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Profile</h2>
            <div className="space-y-3">
              {profile.bio.split("\n").map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
              ))}
            </div>
          </div>

          <Separator />

          {/* Education */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Education</h2>
            <p className="text-sm font-medium">{profile.education.school}</p>
            <p className="text-sm text-muted-foreground">{profile.education.faculty} {profile.education.department}</p>
            <p className="text-sm text-muted-foreground">{profile.education.graduation}</p>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Timeline</h2>
          <ol className="relative border-l border-border/60 space-y-8 ml-3">
            {timeline.map(({ year, event }, i) => (
              <li key={i} className="pl-6">
                <span className="absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-border ring-4 ring-background" />
                <p className="text-xs text-muted-foreground mb-1">{year}</p>
                <p className="text-sm font-medium">{event}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Separator />

      {/* Strengths */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">Strengths</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {profile.strengths.map((s) => (
            <div key={s.title} className="space-y-2">
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Seeking */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Seeking</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">志望職種</p>
            <div className="flex flex-wrap gap-2">
              {profile.seeking.types.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">興味分野</p>
            <div className="flex flex-wrap gap-2">
              {profile.seeking.interests.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">就業形態</p>
            <p className="text-sm font-medium">{profile.seeking.workStyle}</p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      {profile.certifications.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Certifications</h2>
            <ul className="space-y-2">
              {profile.certifications.map((c) => (
                <li key={c.name} className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{c.year}</span>
                  <span className="font-medium">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Experience</h2>
            <div className="space-y-6">
              {profile.experience.map((e) => (
                <div key={e.role + e.org} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{e.role}</p>
                    <span className="text-xs text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                  {e.desc && <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
