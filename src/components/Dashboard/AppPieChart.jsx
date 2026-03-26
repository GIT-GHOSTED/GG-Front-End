import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AppPieChart({ statusData }) {
  //* Selection of colors used for the Pie Chart
  const COLORS = ["#0d74e7", "#ffc658", "#82ca9d", "#ff6b6b", "#2b2a2a"];

  return (
    <section className="chartWrapper">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            outerRadius="100%"
            dataKey="value"
          >
            {statusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip: Show data on hover with theme-aware colors.
                            - contentStyle: background and text colors match current theme token
                            - itemStyle / labelStyle: Ensures tooltip text is readable in light/dark mode
                            - Colors pulled from antdToken so they stay in sync with theme toggle
                        */}
          <Tooltip
            contentStyle={{
              backgroundColor: antdToken.colorBgElevated,
              borderColor: antdToken.colorBorder,
              color: antdToken.colorText,
            }}
            itemStyle={{ color: antdToken.colorText }}
            labelStyle={{ color: antdToken.colorText }}
          />
          {/* Legend: Show status labels below chart with theme-aware colors.
                            - layout/verticalAlign/align: Position legend on left side vertically
                            - formatter: Custom function wraps text in span with theme-aware color
                            - Result: Legend labels remain visible and readable in both light and dark modes
                        */}
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="left"
            formatter={(value) => (
              <span style={{ color: antdToken.colorText }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
