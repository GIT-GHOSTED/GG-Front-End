import { Link } from "react-router-dom";
import "./Dashboard.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  // Dummy data for chart
  const statusData = [
    { name: "Applied", value: 5 },
    { name: "Interviewed", value: 2 },
    { name: "Offered", value: 1 },
    { name: "Rejected", value: 3 },
  ];

  const COLORS = ["#8884d8", "#ffc658", "#82ca9d", "#ff6b6b"];

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Dashboard</h2>
      <p>Welcome back. Use the links below to manage your applications.</p>

      <section className="appDetails">
        <DataBox number={7} tag={"Active"} />
        <DataBox number={2} tag={"Interviews"} />
        <DataBox number={1} tag={"Offers"} />
        <DataBox number={3} tag={"Follow Ups"} />
      </section>

      {/* STATUS BREAKDOWN */}
      <section className="dashboardSection">
        <h3>Status Breakdown</h3>

        <PieChart width={300} height={300}>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {/* Applies a color to the corresponding index/"data" in "statusData" */}
            {statusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </section>

      {/* NAV LINKS */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link to="/applications">All applications</Link>
        <Link to="/applications/new">Add application</Link>
      </div>
    </section>
  );
}

function DataBox({ number, tag }) {
  return (
    <section className="dataBox">
      <p>{tag}</p>
      <p>{number}</p>
    </section>
  );
}
