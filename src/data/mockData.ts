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

export type PipelineStage = "new" | "contacted" | "warm" | "hot" | "booked" | "closed";

export interface PipelineCard {
  id: string;
  title: string;          // Lead name
  property: string;       // Property / location
  statusLabel: string;    // e.g., "New Lead", "Follow Up"
  lastActivity: string;   // e.g., "2h ago"
  agent: string;          // Assigned agent name (empty = unassigned)
  agentInitials: string;
  price: string;
  stage: PipelineStage;
}

export interface PipelineStageMeta {
  id: PipelineStage;
  title: string;
  dot: string;       // tailwind bg class for dot
  badgeBg: string;   // tailwind bg class for count badge
  badgeText: string; // tailwind text class for count
  ring: string;      // ring color when dragging over
}

export const pipelineStages: PipelineStageMeta[] = [
  { id: "new",       title: "New",       dot: "bg-stage-new",       badgeBg: "bg-stage-new-bg",       badgeText: "text-stage-new",       ring: "ring-stage-new" },
  { id: "contacted", title: "Contacted", dot: "bg-stage-contacted", badgeBg: "bg-stage-contacted-bg", badgeText: "text-stage-contacted", ring: "ring-stage-contacted" },
  { id: "warm",      title: "Warm",      dot: "bg-stage-warm",      badgeBg: "bg-stage-warm-bg",      badgeText: "text-stage-warm",      ring: "ring-stage-warm" },
  { id: "hot",       title: "Hot",       dot: "bg-stage-hot",       badgeBg: "bg-stage-hot-bg",       badgeText: "text-stage-hot",       ring: "ring-stage-hot" },
  { id: "booked",    title: "Booked",    dot: "bg-stage-booked",    badgeBg: "bg-stage-booked-bg",    badgeText: "text-stage-booked",    ring: "ring-stage-booked" },
  { id: "closed",    title: "Closed",    dot: "bg-stage-closed",    badgeBg: "bg-stage-closed-bg",    badgeText: "text-stage-closed",    ring: "ring-stage-closed" },
];

export const agents = [
  "All Regional Agents",
  "Sarah Jenkins",
  "David Miller",
  "Lena Park",
  "Marcus Thorne",
  "Elena Petrova",
];

export const pipelineCards: PipelineCard[] = [
  { id: "p1", title: "Marcus Thompson", property: "Penthouse Search • Soho", statusLabel: "New Lead", lastActivity: "2h ago", agent: "Sarah Jenkins", agentInitials: "SJ", price: "$3.2M", stage: "new" },
  { id: "p2", title: "Elena Rodriguez", property: "Waterfront Villa • Miami", statusLabel: "New Lead", lastActivity: "5h ago", agent: "David Miller", agentInitials: "DM", price: "$5.4M", stage: "new" },
  { id: "p3", title: "Jonathan Wu", property: "Investment Portfolio • London", statusLabel: "Follow Up", lastActivity: "Yesterday", agent: "Lena Park", agentInitials: "LP", price: "$7.8M", stage: "contacted" },
  { id: "p4", title: "Sarah Jenkins", property: "Single Family • Austin", statusLabel: "In Negotiation", lastActivity: "3d inactive", agent: "Marcus Thorne", agentInitials: "MT", price: "$1.9M", stage: "warm" },
  { id: "p5", title: "David Park", property: "Commercial Tower • NYC", statusLabel: "Hot Lead", lastActivity: "1h ago", agent: "Sarah Jenkins", agentInitials: "SJ", price: "$12.4M", stage: "hot" },
  { id: "p6", title: "Priya Shah", property: "Townhouse • Brooklyn", statusLabel: "Booked Tour", lastActivity: "Today", agent: "David Miller", agentInitials: "DM", price: "$2.6M", stage: "booked" },
  { id: "p7", title: "Harbor View Condo", property: "Closed Deal • Boston", statusLabel: "Closed Won", lastActivity: "1w ago", agent: "Elena Petrova", agentInitials: "EP", price: "$2.9M", stage: "closed" },
];

export const unassignedLeads: PipelineCard[] = [
  { id: "u1", title: "Robert Chen", property: "Luxury Loft • Chicago", statusLabel: "New Lead", lastActivity: "30m ago", agent: "", agentInitials: "?", price: "$2.1M", stage: "new" },
  { id: "u2", title: "Amelia Brooks", property: "Beach House • Malibu", statusLabel: "New Lead", lastActivity: "1h ago", agent: "", agentInitials: "?", price: "$6.8M", stage: "new" },
  { id: "u3", title: "Tomás Rivera", property: "Studio • SF", statusLabel: "New Lead", lastActivity: "3h ago", agent: "", agentInitials: "?", price: "$1.4M", stage: "new" },
];
