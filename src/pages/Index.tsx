import { Link } from "react-router-dom";
import { ArrowRight, Building2, Users, GitBranch, BarChart3 } from "lucide-react";

const cards = [
  { to: "/leads", title: "Lead Ingestion", desc: "CSV upload, API hook, master list", icon: Users },
  { to: "/dashboard", title: "My Assigned Leads", desc: "Territory view & priority outreach", icon: BarChart3 },
  { to: "/leads/L-9842", title: "Lead Profile", desc: "Property metadata, financial summary, timeline", icon: Building2 },
  { to: "/pipeline", title: "Pipeline (V2.0)", desc: "Stage tracking & capture revenue modal", icon: GitBranch },
];

const Index = () => (
  <div className="min-h-screen bg-gradient-soft">
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-elevated">
          <Building2 className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Empower Real Estate CRM
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Module 1 — Lead ingestion & profiles. Pick a screen to preview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group card-surface flex items-center gap-4 p-5 transition hover:shadow-elevated hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition group-hover:bg-gradient-primary group-hover:text-primary-foreground">
              <c.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{c.title}</p>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Index;
