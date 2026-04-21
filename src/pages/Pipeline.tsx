import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MoreHorizontal,
  Search,
  TrendingUp,
  Users,
  Wallet,
  UserPlus,
} from "lucide-react";
import {
  agents,
  pipelineCards,
  pipelineStages,
  unassignedLeads,
  type PipelineCard,
  type PipelineStage,
} from "@/data/mockData";
import { toast } from "sonner";
import { CaptureRevenueModal, type CaptureRevenueDeal } from "@/components/CaptureRevenueModal";

/* -------------------------------------------------------------------------- */
/*  API layer (mock — wire to real endpoints later)                           */
/* -------------------------------------------------------------------------- */
const api = {
  // GET /api/pipeline?scope=me
  async getPipeline(_scope: "me" | "all" = "me") {
    return [...pipelineCards];
  },
  // PATCH /api/leads/:id/stage
  async updateStage(id: string, stage: PipelineStage) {
    return { id, stage, ok: true };
  },
  // PATCH /api/leads/:id/assign
  async assignLead(id: string, agent: string) {
    return { id, agent, ok: true };
  },
};

/* -------------------------------------------------------------------------- */
/*  Card                                                                       */
/* -------------------------------------------------------------------------- */
function LeadCard({
  card,
  dragging = false,
  onCloseDeal,
}: {
  card: PipelineCard;
  dragging?: boolean;
  onCloseDeal?: (card: PipelineCard) => void;
}) {
  const stageMeta = pipelineStages.find((s) => s.id === card.stage)!;
  const canClose = card.stage !== "closed" && card.stage !== "new";
  return (
    <div
      className={`group rounded-xl border border-border bg-card p-3 shadow-soft transition ${
        dragging ? "shadow-elevated ring-2 ring-accent/40" : "hover:shadow-card"
      }`}
    >
      <span
        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${stageMeta.badgeBg} ${stageMeta.badgeText}`}
      >
        {card.statusLabel}
      </span>
      <p className="mt-2 text-sm font-semibold text-foreground">{card.title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{card.property}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-gradient-primary text-[9px] text-primary-foreground">
              {card.agentInitials}
            </AvatarFallback>
          </Avatar>
          <span className="text-[11px] font-medium text-muted-foreground">
            {card.agent || "Unassigned"}
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground">{card.lastActivity}</span>
      </div>
      {canClose && onCloseDeal && (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onCloseDeal(card);
          }}
          className="mt-3 w-full rounded-md bg-gradient-primary px-2 py-1.5 text-[11px] font-semibold text-primary-foreground opacity-0 transition group-hover:opacity-100 hover:opacity-95"
        >
          Close Deal
        </button>
      )}
    </div>
  );
}

function DraggableCard({
  card,
  onCloseDeal,
}: {
  card: PipelineCard;
  onCloseDeal?: (card: PipelineCard) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: card.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`}
    >
      <LeadCard card={card} onCloseDeal={onCloseDeal} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Column                                                                     */
/* -------------------------------------------------------------------------- */
function StageColumn({
  stage,
  cards,
  onCloseDeal,
}: {
  stage: (typeof pipelineStages)[number];
  cards: PipelineCard[];
  onCloseDeal?: (card: PipelineCard) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  return (
    <div
      ref={setNodeRef}
      className={`flex w-[280px] shrink-0 flex-col rounded-2xl bg-muted/40 p-3 transition md:w-auto ${
        isOver ? `ring-2 ${stage.ring}` : ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between rounded-xl bg-card px-3 py-2 shadow-soft">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${stage.dot}`} />
          <span className="text-sm font-semibold text-foreground">{stage.title}</span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${stage.badgeBg} ${stage.badgeText}`}
          >
            {cards.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {cards.map((c) => (
          <DraggableCard key={c.id} card={c} onCloseDeal={onCloseDeal} />
        ))}
        {cards.length === 0 && (
          <div className="rounded-lg border border-dashed border-border py-6 text-center text-[11px] text-muted-foreground">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */
const Pipeline = () => {
  const [cards, setCards] = useState<PipelineCard[]>(pipelineCards);
  const [unassigned, setUnassigned] = useState<PipelineCard[]>(unassignedLeads);
  const [agentFilter, setAgentFilter] = useState<string>("All Regional Agents");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [revenueDeal, setRevenueDeal] = useState<CaptureRevenueDeal | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchAgent = agentFilter === "All Regional Agents" || c.agent === agentFilter;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.property.toLowerCase().includes(q) ||
        c.agent.toLowerCase().includes(q);
      return matchAgent && matchSearch;
    });
  }, [cards, agentFilter, search]);

  const totalValue = useMemo(
    () =>
      cards.reduce((sum, c) => {
        const n = parseFloat(c.price.replace(/[^0-9.]/g, ""));
        return sum + (isNaN(n) ? 0 : n);
      }, 0),
    [cards]
  );

  const activeLeads = cards.filter((c) => c.stage !== "closed").length;
  const closedLeads = cards.filter((c) => c.stage === "closed").length;
  const conversion = cards.length ? Math.round((closedLeads / cards.length) * 100) : 0;

  const activeCard =
    [...cards, ...unassigned].find((c) => c.id === activeId) ?? null;

  const openRevenueModal = (card: PipelineCard, fromStage?: string) => {
    const priceNum = parseFloat(card.price.replace(/[^0-9.]/g, ""));
    const salePrice = isNaN(priceNum) ? 0 : Math.round(priceNum * 1_000_000);
    setRevenueDeal({
      leadId: card.id,
      leadName: card.title,
      fromStage: fromStage ?? card.stage,
      toStage: "Closed",
      defaults: { salePrice, commissionPct: 2.5 },
    });
  };

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const onDragEnd = async (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const stageId = over.id as PipelineStage;
    if (!pipelineStages.find((s) => s.id === stageId)) return;

    const id = String(active.id);
    const fromUnassigned = unassigned.find((c) => c.id === id);

    if (fromUnassigned) {
      setUnassigned((prev) => prev.filter((c) => c.id !== id));
      const next = { ...fromUnassigned, stage: stageId };
      setCards((prev) => [...prev, next]);
      toast.success("Lead moved", { description: `${fromUnassigned.title} → ${stageId}` });
      await api.updateStage(id, stageId);
      if (stageId === "closed") openRevenueModal(next, fromUnassigned.stage);
      return;
    }

    const moved = cards.find((c) => c.id === id);
    if (!moved || moved.stage === stageId) return;

    // Intercept drops on Closed: open revenue modal instead of immediately moving.
    if (stageId === "closed") {
      openRevenueModal(moved, moved.stage);
      return;
    }

    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, stage: stageId } : c)));
    toast.success("Stage updated", { description: `${moved.title} moved to ${stageId}` });
    await api.updateStage(id, stageId);
  };

  const handleDealClosed = (payload: { leadId: string; estimatedCommission: number }) => {
    setCards((prev) =>
      prev.map((c) => (c.id === payload.leadId ? { ...c, stage: "closed", statusLabel: "Closed Won" } : c))
    );
  };

  return (
    <AppShell topBar={<TopBar searchPlaceholder="Search pipeline..." ctaLabel="Add Lead" />}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Global Pipeline Management
              </h1>
              <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
                V2.0
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitoring {cards.length.toLocaleString()} leads across 18 regional agents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Viewing results for
              </span>
              <Select value={agentFilter} onValueChange={setAgentFilter}>
                <SelectTrigger className="h-10 w-[200px] rounded-lg border-border bg-card text-sm font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="h-10 gap-2 rounded-lg">
              <Calendar className="h-4 w-4" /> Last 30 Days
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by lead, property, or agent…"
            className="h-10 rounded-lg pl-9"
          />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-gradient-card-dark p-5 text-primary-foreground shadow-elevated">
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-white/10 p-2">
                <Wallet className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-success/20 px-2 py-0.5 text-[11px] font-bold text-success-foreground">
                +12.4% vs prev
              </span>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
              Total Pipeline Value
            </p>
            <p className="mt-1 text-3xl font-bold">
              ${totalValue.toFixed(1)}M
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-stage-contacted-bg p-2 text-stage-contacted">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Total Volume
              </span>
            </div>
            <p className="mt-6 text-3xl font-bold text-foreground">
              {activeLeads.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Active Leads</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-stage-warm-bg p-2 text-stage-warm">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Avg. Conversion
              </span>
            </div>
            <p className="mt-6 text-3xl font-bold text-foreground">{conversion}%</p>
            <p className="mt-1 text-xs text-muted-foreground">Closed / Total</p>
          </div>
        </div>

        {/* Kanban */}
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="-mx-2 overflow-x-auto px-2 pb-2">
            <div className="grid grid-flow-col auto-cols-[280px] gap-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 xl:grid-cols-6">
              {pipelineStages.map((stage) => (
                <StageColumn
                  key={stage.id}
                  stage={stage}
                  cards={filteredCards.filter((c) => c.stage === stage.id)}
                />
              ))}
            </div>
          </div>

          {/* Unassigned */}
          <section className="rounded-2xl border border-dashed border-border bg-card/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-stage-warm-bg p-1.5 text-stage-warm">
                  <UserPlus className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-semibold text-foreground">Unassigned Leads</h2>
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {unassigned.length}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Drag a card into a stage to assign &amp; route.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {unassigned.map((c) => (
                <DraggableCard key={c.id} card={c} />
              ))}
              {unassigned.length === 0 && (
                <p className="text-xs text-muted-foreground">All leads assigned 🎉</p>
              )}
            </div>
          </section>

          <DragOverlay>
            {activeCard ? <LeadCard card={activeCard} dragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </AppShell>
  );
};

export default Pipeline;
