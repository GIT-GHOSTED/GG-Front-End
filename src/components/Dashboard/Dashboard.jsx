// TODO ADD BETTER COMMENTS
import "./Dashboard.css";
import { useApplications } from "../../context/applicationsContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import FollowUps from "../FollowUps/FollowUps";
import FollowUpToggle from "../FollowUps/FollowUpToggle";
import { useState } from "react";

export default function Dashboard() {
  const { applications } = useApplications();
  const [toggle, setToggle] = useState("upcoming");

  const appliedCount = applications.filter(
    (curApp) => curApp.status === "Applied",
  ).length;

  const interviewCount = applications.filter(
    (currApp) => currApp.status === "Interview",
  ).length;

  const offerCount = applications.filter(
    (currApp) => currApp.status === "Offered",
  ).length;

  const rejectedCount = applications.filter(
    (currApp) => currApp.status === "Rejected",
  ).length;

  const ghostedCount = applications.filter(
    (currApp) => currApp.status === "Ghosted",
  ).length;

  const totalApps = applications.length;

  // Data for chart
  const statusData = [
    { name: "Applied", value: appliedCount },
    { name: "Interviewed", value: interviewCount },
    { name: "Offered", value: offerCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Ghosted", value: ghostedCount },
  ];

  // Data for recent applications
  const recentApps = applications.slice(0, 4);

  const COLORS = ["#8884d8", "#ffc658", "#82ca9d", "#ff6b6b", "#2b2a2a"];

  return (
    <section className="topSection">
      <h2>Dashboard</h2>

      <section className="appDetails">
        <DataBox number={totalApps} tag={"Total Applications"} />
        <DataBox number={interviewCount} tag={"Interviews"} />
        <DataBox number={rejectedCount} tag={"Rejected"} />
        <DataBox number={offerCount} tag={"Offers"} />
        <DataBox number={ghostedCount} tag={"Ghosted"} />
      </section>

      <section className="topRow">
        {/* Pie Chart Section */}
        <section className="pieChartSection">
          <h3>Status Breakdown</h3>

          {/* Implementing Pie Chart component */}
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

              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="left" />
            </PieChart>
          </ResponsiveContainer>
        </section>

        {/* Follow-ups Section*/}
        <section className="followUpSection">
          <section className="followUpToggle">
            <h3>
              {toggle === "upcoming"
                ? "Upcoming Follow-Ups"
                : "Overdue Follow-ups"}
            </h3>
            <FollowUpToggle toggle={toggle} setToggle={setToggle} />
          </section>
          <FollowUps applications={applications} toggle={toggle} />
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
