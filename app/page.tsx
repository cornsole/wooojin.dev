"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Layers,
  Mail,
  MonitorCog,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  TriangleAlert,
  Waypoints,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  icon: LucideIcon;
  description: string;
  tech: string[];
  role: string;
  challenges: string;
  lessons: string;
};

const timeline = [
  {
    period: "Elementary School",
    items: ["Started operating Minecraft servers"],
  },
  {
    period: "Middle School",
    items: [
      "Built dedicated home server",
      "Remote Desktop",
      "SSH",
      "SFTP",
      "Linux",
      "Node.js",
      "Express",
      "Discord Bot",
    ],
  },
  {
    period: "Middle School → High School",
    items: [
      "Proxmox",
      "Virtual Machines",
      "Reverse Proxy",
      "Nginx",
      "Tailscale",
      "Arch Linux",
      "HomeLab",
    ],
  },
  {
    period: "High School",
    items: [
      "Arch Linux Mirror",
      "Startup Collaboration",
      "School Information System",
      "Backend Development",
      "Server Administration",
    ],
  },
];

const skills = [
  {
    name: "Backend",
    items: ["Node.js", "Express"],
  },
  {
    name: "Infrastructure",
    items: [
      "Linux",
      "Arch Linux",
      "Ubuntu",
      "Debian",
      "Nginx",
      "Reverse Proxy",
      "Systemd",
      "SSH",
      "SFTP",
      "Docker (Learning)",
    ],
  },
  { name: "Virtualization", items: ["Proxmox VE", "Virtual Machines"] },
  { name: "Networking", items: ["DNS", "TCP/IP", "VPN", "Tailscale", "Port Forwarding"] },
  { name: "Programming", items: ["JavaScript", "Node.js", "C", "Go (Learning)", "Rust (Learning)"] },
  { name: "Tools", items: ["Git", "GitHub", "VSCode"] },
];

const projects: Project[] = [
  {
    title: "Minecraft Server Infrastructure",
    icon: Server,
    description:
      "Self-hosted server operations focused on uptime, performance optimization, and network management.",
    tech: ["Linux", "Network Management", "Performance Tuning"],
    role: "Infrastructure Engineer",
    challenges:
      "Balancing low latency with stable resource usage under concurrent traffic.",
    lessons:
      "Reliable infrastructure starts with observability and predictable operations playbooks.",
  },
  {
    title: "HomeLab",
    icon: MonitorCog,
    description:
      "Multi-VM Proxmox environment for service isolation and network segmentation testing.",
    tech: ["Proxmox VE", "Virtual Machines", "Segmentation"],
    role: "Systems Administrator",
    challenges:
      "Maintaining clear trust boundaries while enabling service-to-service communication.",
    lessons:
      "Infrastructure architecture decisions made early reduce future migration complexity.",
  },
  {
    title: "Arch Linux Mirror",
    icon: Waypoints,
    description:
      "Self-hosted mirror infrastructure with Nginx for high-availability package delivery.",
    tech: ["Nginx", "Mirror Server", "Self-Hosting"],
    role: "Mirror Maintainer",
    challenges: "Keeping mirror synchronization reliable during update and peak windows.",
    lessons:
      "Automation and verification pipelines are essential for mirror consistency.",
  },
  {
    title: "Reverse Proxy Infrastructure",
    icon: ShieldCheck,
    description:
      "SSL-terminated reverse proxy stack that routes multiple internal services securely.",
    tech: ["Nginx", "SSL", "Reverse Proxy"],
    role: "Infrastructure Engineer",
    challenges:
      "Designing safe public ingress while keeping route management maintainable.",
    lessons:
      "Security and routing should be codified as baseline infrastructure, not one-off patches.",
  },
  {
    title: "Startup Project — School Information Display System",
    icon: Terminal,
    description:
      "Production backend and deployment infrastructure for school information display workflows.",
    tech: ["Backend", "Server Management", "Deployment", "Infrastructure"],
    role: "Backend & Infrastructure Engineer",
    challenges:
      "Maintaining dependable deployments across iterative product changes.",
    lessons:
      "Operational reliability requires both robust systems and clear team communication.",
  },
  {
    title: "Discord Bot",
    icon: Code2,
    description:
      "Node.js Discord bot for utility automation and community workflow integration.",
    tech: ["Node.js"],
    role: "Backend Developer",
    challenges: "Handling asynchronous events predictably across diverse command flows.",
    lessons:
      "Event-driven architecture builds strong debugging habits and API integration discipline.",
  },
  {
    title: "Express Web Application",
    icon: Network,
    description:
      "Backend-focused Express application implementing REST API contracts and service logic.",
    tech: ["Express", "REST API", "Node.js"],
    role: "Backend Developer",
    challenges: "Designing consistent API boundaries and maintainable service layering.",
    lessons:
      "Clear contracts between routes and services keep features scalable and testable.",
  },
];

const linuxJourney = ["Windows 10 지원종료", "ArchLinux", "Proxmox(서버)", "Cachyos"];
const learning = ["Docker", "Kubernetes", "CI/CD", "Cloud", "Distributed Systems"];
const certifications = ["Linux"];
const githubUsername = "cornsole";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function NavBar({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 nav-line">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          className="text-sm font-normal tracking-tight text-white/70 transition-colors hover:text-white"
        >
          wooo jin<span className="text-primary">.</span>dev
        </a>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-normal transition-all duration-200",
                activeSection === link.id
                  ? "text-primary"
                  : "text-white/40 hover:text-white/70",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[0.5px] origin-left bg-white/20"
      style={{ scaleX: progress / 100 }}
    />
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border p-6 text-center">
      <Layers className="mx-auto mb-2 size-5 text-white/30" />
      <p className="text-sm font-normal text-white/60">{title}</p>
      <p className="mt-1 text-xs text-white/40">{description}</p>
    </div>
  );
}

function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-destructive/20 p-6 text-center">
      <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-lg border border-destructive/30">
        <TriangleAlert className="size-4 text-destructive" />
      </div>
      <p className="text-sm font-normal text-white/60">{title}</p>
      <p className="mt-1 text-xs text-white/40">{description}</p>
    </div>
  );
}

function SectionShell({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <Card className="card-base rounded-lg">
        <CardHeader>
          <div>
            <CardTitle className="text-2xl font-light tracking-tight text-white/90">
              {title}
            </CardTitle>
            <CardDescription className="mt-1 text-xs font-light text-white/50">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [repoError, setRepoError] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [graphState, setGraphState] = useState<"loading" | "ready" | "error">("loading");
  const [activeSection, setActiveSection] = useState("");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -55% 0px", threshold: 0.1 },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("GitHub API request failed");
        }
        return (await response.json()) as Repo[];
      })
      .then((data) => {
        if (cancelled) return;
        setRepos(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setRepoError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pinnedRepos = useMemo(() => {
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map((repo) => ({
        name: repo.name,
        description: repo.description ?? "Repository description is not available yet.",
        language: repo.language ?? "Unknown",
        url: repo.html_url,
      }));
  }, [repos]);

  const languages = useMemo(() => {
    const counts = repos.reduce<Record<string, number>>((acc, repo) => {
      if (!repo.language) return acc;
      acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      return acc;
    }, {});

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    if (total === 0) return [];

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  }, [repos]);

  const fadeUp = useCallback(
    (index: number) => ({
      initial: reduceMotion ? undefined : { opacity: 0, y: 8 },
      whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.35, delay: index * 0.04 },
    }),
    [reduceMotion],
  );

  return (
    <>
      <ScrollProgress />
      <NavBar activeSection={activeSection} />
      <main ref={mainRef} className="relative overflow-x-hidden pt-14">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">

          {/* ── Hero ── */}
          <section className="relative glow">
            <Card className="card-base rounded-lg">
              <CardContent className="relative py-16 md:py-20">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-5">
                    <h1 className="text-4xl font-thin leading-none tracking-tight md:text-5xl text-white">
                      WOOJIN LIM
                    </h1>
                    <div className="space-y-1 text-sm text-white/70 font-normal">
                      <p>Backend Developer</p>
                      <p>Linux Enthusiast</p>
                      <p>Self-Hosting &amp; Infrastructure</p>
                    </div>
                    <p className="max-w-2xl text-sm text-white/70 font-normal leading-relaxed">
                      I started operating Minecraft servers in elementary school and gradually expanded
                      my interests into Linux, networking, backend development, virtualization, and
                      infrastructure engineering.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href="#projects" className={buttonVariants({ size: "lg" })}>
                        View Projects <ArrowRight />
                      </a>
                      <a
                        href={`https://github.com/${githubUsername}`}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonVariants({ variant: "secondary", size: "lg" })}
                      >
                        GitHub <GitBranch />
                      </a>
                      <a
                        href="#contact"
                        className={buttonVariants({ variant: "outline", size: "lg" })}
                      >
                        Contact <Mail />
                      </a>
                    </div>
                  </div>

                  <Card className="card-base rounded-lg">
                    <CardHeader>
                      <CardTitle className="text-lg font-light text-white/90">Terminal</CardTitle>
                      <CardDescription className="font-mono text-xs font-normal text-white/50">$ whoami</CardDescription>
                    </CardHeader>
                    <CardContent className="font-mono text-xs font-normal text-white/70 space-y-1.5">
                      <p className="text-primary">woojin-lim</p>
                      <p>$ stack --focus infrastructure</p>
                      <p>linux &bull; networking &bull; nginx &bull; proxmox &bull; node.js</p>
                      <motion.p
                        className="pt-1 text-white/50"
                        animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
                        transition={
                          reduceMotion
                            ? undefined
                            : { repeat: Number.POSITIVE_INFINITY, duration: 1.4 }
                        }
                      >
                        $ _
                      </motion.p>
                    </CardContent>
                  </Card>
                </div>

                <motion.div
                  className="mt-10 flex justify-center"
                  initial={reduceMotion ? undefined : { opacity: 0 }}
                  animate={reduceMotion ? undefined : { opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <a
                    href="#about"
                    className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[11px] font-normal tracking-[0.15em] uppercase text-white/30 transition-colors hover:text-white/60"
                  >
                    Scroll <ArrowDown className="size-3.5" />
                  </a>
                </motion.div>
              </CardContent>
            </Card>
          </section>

          {/* ── About / Timeline ── */}
          <SectionShell
            id="about"
            title="About Me"
            description="Timeline from first server operations to backend and infrastructure engineering."
          >
            {timeline.length === 0 ? (
              <EmptyState
                title="Timeline is not available."
                description="Add milestones to show growth and engineering progression."
              />
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {timeline.map((phase, index) => (
                  <motion.div key={phase.period} {...fadeUp(index)}>
                    <Card className="card-base rounded-lg h-full">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-primary/80">
                          <Calendar className="size-3.5" />
                          <CardTitle className="text-xs font-normal">{phase.period}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-1.5">
                        {phase.items.map((item) => (
                          <Badge key={item} variant="outline" className="border-border text-xs font-normal text-white/60">
                            {item}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </SectionShell>

          {/* ── Skills ── */}
          <SectionShell
            id="skills"
            title="Skills"
            description="Categorized stack for backend development, Linux operations, and infrastructure."
          >
            {skills.length === 0 ? (
              <EmptyState
                title="No skills found."
                description="Add categorized skill groups to populate this section."
              />
            ) : (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {skills.map((group, index) => (
                  <motion.div key={group.name} {...fadeUp(index)}>
                    <Card className="card-base rounded-lg h-full">
                      <CardHeader>
                        <CardTitle className="text-xs font-normal text-white/70">{group.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <Badge key={item} variant="secondary" className="bg-white/[0.03] text-white/60 text-xs font-normal">
                            {item}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </SectionShell>

          {/* ── Featured Projects ── */}
          <SectionShell
            id="projects"
            title="Featured Projects"
            description="Project summaries with stack, role, challenges, and lessons learned."
          >
            {projects.length === 0 ? (
              <EmptyState
                title="No featured projects yet."
                description="Add project entries to surface engineering work and outcomes."
              />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {projects.map((project, index) => (
                  <motion.div key={project.title} {...fadeUp(index)}>
                    <Card className="card-base rounded-lg h-full transition-all duration-300 hover:border-white/20">
                      <CardHeader>
                        <div className="mb-3 flex size-11 items-center justify-center rounded-lg border border-border">
                          <project.icon className="size-4 text-primary/70" />
                        </div>
                        <CardTitle className="text-sm font-normal text-white/90">{project.title}</CardTitle>
                        <CardDescription className="text-xs font-normal text-white/50">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2.5 text-xs font-normal text-white/70">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="outline" className="border-border text-xs font-normal text-white/60">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p>
                          <span className="font-semibold text-white/80">Role:</span>{" "}
                          {project.role}
                        </p>
                        <p>
                          <span className="font-semibold text-white/80">Challenges:</span>{" "}
                          {project.challenges}
                        </p>
                        <p>
                          <span className="font-semibold text-white/80">Lessons:</span>{" "}
                          {project.lessons}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </SectionShell>

          {/* ── Infrastructure Diagram ── */}
          <SectionShell
            title="Infrastructure Diagram"
            description="Typical service flow in a self-hosted backend setup."
          >
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
              {[
                { icon: Cloud, label: "Internet" },
                { icon: ShieldCheck, label: "Cloudflare" },
                { icon: Network, label: "Nginx Reverse Proxy" },
                { icon: Terminal, label: "Express Backend" },
                { icon: Database, label: "Database" },
                { icon: Server, label: "Services" },
              ].map((item, index, list) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-32 items-center justify-center gap-2 rounded-lg border border-border text-xs font-normal text-white/60 transition-colors hover:border-white/20">
                    <item.icon className="size-3.5 text-primary/70 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {index < list.length - 1 && (
                    <ArrowRight className="hidden size-3.5 shrink-0 text-white/10 md:block" />
                  )}
                </div>
              ))}
            </div>
          </SectionShell>

          {/* ── Linux Journey ── */}
          <SectionShell
            title="Linux Journey"
            description="Operating system progression to daily infrastructure workflows."
          >
            <div className="grid gap-3 md:grid-cols-4">
              {linuxJourney.map((step, index) => (
                <Card
                  key={step}
                  className={cn(
                    "card-base rounded-lg transition-all duration-300",
                    index === linuxJourney.length - 1 && "border-primary/30",
                  )}
                >
                  <CardContent className="flex items-center justify-between py-4">
                    <span className="text-sm font-normal text-white/80">{step}</span>
                    <Badge
                      variant={index === linuxJourney.length - 1 ? "default" : "secondary"}
                      className="text-[10px] font-normal"
                    >
                      {index + 1}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionShell>

          {/* ── GitHub Statistics ── */}
          <SectionShell
            title="GitHub Statistics"
            description="Contribution activity, pinned repositories, and language usage."
          >
            <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="card-base rounded-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-normal text-white/90">Contribution Graph</CardTitle>
                  <CardDescription className="text-xs font-normal text-white/50">@{githubUsername}</CardDescription>
                </CardHeader>
                <CardContent>
                  {graphState === "error" ? (
                    <ErrorState
                      title="Contribution graph could not be loaded."
                      description="Check network connectivity or graph source availability."
                    />
                  ) : (
                    <div className="rounded-lg border border-border p-2">
                      {graphState === "loading" && (
                        <div className="mb-2 h-24 animate-pulse rounded-lg bg-white/[0.03]" />
                      )}
                      <Image
                        src={`https://ghchart.rshah.org/4F8CFF/${githubUsername}`}
                        alt={`GitHub contribution graph for ${githubUsername}`}
                        className={cn(
                          "w-full rounded-lg transition-opacity duration-300",
                          graphState === "loading" ? "opacity-0" : "opacity-100",
                        )}
                        width={1056}
                        height={150}
                        unoptimized
                        onLoad={() => setGraphState("ready")}
                        onError={() => setGraphState("error")}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid gap-3">
                <Card className="card-base rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-sm font-normal text-white/90">Pinned Repositories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {repoError ? (
                      <ErrorState
                        title="GitHub data failed to load."
                        description="Check network connectivity or API rate limits."
                      />
                    ) : isLoading ? (
                      <div className="h-24 animate-pulse rounded-lg bg-white/[0.03]" />
                    ) : pinnedRepos.length === 0 ? (
                      <EmptyState
                        title="Pinned repositories are empty."
                        description="Add repository data to show featured codebases."
                      />
                    ) : (
                      pinnedRepos.map((repo, index) => (
                        <motion.div key={repo.name} {...fadeUp(index)}>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex min-h-11 flex-col rounded-lg border border-border p-3 transition-all duration-200 hover:border-white/20"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-normal text-white/80">{repo.name}</p>
                              <ExternalLink className="size-3.5 text-white/30" />
                            </div>
                            <p className="mt-1 text-xs font-normal text-white/50">{repo.description}</p>
                            <Badge variant="outline" className="mt-2 w-fit border-border text-xs font-normal text-white/60">
                              {repo.language}
                            </Badge>
                          </a>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card className="card-base rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-sm font-normal text-white/90">Most Used Languages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {repoError ? (
                      <ErrorState
                        title="Language statistics are unavailable."
                        description="Check network connectivity or API rate limits."
                      />
                    ) : isLoading ? (
                      <div className="h-24 animate-pulse rounded-lg bg-white/[0.03]" />
                    ) : languages.length === 0 ? (
                      <EmptyState
                        title="Language data is unavailable."
                        description="Connect repository language statistics to populate this panel."
                      />
                    ) : (
                      languages.map((language) => (
                        <motion.div
                          key={language.name}
                          initial={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="mb-1 flex justify-between text-xs font-normal">
                            <span className="text-white/70">{language.name}</span>
                            <span className="text-white/40">{language.percentage}%</span>
                          </div>
                          <div className="h-1 rounded-full bg-white/[0.04]">
                            <motion.div
                              className="h-1 rounded-full bg-primary/60"
                              initial={reduceMotion ? undefined : { width: 0 }}
                              whileInView={{ width: `${language.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.03 }}
                            />
                          </div>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </SectionShell>

          {/* ── Learning & Certifications ── */}
          <section>
            <div className="grid gap-3 md:grid-cols-2">
              <Card className="card-base rounded-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-4 text-primary/60" />
                    <CardTitle className="text-sm font-normal text-white/90">Learning</CardTitle>
                  </div>
                  <CardDescription className="text-xs font-normal text-white/50">Currently exploring</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {learning.length === 0 ? (
                    <EmptyState
                      title="Learning topics are empty."
                      description="Add active learning goals to show technical growth."
                    />
                  ) : (
                    learning.map((item) => (
                      <Badge key={item} variant="secondary" className="bg-white/[0.03] text-white/60 text-xs font-normal">
                        {item}
                      </Badge>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="card-base rounded-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary/60" />
                    <CardTitle className="text-sm font-normal text-white/90">Certifications</CardTitle>
                  </div>
                  <CardDescription className="text-xs font-normal text-white/50">Future goals</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {certifications.length === 0 ? (
                    <EmptyState
                      title="Certification goals are empty."
                      description="Define certification targets to clarify long-term direction."
                    />
                  ) : (
                    certifications.map((item) => (
                      <Badge key={item} variant="outline" className="border-border text-xs font-normal text-white/60">
                        {item}
                      </Badge>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ── Contact ── */}
          <section id="contact">
            <Card className="card-base rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-light tracking-tight text-white/90">Contact</CardTitle>
                <CardDescription className="mt-1 text-xs font-light text-white/50">
                  Open to backend, Linux, and infrastructure collaboration.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "min-w-36")}
                >
                  <GitBranch />
                  GitHub
                </a>
                <a
                  href="mailto:contact@wooojin.dev"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "min-w-36")}
                >
                  <Mail />
                  Email
                </a>
                <a
                  href="https://www.discord.com/users/804194370018344961"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "min-w-36")}
                >
                  <Code2 />
                  Discord
                </a>
              </CardContent>
            </Card>
          </section>

          {/* ── Footer ── */}
          <footer className="text-center text-xs font-normal text-white/25">
            <p>Next.js &middot; React &middot; Tailwind CSS &middot; Framer Motion</p>
          </footer>
        </div>
      </main>
    </>
  );
}
