import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Groups applications by month and counts how many applications per month.
 * Returns an array suitable for Recharts.
 * @param {Array} applications - Array of application objects with `dateApplied`
 */
function groupApplicationsByMonth(applications) {
  const map = {};

  applications.map((currApp) => {
    if (!currApp.date_applied) return;

    const date = new Date(currApp.date_applied);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!map[key]) {
      map[key] = {
        month: date.toLocaleString("default", { month: "short" }),
        total: 0,
      };
    }

    map[key].total++;
  });

  // Sorting by year-month to ensure chronological order
  return Object.entries(map)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([_, value]) => value);
}

/**
 * AppAreaChart component
 * @param {Array} applications - Array of application objects to visualize
 */
export default function AppAreaChart({ applications }) {
  const data = groupApplicationsByMonth(applications);

  return (
    <section style={{ width: "100%", height: "200px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fill="url(#colorApps)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
