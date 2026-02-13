import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Globe,
  Check,
  ChevronLeft,
  ChevronRight,
  GripVerticalIcon,
  Copy,
  GitMerge,
  GitPullRequest,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type {
  ProfileData,
  WorkProject,
  OpenSourcePR,
  RunningServiceData,
  MaintainedProject,
  SocialLink,
} from "@/data/portfolio";
import { DiscordIcon, GithubIcon, GoogleIcon } from "./ui/custom-icon";

// ─── Block types ─────────────────────────────────────────────

export type BlockData =
  | { type: "profile"; data: ProfileData }
  | { type: "work"; data: WorkProject }
  | { type: "opensource"; data: OpenSourcePR[] }
  | { type: "service"; data: RunningServiceData }
  | { type: "project"; data: MaintainedProject }
  | { type: "contact"; data: SocialLink[] }
  | { type: "email"; data: string };

export function DataBlock({ block }: { block: BlockData }) {
  switch (block.type) {
    case "profile":
      return <ProfileBlock data={block.data} />;
    case "work":
      return <WorkBlock data={block.data} />;
    case "opensource":
      return <OpenSourceBlock data={block.data} />;
    case "service":
      return <ServiceBlock data={block.data} />;
    case "project":
      return <ProjectBlock data={block.data} />;
    case "email":
      return <EmailBlock data={block.data} />;
  }
}

// ─── Individual blocks ───────────────────────────────────────

function ProfileBlock({ data }: { data: ProfileData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const myConfetti = confetti.create(canvas, { resize: true });
    const colors = ["#a78bfa", "#38bdf8", "#fbbf24", "#e2e8f0", "#f472b6"];
    const timer = setTimeout(() => {
      myConfetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 1 },
        colors,
        ticks: 1000,
        gravity: 0.4,
        scalar: 0.6,
        disableForReducedMotion: true,
      });
      myConfetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 1 },
        colors,
        ticks: 1000,
        gravity: 0.4,
        scalar: 0.6,
        disableForReducedMotion: true,
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={cardRef}
      className="border rounded-xl p-5 bg-card relative overflow-hidden max-w-md mx-auto"
    >
      {/* Confetti canvas — contained inside card */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none "
      />

      {/* Decorative dots + X */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-1.5">
          <span className="w-8 h-2.5 rounded-full bg-foreground/25 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/13" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/8" />
        </div>
        {/* <span className="text-muted-foreground/30 text-xs select-none">✕</span> */}
        <div className="flex gap-1.5 shrink-0 ml-auto">
          {data.socialLinks.map((link, i) => (
            <ContactIconButton key={i} link={link} />
          ))}
        </div>
      </div>

      {/* Name + title */}
      <div className="flex items-center gap-2.5 mb-8 relative">
        <Avatar className="size-10">
          <AvatarImage src={data.avatarUrl} alt={data.name} />
          <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold leading-none">{data.name}</p>
          <p className="text-[8px] md:text-[11px] text-muted-foreground mt-0.5">
            {data.title} · {data.experience} · {data.location}
          </p>
        </div>
      </div>

      {/* Headline */}
      <h3 className="logo-text text-lg md:text-xl font-extrabold leading-tight tracking-tight whitespace-pre-line relative text-center">
        {data.headline}
      </h3>

      {/* Tagline with gradient fade */}
      <p className="text-xs mt-2.5 leading-relaxed relative bg-linear-to-r from-foreground/60 to-foreground/25 bg-clip-text text-transparent">
        {data.tagline}
      </p>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-1 mt-10 relative">
        {data.stack.slice(0, 6).map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="text-[10px] px-2 py-0.5 font-mono bg-input/60"
          >
            {tech}
          </Badge>
        ))}
        {data.stack.length > 6 && (
          <Badge
            variant="ghost"
            className="text-[10px] px-1.5 py-0 font-mono text-muted-foreground"
          >
            +{data.stack.length - 5}
          </Badge>
        )}
      </div>
    </div>
  );
}

function WorkBlock({ data }: { data: WorkProject }) {
  const faviconUrl = data.logoUrl
    ? `https://www.google.com/s2/favicons?domain=${new URL(data.logoUrl).hostname}&sz=64`
    : undefined;

  return (
    <div className="border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-2.5 mb-2">
        {faviconUrl && (
          <img src={faviconUrl} alt="" className="w-5 h-5 rounded shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate">{data.company}</h4>
          <p className="text-[10px] text-muted-foreground">{data.role}</p>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap shrink-0">
          {data.period}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
        {data.description}
      </p>
      <div className="flex flex-wrap gap-1 mt-3">
        {data.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-[10px] px-1.5 py-0 font-mono"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function formatStars(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
}

function OpenSourceBlock({ data }: { data: OpenSourcePR[] }) {
  const [repoStars, setRepoStars] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const uniqueRepos = [...new Set(data.map((pr) => pr.repo))];
    Promise.all(
      uniqueRepos.map((repo) =>
        fetch(`https://api.github.com/repos/${repo}`)
          .then((r) => r.json())
          .then((d) => [repo, d.stargazers_count] as const)
          .catch(() => [repo, null] as const),
      ),
    ).then((results) => {
      const map = new Map<string, string>();
      for (const [repo, stars] of results) {
        if (typeof stars === "number") {
          map.set(repo, formatStars(stars));
        }
      }
      setRepoStars(map);
    });
  }, [data]);

  return (
    <div className="overflow-hidden flex flex-col gap-1">
      {data.map((pr, i) => {
        const org = pr.repo.split("/")[0];
        const stars = repoStars.get(pr.repo);
        return (
          <a
            key={i}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card group border rounded-lg flex gap-2.5 p-3 hover:bg-accent items-center transition-colors"
          >
            <img
              src={`https://github.com/${org}.png?size=40`}
              alt=""
              className="w-5 h-5 rounded-full mt-0.5 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <p className="text-[10px] text-muted-foreground font-mono truncate">
                  {pr.repo}
                </p>
                {stars && (
                  <span className="ml-auto flex items-center gap-0.5 text-[9px] text-muted-foreground/70">
                    <Star className="size-2.5" />
                    {stars}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium truncate flex items-center gap-1.5">
                {pr.status === "merged" ? (
                  <GitMerge className="size-3 shrink-0 text-purple-500" />
                ) : (
                  <GitPullRequest className="size-3 shrink-0 text-green-500" />
                )}
                <span className="text-muted-foreground/60 font-mono text-[10px] shrink-0">
                  #{pr.prNumber}
                </span>
                <span className="truncate">{pr.title}</span>
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function ServiceBlock({ data }: { data: RunningServiceData }) {
  return (
    <div className="border rounded-lg overflow-hidden group shadow-xl bg-background">
      {/* header */}
      <div className="p-2 flex items-center justify-between gap-2 text-input bg-secondary border-b">
        <div className="flex items-center gap-1 flex-1">
          <div className="w-2 h-2 rounded-full bg-input" />
          <div className="w-2 h-2 rounded-full bg-input" />
          <div className="w-2 h-2 rounded-full bg-input" />
          <div className="size-4 flex items-center justify-center">
            <ChevronLeft />
          </div>
          <div className="size-4 flex items-center justify-center text-foreground/20">
            <ChevronRight />
          </div>
        </div>
        <span className="text-[8px] text-muted-foreground px-2 rounded py-0.5 bg-input">
          {data.url}
        </span>
        <div className="flex-1" />
      </div>
      {/* iframe preview */}
      <div className="bg-background">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full h-[300px] overflow-hidden bg-muted cursor-pointer"
        >
          <iframe
            src={data.url}
            title={data.name}
            className="absolute top-0 left-0 w-[300%] h-[300%] origin-top-left scale-[0.3333] pointer-events-none"
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
            style={{ overflow: "hidden" }}
          />
          <div className="absolute inset-0 bg-transparent group-hover:bg-foreground/5 transition-colors" />
        </a>
      </div>
      {/* info */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h4 className="font-bold">{data.name}</h4>
          <Badge
            // variant="outline"
            className="text-[10px] px-2 py-0.5 font-mono"
          >
            {data.stats}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2.5 justify-end">
          {data.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[8px] px-2 py-1 font-mono bg-input"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

const ghStarsCache = new Map<string, string>();

function useGitHubStars(url: string): string | null {
  const [stars, setStars] = useState<string | null>(null);

  useEffect(() => {
    const match = url.match(/github\.com\/(.+?)(?:\/|$)(.+?)(?:\/|$)/);
    if (!match) return;
    const repo = `${match[1]}/${match[2]}`;

    if (ghStarsCache.has(repo)) {
      setStars(ghStarsCache.get(repo)!);
      return;
    }

    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") {
          const formatted = formatStars(d.stargazers_count);
          ghStarsCache.set(repo, formatted);
          setStars(formatted);
        }
      })
      .catch(() => {});
  }, [url]);

  return stars;
}

function ProjectBlock({ data }: { data: MaintainedProject }) {
  const stars = useGitHubStars(data.url);

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border bg-card rounded-lg p-4 hover:bg-accent transition-colors group min-h-28 flex flex-col"
    >
      <div className="flex items-center gap-2 h-full mb-2">
        <h4 className="font-bold">{data.name}</h4>
        <Badge variant="outline" className="text-[8px] font-mono px-1.5 py-0.5">
          Public
        </Badge>
        <GripVerticalIcon className="ml-auto size-3 text-muted-foreground/50" />
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed mb-2">
        {data.description}
      </p>
      <div className="flex items-center gap-1.5 mt-auto">
        <span className="size-2.5 rounded-full bg-blue-500" />
        <span className="text-[10px] text-muted-foreground font-mono">
          {data.language}
        </span>
        {stars && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
            <Star className="w-3 h-3" />
            <span className="font-mono text-[11px]">{stars}</span>
          </div>
        )}
      </div>
    </a>
  );
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Mail: GoogleIcon,
  Discord: DiscordIcon,
};

function ContactIconButton({ link }: { link: SocialLink }) {
  const [copied, setCopied] = useState(false);
  const Icon = iconMap[link.icon] || Globe;
  const isCopyable = link.icon === "Mail";
  const displayValue = link.url.replace(/^mailto:/, "");

  const handleClick = () => {
    if (isCopyable) {
      navigator.clipboard.writeText(displayValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button
      // variant="secondary"
      // variant="outline"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="relative text-xs font-semibold shadow-none size-5 hover:bg-transparent"
      title={isCopyable ? `${link.platform}: ${displayValue}` : link.platform}
    >
      {copied ? <Check className="size-4" /> : <Icon className="size-4" />}
    </Button>
  );
}

function EmailBlock({ data }: { data: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full border rounded-lg p-3 bg-card hover:bg-accent/50 transition-colors flex items-center gap-3 group text-left"
    >
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <GoogleIcon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium font-mono">{data}</p>
      </div>
      {copied ? (
        <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <Check className="w-3.5 h-3.5" />
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ">
          <Copy className="w-3.5 h-3.5" />
        </span>
      )}
    </button>
  );
}
