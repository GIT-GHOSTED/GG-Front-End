import { Link } from "react-router";
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

  // Dummy data for recent applications
  const recentApps = [
    {
      company: "Netflix",
      role: "Frontend Dev",
      date: "2026-03-21",
      status: "Interviewed",
    },
    {
      company: "Apple",
      role: "UI Engineer",
      date: "2026-03-20",
      status: "Applied",
    },
    {
      company: "Tesla",
      role: "Software Eng",
      date: "2026-03-19",
      status: "Rejected",
    },
    {
      company: "Spotify",
      role: "Web Dev",
      date: "2026-03-18",
      status: "Rejected",
    },
  ];

  // Dummy data for follow-ups
  const followUps = [
    { company: "Google", role: "Senior Frontend Engineer", date: "2026-03-25" },
    { company: "Amazon", role: "Product Designer", date: "2026-03-27" },
    { company: "Meta", role: "Fullstack Developer", date: "2026-03-30" },
  ];

  const COLORS = ["#8884d8", "#ffc658", "#82ca9d", "#ff6b6b"];

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Dashboard</h2>

      <section className="appDetails">
        <DataBox number={7} tag={"Active"} />
        <DataBox number={2} tag={"Interviews"} />
        <DataBox number={1} tag={"Offers"} />
        <DataBox number={3} tag={"Follow Ups"} />
      </section>

      <section className="topRow">
        {/* Pie Chart Section */}
        <section className="pieChartSection">
          <h3>Status Breakdown</h3>

          {/* Implementing Pie Chart component */}
          <PieChart width={400} height={200}>
            <Pie
              data={statusData}
              cx="30%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="left" />
          </PieChart>
        </section>

        {/* Follow-ups Section*/}
        <section className="followUpsSection">
          <h3>Upcoming Follow-ups</h3>
          <ul>
            <FollowUps followUps={followUps} />
          </ul>
        </section>
      </section>

      {/* Recent Applications Section  */}
      <section className="recentApps">
        <h3>Recent Activity</h3>
        <ul>
          {/* Component that renders list of recent applications completed */}
          <RecentActivity recentApps={recentApps} />
        </ul>
      </section>
    </section>
  );
}

//* ------------------ COMPONENTS--------------------

function DataBox({ number, tag }) {
  return (
    <section className="dataBox">
      <p>{tag}</p>
      <p>{number}</p>
    </section>
  );
}

function RecentActivity({ recentApps }) {
  return recentApps.map((currApp, index) => (
    <li className="recentAppList" key={index}>
      <section>
        <p>{currApp.company}</p>
        <p>{currApp.role}</p>
      </section>
      <section>
        <p>{currApp.date}</p>
        <p>{currApp.status}</p>
      </section>
    </li>
  ));
}

function FollowUps({ followUps }) {
  return followUps.map((currItem, index) => (
    <li className="recentAppList" key={index}>
      <section>
        <p>{currItem.company}</p>
        <p>{currItem.role}</p>
      </section>
      <section>
        <p>{currItem.date}</p>
      </section>
    </li>
  ));
}
