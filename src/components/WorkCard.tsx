import Link from "next/link";
import { ExternalLink, GitBranch } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Work } from "@/data/works";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{work.year}</p>
            <Link
              href={`/works/${work.slug}`}
              className="font-semibold hover:underline underline-offset-4 leading-snug"
            >
              {work.title}
            </Link>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge variant="outline" className="text-xs">
              {work.category}
            </Badge>
            {work.status === "planned" && (
              <Badge variant="secondary" className="text-xs">
                計画中
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {work.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {work.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{work.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="gap-3 pt-4">
        {work.githubUrl && (
          <a
            href={work.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GitBranch className="h-4 w-4" />
          </a>
        )}
        {work.demoUrl && (
          <a
            href={work.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Demo"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
