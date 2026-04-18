import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { masterLeads } from "@/data/mockData";
import territoryMap from "@/assets/territory-map.jpg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const assigned = masterLeads.slice(3);

  return (
    <AppShell topBar={<TopBar searchPlaceholder="Search assigned leads..." rightTabs={[{ label: "Territory View", active: true }, { label: "All Leads" }]} />}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Lead Intelligence</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">My Assigned Leads</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                ZIP: 10001, 10011, 10012
              </span>
              <span className="rounded-md bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                RLS Filter Active
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-border bg-card px-5 py-3 text-center shadow-soft">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Lead Heat</p>
              <p className="mt-1 text-2xl font-bold text-foreground">84%</p>
            </div>
            <div className="rounded-xl border border-border bg-card px-5 py-3 text-center shadow-soft">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">New Today</p>
              <p className="mt-1 text-2xl font-bold text-foreground">12</p>
            </div>
          </div>
        </div>

        {/* Map + side cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl shadow-elevated lg:col-span-2">
            <img src={territoryMap} alt="Territory map" className="h-[280px] w-full object-cover" width={1280} height={512} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            <div className="absolute left-1/3 top-1/3 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary-foreground/80 bg-primary-foreground/10 backdrop-blur">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="absolute right-1/3 top-1/2 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary-foreground/80 bg-primary-foreground/10 backdrop-blur">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-primary/70 px-3 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur">
              <MapPin className="h-3.5 w-3.5" /> Territory: Manhattan Core
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-card-dark p-5 text-primary-foreground shadow-elevated">
              <h3 className="text-lg font-bold">Priority Outreach</h3>
              <p className="mt-1.5 text-xs text-primary-foreground/70">
                You have 4 leads in ZIP 10012 waiting for initial contact.
              </p>
              <Button className="mt-4 h-9 w-full gap-2 rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Phone className="h-3.5 w-3.5" />
                Start Batch Call
              </Button>
            </div>

            <div className="card-surface p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Conversion Velocity</p>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[72%] rounded-full bg-gradient-primary" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">72% of leads contacted within 5m</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4 text-left">Lead Profile</th>
                  <th className="px-6 py-4 text-left">Territory Details</th>
                  <th className="px-6 py-4 text-left">Property Interest</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assigned.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
                            {lead.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">ZIP: {lead.zip}</p>
                      <p className="text-xs text-muted-foreground">{lead.neighborhood}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{lead.propertyInterest}</p>
                      {lead.priceRange && <p className="text-xs text-muted-foreground">{lead.priceRange}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={lead.status === "new" ? "new" : "assigned"} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button asChild variant="outline" size="sm" className="rounded-lg">
                        <Link to={`/leads/${lead.id}`}>View Profile</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border px-6 py-4 text-sm">
            <span className="text-muted-foreground">Showing 4 of 48 leads in assigned territories</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`h-8 w-8 rounded-md text-xs font-semibold ${
                    n === 1 ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
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

export default Dashboard;
