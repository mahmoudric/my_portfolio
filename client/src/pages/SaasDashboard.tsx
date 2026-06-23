import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  ChevronLeft,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Download,
  Filter,
  Calendar,
  Settings,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";

/**
 * SaaS Dashboard - Interactive Demo
 * Features: Data visualization, responsive design, interactive charts, real-time metrics
 */

interface DashboardMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface ChartDataPoint {
  name: string;
  value?: number;
  revenue?: number;
  users?: number;
  conversions?: number;
  percentage?: number;
}

const REVENUE_DATA: ChartDataPoint[] = [
  { name: "Jan", value: 4000, revenue: 2400, users: 2210 },
  { name: "Feb", value: 3000, revenue: 1398, users: 2290 },
  { name: "Mar", value: 2000, revenue: 9800, users: 2000 },
  { name: "Apr", value: 2780, revenue: 3908, users: 2108 },
  { name: "May", value: 1890, revenue: 4800, users: 2200 },
  { name: "Jun", value: 2390, revenue: 3800, users: 2250 },
];

const CONVERSION_DATA: ChartDataPoint[] = [
  { name: "Week 1", conversions: 65 },
  { name: "Week 2", conversions: 78 },
  { name: "Week 3", conversions: 72 },
  { name: "Week 4", conversions: 85 },
  { name: "Week 5", conversions: 92 },
  { name: "Week 6", conversions: 88 },
];

const USER_DISTRIBUTION: ChartDataPoint[] = [
  { name: "Free Plan", percentage: 45 },
  { name: "Pro Plan", percentage: 35 },
  { name: "Enterprise", percentage: 20 },
];

const TRAFFIC_DATA: ChartDataPoint[] = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

const COLORS = ["#d97706", "#f59e0b", "#10b981"];

export default function SaasDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metrics: DashboardMetric[] = [
    {
      label: "Total Revenue",
      value: "$45,231.89",
      change: 20.1,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Users",
      value: "12,543",
      change: 15.3,
      icon: <Users className="w-6 h-6" />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: 4.3,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "System Status",
      value: "99.8%",
      change: 0.1,
      icon: <Activity className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-accent hover:text-accent/80"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Portfolio
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 border-r border-border bg-card overflow-hidden`}
        >
          <nav className="p-6 space-y-4">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
              Main Menu
            </div>
            {[
              "Dashboard",
              "Analytics",
              "Reports",
              "Users",
              "Settings",
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's your performance overview.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Calendar className="w-4 h-4" />
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-transparent outline-none text-sm font-medium"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedMetric(
                      selectedMetric === metric.label ? null : metric.label
                    )
                  }
                  className={`bg-card rounded-lg border border-border p-6 transition-all hover:shadow-lg ${
                    selectedMetric === metric.label
                      ? "ring-2 ring-accent border-accent"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      {metric.icon}
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        metric.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </button>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Revenue Trend
                  </h2>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={REVENUE_DATA}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#d97706"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* User Distribution */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2
                  className="text-lg font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Plan Distribution
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={USER_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) =>
                        `${name}: ${percentage}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conversion Rate */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2
                  className="text-lg font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Conversion Rate
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={CONVERSION_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Traffic */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2
                  className="text-lg font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Weekly Traffic
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={TRAFFIC_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2
                className="text-lg font-bold mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  {
                    action: "New user signup",
                    user: "John Doe",
                    time: "2 hours ago",
                  },
                  {
                    action: "Payment received",
                    user: "$1,200 from Acme Corp",
                    time: "4 hours ago",
                  },
                  {
                    action: "Plan upgraded",
                    user: "Sarah Smith",
                    time: "6 hours ago",
                  },
                  {
                    action: "Report generated",
                    user: "Monthly Analytics",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                This is an interactive demo showcasing React.js data visualization
                capabilities and responsive dashboard design patterns.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
