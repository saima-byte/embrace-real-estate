import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileSpreadsheet, Filter, Download, Globe, Plug, FileText, Activity, Calendar, MoreVertical, Wifi, ChevronLeft, ChevronRight } from "lucide-react";
import { masterLeads } from "@/data/mockData";
import { TopBar } from "@/components/layout/TopBar";

const sourceIcon = {
  "Organic Web": Globe,
  "API Portal": Plug,
  "CSV Import": FileText,
  "Zillow Premium": Globe,
} as const;

const Leads = () => {
  const [page, setPage] = useState(1);

  return (
    <AppShell topBar={<TopBar searchPlaceholder="Search leads..." rightTabs={[{ label: "Leads", active: true }, { label: "Distribution" }, { label: "Analytics" }]} ctaLabel="Import Lead" />}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Lead Ingestion</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage and monitor architectural lead flow across all channels.
            </p>
          </div>
          <div className="inline-flex rounded-full border border-border bg-card p-1 text-sm shadow-soft">
            <button className="rounded-full bg-secondary px-4 py-1.5 font-semibold text-secondary-foreground">Manual Ingestion</button>
            <button className="rounded-full px-4 py-1.5 font-medium text-muted-foreground">Automation Settings</button>
          </div>
        </div>

        {/* Top row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* CSV Upload */}
          <div className="card-surface p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Manual CSV Upload</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Supported: .csv, .xlsx
              </span>
            </div>

            <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 px-6 py-12 text-center transition hover:border-accent hover:bg-accent/10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-card shadow-soft">
                <FileSpreadsheet className="h-6 w-6 text-accent" />
              </div>
              <p className="text-base font-semibold text-accent">Drag and drop file here</p>
              <p className="mt-1 text-xs text-muted-foreground">or click to browse from your computer</p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">⚡ Deduplication Integrity</span>
                <span className="text-muted-foreground">42 duplicates suppressed this session</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[78%] rounded-full bg-gradient-primary" />
              </div>
            </div>
          </div>

          {/* Right column stats */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-card-dark p-5 text-primary-foreground shadow-elevated">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Automated API Hook</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" /> Live
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/60">Endpoint</p>
              <p className="font-mono text-xs text-primary-foreground/90 truncate">api.leadarch.v2/webhook/0x83…</p>
              <div className="mt-4 flex items-center justify-between border-t border-primary-foreground/10 pt-3 text-xs">
                <span className="text-primary-foreground/70">Last Ping: 2m ago</span>
                <button className="font-semibold text-primary-foreground/90 hover:text-primary-foreground">
                  Settings →
                </button>
              </div>
            </div>

            <div className="card-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Today's Inflow</p>
                  <p className="text-lg font-bold text-foreground">1,284 Leads</p>
                </div>
              </div>
            </div>
            <div className="card-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Avg. Ingestion Speed</p>
                  <p className="text-lg font-bold text-foreground">14ms / record</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Lead List */}
        <div className="card-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Master Lead List</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 rounded-lg">
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 rounded-lg">
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 text-left">Lead Source</th>
                  <th className="px-6 py-3 text-left">Contact Name</th>
                  <th className="px-6 py-3 text-left">Property Interest</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Manual Assign</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {masterLeads.slice(0, 4).map((lead) => {
                  const Icon = sourceIcon[lead.source];
                  return (
                    <tr key={lead.id} className="border-b border-border last:border-0 transition hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                          <Icon className="h-3.5 w-3.5 text-accent" />
                          {lead.source}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                              {lead.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground">{lead.propertyInterest}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status === "new" ? "new" : lead.status === "assigned" ? "assigned" : "in-progress"} />
                      </td>
                      <td className="px-6 py-4">
                        <Select defaultValue={lead.assignedTo}>
                          <SelectTrigger className="h-8 w-[140px] rounded-lg border-border bg-card text-xs">
                            <SelectValue placeholder="Select Agent..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sarah Jenkins">Sarah Jenkins</SelectItem>
                            <SelectItem value="David Miller">David Miller</SelectItem>
                            <SelectItem value="Lena Park">Lena Park</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border px-6 py-4 text-sm">
            <span className="text-muted-foreground">Showing 1-15 of 2,402 leads</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-8 w-8 rounded-md text-xs font-semibold transition ${
                    page === n ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {n}
                </button>
              ))}
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Leads;
