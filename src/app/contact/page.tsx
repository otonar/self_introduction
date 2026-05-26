import type { Metadata } from "next";
import { GitBranch, X, Mail, BookOpen, Camera } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
};

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <GitBranch className="h-5 w-5" />,
  "Twitter / X": <X className="h-5 w-5" />,
  Qiita: <BookOpen className="h-5 w-5" />,
  Instagram: <Camera className="h-5 w-5" />,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="space-y-2 mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Contact
        </p>
        <h1 className="text-4xl font-bold tracking-tight">連絡先・SNS</h1>
        <p className="text-muted-foreground">
          お気軽にご連絡ください。お仕事のご依頼もお待ちしています。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Email */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Email
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="text-lg font-medium hover:underline underline-offset-4 transition-colors"
          >
            {profile.email}
          </a>
        </div>

        {/* SNS */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Social
          </h2>
          <ul className="space-y-4">
            {profile.sns.map(({ name, url, handle }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {iconMap[name] ?? <Mail className="h-5 w-5" />}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">{handle}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
