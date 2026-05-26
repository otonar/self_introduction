import Link from "next/link";
import { Lock } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 mt-24">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.nameEn}</span>
        <div className="flex items-center gap-6">
          <Link
            href="/resources"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            aria-label="Resources"
          >
            <Lock className="h-3 w-3" />
            <span className="text-xs">Resources</span>
          </Link>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
