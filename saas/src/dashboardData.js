export const METRICS_DATA = {
  mrr: {
    label: "Monthly Recurring Revenue",
    value: "$42,850",
    change: "+12.4%",
    positive: true,
  },
  activeUsers: {
    label: "Active Subscribers",
    value: "2,410",
    change: "+8.1%",
    positive: true,
  },
  conversionRate: {
    label: "Trial Conversion",
    value: "4.35%",
    change: "-0.6%",
    positive: false,
  },
  churnRate: {
    label: "Churn Rate",
    value: "1.8%",
    change: "-0.3%",
    positive: true,
  },
};

export const REVENUE_HISTORY = [
  { month: "Jan", revenue: 28000 },
  { month: "Feb", revenue: 31000 },
  { month: "Mar", revenue: 33500 },
  { month: "Apr", revenue: 37000 },
  { month: "May", revenue: 39800 },
  { month: "Jun", revenue: 42850 },
];

export const TRANSACTIONS_DATA = [
  {
    id: "TX101",
    user: "Apex Logistics",
    plan: "Enterprise",
    amount: "$1,200",
    status: "Paid",
    date: "2026-08-28",
  },
  {
    id: "TX102",
    user: "DevPulse Tech",
    plan: "Pro",
    amount: "$299",
    status: "Paid",
    date: "2026-08-27",
  },
  {
    id: "TX103",
    user: "CloudScale Inc",
    plan: "Enterprise",
    amount: "$1,200",
    status: "Pending",
    date: "2026-08-26",
  },
  {
    id: "TX104",
    user: "PixelCraft Studio",
    plan: "Starter",
    amount: "$49",
    status: "Paid",
    date: "2026-08-25",
  },
  {
    id: "TX105",
    user: "Nexus Systems",
    plan: "Pro",
    amount: "$299",
    status: "Failed",
    date: "2026-08-24",
  },
];
