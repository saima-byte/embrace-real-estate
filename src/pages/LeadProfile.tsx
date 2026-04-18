import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Mail, Phone, Building2, Target, Mail as MailIcon, PhoneCall, UserCheck, Download, MapPin } from "lucide-react";
import { activityTimeline } from "@/data/mockData";
import { Link, useParams } from "react-router-dom";
import miniMap from "@/assets/mini-map.jpg";

const iconForType = {
  import: Download,
  assign: UserCheck,
  email: MailIcon,
  call: PhoneCall,
} as const;

const LeadProfile = () => {
  const { id = "L-9842" } = useParams();

  return (
    <AppShell topBar={<TopBar searchPlaceholder="Search leads..." ctaLabel="Import Lead" />}>
      <div className="mx-auto max-w-[1100px] space-y-6">
        {/* Crumbs */}
        <div className="flex items-center gap-3 text-sm">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Leads
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold text-foreground">Lead Profile</span>
          <span className="text-muted-foreground">·</span>
          <span className="font-mono text-sm font-semibold text-accent">#{id}</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-elevated">
              <span className="text-xl font-bold text-primary-foreground">JW</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Jonathan Wickens</h1>
                <StatusBadge status="assigned" />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> j.wickens@example.com</span>
                <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> (555) 012-3456</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-lg">Reassign Lead</Button>
            <Button className="rounded-lg bg-gradient-primary text-primary-foreground shadow-soft hover:opacity-95">Send Offer</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Property metadata */}
          <div className="card-surface lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="inline-flex items-center gap-2 text-base font-semibold text-foreground">
                <Building2 className="h-4 w-4 text-accent" /> Property Metadata
              </h2>
              <span className="font-mono text-xs text-muted-foreground">ID: PR-8821</span>
            </div>
            <div className="grid gap-6 px-6 py-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Street Address</p>
                <p className="mt-1 text-sm font-medium text-foreground">1248 Oakwood Crescent,<br/>Beverly Hills, CA 90210</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Property Type</p>
                <p className="mt-1 text-sm font-medium text-foreground">Single Family Residence</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Year Built</p>
                <p className="mt-1 text-sm font-medium text-foreground">1994 (Renovated 2018)</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Lot Size</p>
                <p className="mt-1 text-sm font-medium text-foreground">12,450 sq ft</p>
              </div>
            </div>
            <div className="relative mx-6 mb-6 overflow-hidden rounded-xl">
              <img src={miniMap} alt="Property map" className="h-[180px] w-full object-cover" loading="lazy" width={1280} height={512} />
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-elevated">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-card-dark p-5 text-primary-foreground shadow-elevated">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/70">Financial Summary</p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-primary-foreground/60">Estimated Value</p>
              <p className="text-3xl font-bold">$2,450,000</p>
              <div className="mt-4 space-y-2 border-t border-primary-foreground/15 pt-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/70">Mortgage Balance</span>
                  <span className="font-semibold">$1,120,400</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/70">Equity</span>
                  <span className="font-semibold">$1,329,600</span>
                </div>
              </div>
            </div>

            <div className="card-surface p-5 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Lead Score: 94%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                High intent lead based on equity position and recent activity.
              </p>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="card-surface px-6 py-5">
          <h2 className="mb-5 text-base font-semibold text-foreground">⟳ Activity Timeline</h2>
          <div className="relative space-y-6 pl-6">
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
            {activityTimeline.map((event) => {
              const Icon = iconForType[event.type];
              return (
                <div key={event.id} className="relative animate-fade-in">
                  <div className="absolute -left-6 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-background bg-primary" />
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{event.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {event.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default LeadProfile;
