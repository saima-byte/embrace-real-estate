export type LeadStatus = "new" | "assigned" | "in-progress" | "closed";

export interface Lead {
  id: string;
  initials: string;
  name: string;
  email: string;
  source: "Organic Web" | "API Portal" | "CSV Import" | "Zillow Premium";
  propertyInterest: string;
  priceRange?: string;
  zip: string;
  neighborhood: string;
  status: LeadStatus;
  assignedTo?: string;
  estimatedValue?: number;
}

export const masterLeads: Lead[] = [
  {
    id: "L-9842", initials: "MT", name: "Marcus Thorne", email: "m.thorne@estate.com",
    source: "Organic Web", propertyInterest: "Skyline Penthouse II", zip: "10012",
    neighborhood: "SoHo / NoHo", status: "new", estimatedValue: 3850000,
  },
  {
    id: "L-9843", initials: "AV", name: "Alexandra Vane", email: "vane.invest@global.co",
    source: "API Portal", propertyInterest: "Riverside Estate Portfolio", zip: "10001",
    neighborhood: "Chelsea / Hudson Yards", status: "assigned", assignedTo: "David Miller",
    estimatedValue: 7200000,
  },
  {
    id: "L-9844", initials: "JW", name: "Jonathan Wu", email: "j.wu@tech-growth.com",
    source: "CSV Import", propertyInterest: "Silicon Valley Office Park", zip: "10011",
    neighborhood: "West Village", status: "new", estimatedValue: 12400000,
  },
  {
    id: "L-9845", initials: "JS", name: "Julianna Smithers", email: "julianna.s@email.com",
    source: "Organic Web", propertyInterest: "Luxury Loft", priceRange: "$3.5M - $4.2M",
    zip: "10012", neighborhood: "SoHo / NoHo", status: "new",
  },
  {
    id: "L-9846", initials: "ML", name: "Marcus Leone", email: "m.leone@corporate.com",
    source: "API Portal", propertyInterest: "Studio/Condo", priceRange: "$1.2M - $1.8M",
    zip: "10001", neighborhood: "Chelsea / Hudson Yards", status: "assigned", assignedTo: "Sarah Jenkins",
  },
  {
    id: "L-9847", initials: "EP", name: "Elena Petrova", email: "e.petrova@investment.ru",
    source: "Organic Web", propertyInterest: "Multi-Family", priceRange: "$5.0M+",
    zip: "10011", neighborhood: "West Village", status: "new",
  },
  {
    id: "L-9848", initials: "DA", name: "David Abernathy", email: "dave@abernathyinc.com",
    source: "CSV Import", propertyInterest: "Townhouse", priceRange: "$8.5M - $10M",
    zip: "10012", neighborhood: "Greenwich Village", status: "assigned", assignedTo: "Sarah Jenkins",
  },
];

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "import" | "assign" | "email" | "call";
}

export const activityTimeline: ActivityEvent[] = [
  {
    id: "1", type: "import", title: "Lead Imported",
    description: "Lead source: Zillow Premium. Automatically verified and scrubbed.",
    date: "OCT 12, 2023 · 09:42 AM",
  },
  {
    id: "2", type: "assign", title: "Assigned to Agent",
    description: "Lead routed to Sarah Jenkins based on zip code performance metrics.",
    date: "OCT 12, 2023 · 10:15 AM",
  },
  {
    id: "3", type: "email", title: "Email Interaction",
    description: 'User opened "Welcome Portfolio" email and clicked on Mortgage Comparison Tool.',
    date: "OCT 13, 2023 · 02:22 PM",
  },
  {
    id: "4", type: "call", title: "Phone Consultation Scheduled",
    description: "Lead requested a callback for valuation deep-dive. Scheduled for Tomorrow at 10:00 AM.",
    date: "OCT 14, 2023 · 11:05 AM",
  },
];

export interface PipelineCard {
  id: string;
  title: string;
  agent: string;
  initials: string;
  price: string;
  image?: string;
}

export const pipelineColumns: { id: string; title: string; color: string; cards: PipelineCard[] }[] = [
  {
    id: "new", title: "New", color: "bg-status-new",
    cards: [
      { id: "p1", title: "Modern Loft #18", agent: "Marcus Thorne", initials: "MT", price: "$1.2M" },
      { id: "p2", title: "West Side Brownstone", agent: "Lena Park", initials: "LP", price: "$2.4M" },
    ],
  },
  {
    id: "contacted", title: "Contacted", color: "bg-status-progress",
    cards: [
      { id: "p3", title: "Skyline Penthouse", agent: "Sarah Jenkins", initials: "SJ", price: "$3.85M" },
    ],
  },
  {
    id: "warm", title: "Warm", color: "bg-status-assigned",
    cards: [
      { id: "p4", title: "East Valley Estate", agent: "David Miller", initials: "DM", price: "$5.1M" },
    ],
  },
  {
    id: "closed", title: "Closed", color: "bg-status-closed",
    cards: [
      { id: "p5", title: "Harbor View Condo", agent: "Elena Petrova", initials: "EP", price: "$2.9M" },
    ],
  },
];
