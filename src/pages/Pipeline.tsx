import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Filter, ArrowUpDown, MoreHorizontal, TrendingUp } from "lucide-react";
import { pipelineColumns } from "@/data/mockData";
import propertyImage from "@/assets/property-penthouse.jpg";

const Pipeline = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppShell topBar={<TopBar searchPlaceholder="Search pipeline..." ctaLabel="Add Lead" />}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Pipeline (V2.0)</h1>
            <p className="mt-1 text-sm text-muted-foreground">Tracking all active opportunities across 4 stages.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-lg">
              <Filter className="h-3.5 w-3.5" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-lg">
              <ArrowUpDown className="h-3.5 w-3.5" /> Sort
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pipelineColumns.map((col) => (
            <div key={col.id} className="rounded-2xl bg-muted/40 p-3">
              <div className="mb-3 flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-soft">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.color}`} />
                  <span className="text-sm font-semibold text-foreground">{col.title}</span>
                  <span className="text-xs text-muted-foreground">({col.cards.length})</span>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {col.cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => col.id === "warm" && setOpen(true)}
                    className="block w-full rounded-xl bg-card p-3 text-left shadow-soft transition hover:shadow-elevated"
                  >
                    {col.id === "warm" && (
                      <img src={propertyImage} alt={card.title} className="mb-3 h-24 w-full rounded-lg object-cover" loading="lazy" width={640} height={512} />
                    )}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{card.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{card.agent}</p>
                      </div>
                      <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-bold text-foreground">{card.price}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gradient-primary text-[9px] text-primary-foreground">{card.initials}</AvatarFallback>
                      </Avatar>
                      {col.id === "contacted" && (
                        <Button size="sm" onClick={() => setOpen(true)} className="h-7 rounded-md bg-gradient-primary text-[11px] text-primary-foreground hover:opacity-95">
                          Close Deal
                        </Button>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capture Revenue Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Capture Revenue Data</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Moving <span className="font-semibold text-foreground">Skyline Penthouse</span> to{" "}
            <span className="font-semibold text-foreground">Closed</span>. Please finalize the financial details to update your sales pipeline reports.
          </p>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Actual Sale Price</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-semibold text-foreground">$</span>
                <Input defaultValue="3,850,000" className="h-11 rounded-lg pl-7 text-base font-semibold" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Commission (%)</Label>
                <Input defaultValue="2.5" className="mt-1.5 h-11 rounded-lg" />
              </div>
              <div>
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Closing Date</Label>
                <Input type="date" defaultValue="2023-10-25" className="mt-1.5 h-11 rounded-lg" />
              </div>
            </div>
            <div className="rounded-lg bg-accent/5 p-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Commission</p>
                  <p className="text-base font-bold text-foreground">$96,250.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Discard</Button>
            <Button onClick={() => setOpen(false)} className="bg-gradient-primary text-primary-foreground hover:opacity-95">
              Confirm &amp; Close Deal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
};

export default Pipeline;
