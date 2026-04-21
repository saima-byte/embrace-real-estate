import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Zap,
  Webhook,
  Sparkles,
  Flame,
  Clock,
  Moon,
  HelpCircle,
  UserCheck,
  Bell,
  MessageSquare,
  Activity,
  Gauge,
  Target,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  Node definitions                                                   */
/* ------------------------------------------------------------------ */
type Tone = "neutral" | "ai" | "hot" | "warm" | "dormant" | "review";

interface FlowNode {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeTone?: "hot" | "warm" | "dormant" | "review";
  icon: React.ComponentType<{ className?: string }>;
  tone: Tone;
  details: string;
  meta?: { label: string; value: string }[];
}

const toneStyles: Record<Tone, { card: string; icon: string; ring: string }> = {
  neutral: {
    card: "bg-card border-border",
    icon: "bg-secondary text-foreground",
    ring: "ring-border",
  },
  ai: {
    card: "bg-card border-accent/30",
    icon: "bg-accent/10 text-accent",
    ring: "ring-accent/40",
  },
  hot: {
    card: "bg-stage-hot-bg border-stage-hot/30",
    icon: "bg-stage-hot/15 text-stage-hot",
    ring: "ring-stage-hot/50",
  },
  warm: {
    card: "bg-stage-warm-bg border-stage-warm/30",
    icon: "bg-stage-warm/15 text-stage-warm",
    ring: "ring-stage-warm/50",
  },
  dormant: {
    card: "bg-muted border-border",
    icon: "bg-secondary text-muted-foreground",
    ring: "ring-muted-foreground/40",
  },
  review: {
    card: "bg-stage-contacted-bg border-stage-contacted/30",
    icon: "bg-stage-contacted/15 text-stage-contacted",
    ring: "ring-stage-contacted/50",
  },
};

const badgeTone = {
  hot: "bg-stage-hot/15 text-stage-hot",
  warm: "bg-stage-warm/15 text-stage-warm",
  dormant: "bg-muted text-muted-foreground",
  review: "bg-stage-contacted/15 text-stage-contacted",
};

const trigger: FlowNode = {
  id: "trigger",
  title: "New Lead Trigger",
  description: "Inbound API or webhook fires when a new lead arrives.",
  icon: Zap,
  tone: "neutral",
  details:
    "Listens for fresh lead events from external sources (Zillow, CSV imports, partner APIs). Each event is normalized and queued for AI processing within ~120ms.",
  meta: [
    { label: "Source", value: "Smart Lead API · Outbound" },
    { label: "Avg latency", value: "118 ms" },
  ],
};

const processor: FlowNode = {
  id: "processor",
  title: "Webhook Listener / AI Processor",
  description: "Analyzes intent, sentiment & metadata using NLP.",
  badge: "OPENROUTER NLP PROCESSOR",
  icon: Sparkles,
  tone: "ai",
  details:
    "Streams the lead payload through the OpenRouter NLP pipeline. Extracts intent, urgency, budget signals and sentiment, then routes to the appropriate branch.",
  meta: [
    { label: "Model", value: "GPT-4 Turbo" },
    { label: "Avg classification", value: "420 ms" },
  ],
};

const branches: FlowNode[] = [
  {
    id: "hot",
    title: "Immediate Alert",
    description: "Sonner toast + SMS to on-call agent within seconds.",
    badge: "HOT",
    badgeTone: "hot",
    icon: Flame,
    tone: "hot",
    details:
      "Hot leads bypass queues. The on-call agent receives a Sonner toast in-app and an SMS alert. Sub-2s SLA from event to delivery.",
    meta: [
      { label: "Channels", value: "Toast · SMS" },
      { label: "Delay", value: "0s" },
    ],
  },
  {
    id: "warm",
    title: "Follow-up Sequence",
    description: "Two-step nurture cadence over 48 hours.",
    badge: "WARM",
    badgeTone: "warm",
    icon: Clock,
    tone: "warm",
    details:
      "Warm leads enter a structured cadence. Email A is sent within 4h; if unopened, Email B fires at 48h. Hand-off to agent on any reply.",
    meta: [
      { label: "Step 1", value: "Email A · 4h" },
      { label: "Step 2", value: "Email B · 48h" },
    ],
  },
  {
    id: "dormant",
    title: "Dormant Nurturing",
    description: "Move to long-term nurture pool with monthly touches.",
    badge: "NOT READY",
    badgeTone: "dormant",
    icon: Moon,
    tone: "dormant",
    details:
      "Not-ready leads are parked in the dormant nurture pool. Monthly market updates and an automatic re-scoring pass every 30 days.",
    meta: [
      { label: "Cadence", value: "Monthly" },
      { label: "Re-score", value: "Every 30d" },
    ],
  },
];

const review: FlowNode = {
  id: "review",
  title: "Human Review Queue",
  description: "Flagged for ambiguous / foreign-language handling.",
  badge: "AUDIT NOW",
  badgeTone: "review",
  icon: UserCheck,
  tone: "review",
  details:
    "Edge cases — ambiguous intent, foreign language, low NLP confidence — are routed to a human reviewer queue with full context attached.",
  meta: [
    { label: "Reviewers", value: "3 active" },
    { label: "Avg handle", value: "2m 14s" },
  ],
};

const allNodes = [trigger, processor, ...branches, review];

/* ------------------------------------------------------------------ */
/*  Reusable node card                                                 */
/* ------------------------------------------------------------------ */
function NodeCard({
  node,
  onClick,
  className = "",
}: {
  node: FlowNode;
  onClick: () => void;
  className?: string;
}) {
  const styles = toneStyles[node.tone];
  const Icon = node.icon;
  return (
    <button
      onClick={onClick}
      className={`group relative w-full max-w-sm rounded-2xl border ${styles.card} p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated focus:outline-none focus-visible:ring-2 ${styles.ring} ${className}`}
    >
      {node.badge && (
        <span
          className={`absolute -top-2.5 left-4 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            node.badgeTone ? badgeTone[node.badgeTone] : "bg-secondary text-foreground"
          }`}
        >
          {node.badge}
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{node.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{node.description}</p>
        </div>
      </div>
      {node.id === "warm" && (
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between rounded-md bg-card/70 px-2 py-1 text-[11px]">
            <span className="font-medium text-foreground">EMAIL Step A</span>
            <span className="text-muted-foreground">4h DELAY</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-card/70 px-2 py-1 text-[11px]">
            <span className="font-medium text-foreground">EMAIL Step B</span>
            <span className="text-muted-foreground">48h DELAY</span>
          </div>
        </div>
      )}
      {node.id === "hot" && (
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 rounded-md bg-card/70 px-2 py-1 text-[11px] text-foreground">
            <Bell className="h-3 w-3 text-stage-hot" /> Sonner Toast (Push)
          </div>
          <div className="flex items-center gap-2 rounded-md bg-card/70 px-2 py-1 text-[11px] text-foreground">
            <MessageSquare className="h-3 w-3 text-stage-hot" /> SMS Alert (on-call)
          </div>
        </div>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const AISDR = () => {
  const [active, setActive] = useState<FlowNode | null>(null);

  return (
    <AppShell topBar={<TopBar searchPlaceholder="Search workflow..." ctaLabel="Save Version" />}>
      <div className="mx-auto max-w-[1200px] space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Architectural Logic Flow
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
                MODE: STRUCTURED OUTPUT ACTIVE
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Visual mapping of the SDR V2.0 decision engine, integrating OpenRouter NLP and
              autonomous routing sequences.
            </p>
          </div>
          <Button
            onClick={() => toast.success("Agent deployed", { description: "SDR Engine v2.4 is now live." })}
            className="h-11 gap-2 rounded-lg bg-gradient-primary px-5 text-primary-foreground shadow-soft hover:opacity-95"
          >
            <Rocket className="h-4 w-4" /> Deploy New Agent
          </Button>
        </div>

        {/* Flow diagram */}
        <section className="rounded-3xl border border-border bg-gradient-soft p-6 lg:p-10">
          {/* Trigger */}
          <div className="flex flex-col items-center">
            <NodeCard node={trigger} onClick={() => setActive(trigger)} />
            <Connector />

            {/* Processor */}
            <NodeCard node={processor} onClick={() => setActive(processor)} />
            <Connector />

            {/* 3 branches */}
            <div className="grid w-full gap-6 md:grid-cols-3">
              {branches.map((b) => (
                <div key={b.id} className="flex flex-col items-center">
                  <BranchConnector tone={b.tone} />
                  <NodeCard node={b} onClick={() => setActive(b)} className="mt-1" />
                </div>
              ))}
            </div>

            {/* Edge case → human review */}
            <div className="mt-8 flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rotate-45 rounded-lg border-2 border-dashed border-stage-contacted/50 bg-stage-contacted-bg">
                <HelpCircle className="h-6 w-6 -rotate-45 text-stage-contacted" />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Ambiguous?
              </span>
              <Connector tone="review" />
              <NodeCard node={review} onClick={() => setActive(review)} />
            </div>
          </div>
        </section>

        {/* System stats */}
        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={Activity}
            label="System Uptime"
            value="99.98%"
            delta="+0.02%"
            tone="success"
          />
          <StatCard
            icon={Gauge}
            label="Avg Process Time"
            value="420ms"
            delta="Non-Streaming"
            tone="muted"
          />
          <StatCard
            icon={Target}
            label="NLP Precision"
            value="94.2%"
            delta="GPT-4 Turbo"
            tone="muted"
          />
        </section>
      </div>

      {/* Detail panel */}
      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {active && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneStyles[active.tone].icon}`}>
                    <active.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <SheetTitle className="text-left">{active.title}</SheetTitle>
                    {active.badge && (
                      <span
                        className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          active.badgeTone ? badgeTone[active.badgeTone] : "bg-secondary text-foreground"
                        }`}
                      >
                        {active.badge}
                      </span>
                    )}
                  </div>
                </div>
                <SheetDescription className="pt-3 text-left text-sm leading-relaxed text-muted-foreground">
                  {active.details}
                </SheetDescription>
              </SheetHeader>
              {active.meta && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {active.meta.map((m) => (
                    <div key={m.label} className="rounded-xl border border-border bg-muted/40 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {m.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{m.value}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex items-center justify-between rounded-xl bg-success/10 px-4 py-3">
                <span className="flex items-center gap-2 text-xs font-semibold text-success">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
                  Live · Healthy
                </span>
                <span className="text-[11px] text-muted-foreground">Last event 4s ago</span>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
};

/* ------------------------------------------------------------------ */
/*  Connectors                                                         */
/* ------------------------------------------------------------------ */
function Connector({ tone = "neutral" }: { tone?: Tone }) {
  const colorMap: Record<Tone, string> = {
    neutral: "bg-border",
    ai: "bg-accent/40",
    hot: "bg-stage-hot/40",
    warm: "bg-stage-warm/40",
    dormant: "bg-border",
    review: "bg-stage-contacted/40",
  };
  return <div className={`my-3 h-8 w-px ${colorMap[tone]}`} />;
}

function BranchConnector({ tone }: { tone: Tone }) {
  const colorMap: Record<Tone, string> = {
    neutral: "bg-border",
    ai: "bg-accent/40",
    hot: "bg-stage-hot/40",
    warm: "bg-stage-warm/40",
    dormant: "bg-border",
    review: "bg-stage-contacted/40",
  };
  return <div className={`mb-2 h-6 w-px ${colorMap[tone]}`} />;
}

/* ------------------------------------------------------------------ */
/*  Stat card                                                          */
/* ------------------------------------------------------------------ */
function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
  tone: "success" | "muted";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <span
          className={`text-xs font-semibold ${
            tone === "success" ? "text-success" : "text-muted-foreground"
          }`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

export default AISDR;
