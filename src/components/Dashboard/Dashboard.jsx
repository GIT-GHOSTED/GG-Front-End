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
import { theme as antdTheme } from "antd";

export default function Dashboard() {
  const { applications } = useApplications();
  // Step 1: Extract Ant Design theme tokens for use in Recharts components.
  //   Purpose: Use dynamic colors (colorText, colorBgElevated) that respond to theme mode
  //   Instead of hardcoding colors, we pull from Ant Design's theme to stay in sync
  //   Result: Chart tooltip and legend colors match the current light/dark theme
  const { token: antdToken } = antdTheme.useToken();

  //* Counts all application that contain status word "applied"
  const appliedCount = applications.filter(
    (currApp) => currApp.status === "Applied",
  ).length;

  //* Counts all application that contain status word "interview"
  const interviewCount = applications.filter(
    (currApp) => currApp.status === "Interview",
  ).length;

  //* Counts all application that contain status word "offered"
  const offerCount = applications.filter(
    (currApp) => currApp.status === "Offered",
  ).length;

  //* Counts all application that contain status word "rejected"
  const rejectedCount = applications.filter(
    (currApp) => currApp.status === "Rejected",
  ).length;

  //* Counts all application that contain status word "ghosted"
  const ghostedCount = applications.filter(
    (currApp) => currApp.status === "Ghosted",
  ).length;

  //* Counts total application user has filled out
  const totalApps = applications.length;

  //* Count variables above are saved in array to display data
  //* in PieChart format
  const statusData = [
    { name: "Applied", value: appliedCount },
    { name: "Interviewed", value: interviewCount },
    { name: "Offered", value: offerCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Ghosted", value: ghostedCount },
  ];

  //* Retrieve the four most recent applications user has filled out
  const recentApps = applications.slice(0, 4);

  //* Selection of colors used for the Pie Chart
  const COLORS = ["#8884d8", "#ffc658", "#82ca9d", "#ff6b6b", "#2b2a2a"];

  return (
    <section className="topSection">
      <h2>Dashboard</h2>

      {/* //* DataBox component will display count variables to display data in a
      //*  stylized number format   */}
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
        </section>

        {/* Follow-ups Section*/}
        <section className="followUpSection">
          <section className="followUpToggle">
            {/* //* Conditional render; if "toggle" is true, "upcoming" title is displayed. 
            //* If false, "overdue" title is displayed */}
            <h3>
              {toggle === "upcoming"
                ? "Upcoming Follow-Ups"
                : "Overdue Follow-ups"}
            </h3>
            {/* //* Implementing toggle/tab feature. Will render two tabs for user to alternate 
            //* between; "Upcoming" & "Overdue". UseState var tracks current toggle */}
            <FollowUpToggle toggle={toggle} setToggle={setToggle} />
          </section>
          {/* //* Different follow-up lists are rendered depending on "toggle" useState var. If "toggle" 
          //* "toggle" true, displays "Upcoming". If false, displays "Overdue"  */}
          <FollowUps applications={applications} toggle={toggle} />
        </section>
      </section>

      {/* Recent Applications Section  */}
      <section className="recentApps">
        <h3>Recent Activity</h3>
        <ul>
          {/* //* Component renders list of 4 most recent applications completed */}
          <RecentActivity recentApps={recentApps} />
        </ul>
      </section>
    </section>
  );
}

//* ------------------ COMPONENTS--------------------

//* Used to display the user's application statistics at the top of DashBoard
function DataBox({ number, tag }) {
  return (
    <section className="dataBox">
      <p>{tag}</p>
      <p>{number}</p>
    </section>
  );
}

//* Used to display the user's 4 recent application in a clean row/list format
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
