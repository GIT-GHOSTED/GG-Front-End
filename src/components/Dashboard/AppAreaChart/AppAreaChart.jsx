import "./AppAreaChart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { theme as antdTheme } from "antd";

/**
 * Groups applications by month and counts how many applications per month.
 * Returns an array suitable for Recharts.
 * @param {Array} applications - Array of application objects with `dateApplied`
 */
function groupApplicationsByMonth(applications) {
  const map = {};

  applications.forEach((currApp) => {
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
  // Pull theme-aware colors from Ant Design so the chart matches light/dark mode.
  const { token: antdToken } = antdTheme.useToken();

  return (
    <section className="app-area-chart-section">
      <h3>Applications Over Time</h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={antdToken.colorPrimary}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={antdToken.colorPrimary}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          {/* Grid lines match the theme's border color */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={antdToken.colorBorderSecondary}
          />

          {/* Axis tick labels match the theme's text color */}
          <XAxis dataKey="month" tick={{ fill: antdToken.colorText }} />
          <YAxis tick={{ fill: antdToken.colorText }} />

          {/* Tooltip background and text use elevated surface + text tokens */}
          <Tooltip
            contentStyle={{
              backgroundColor: antdToken.colorBgElevated,
              border: `1px solid ${antdToken.colorBorder}`,
              color: antdToken.colorText,
              borderRadius: antdToken.borderRadius,
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke={antdToken.colorPrimary}
            fill="url(#colorApps)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
