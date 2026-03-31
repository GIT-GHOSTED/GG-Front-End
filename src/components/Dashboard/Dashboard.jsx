import "./Dashboard.css";
import { useState } from "react";
import { useApplications } from "../../context/applicationsContext";
import FollowUps from "../FollowUps/FollowUps";
import FollowUpToggle from "../FollowUps/FollowUpToggle";
import AppAreaChart from "./AppAreaChart/AppAreaChart";
import AppPieChart from "./AppPieChart";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { applications } = useApplications();
  const [toggle, setToggle] = useState("upcoming"); // track follow-up tab: 'upcoming' or 'overdue'
  // Step 1: Extract Ant Design theme tokens for use in Recharts components.
  //   Purpose: Use dynamic colors (colorText, colorBgElevated) that respond to theme mode
  //   Instead of hardcoding colors, we pull from Ant Design's theme to stay in sync
  //   Result: Chart tooltip and legend colors match the current light/dark theme

  //* Counts all application that contain status word "applied"
  const appliedCount = applications.filter(
    (currApp) => currApp.status === "applied",
  ).length;

  //* Counts all application that contain status word "interview"
  const interviewCount = applications.filter(
    (currApp) => currApp.status === "interviewed",
  ).length;

  //* Counts all application that contain status word "offered"
  const offerCount = applications.filter(
    (currApp) => currApp.status === "offered",
  ).length;

  //* Counts all application that contain status word "rejected"
  const rejectedCount = applications.filter(
    (currApp) => currApp.status === "rejected",
  ).length;

  //* Counts all application that contain status word "ghosted"
  const ghostedCount = applications.filter(
    (currApp) => currApp.status === "ghosted",
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

  return (
    <>
      <h2>Dashboard</h2>
      <section className="topSection">
        {/* //* DataBox component will display count variables to display data in a
      //*  stylized number format   */}
        <section className="appDetails">
          <DataBox number={totalApps} tag={"Total Applications"} />
          <DataBox number={interviewCount} tag={"Interviewed"} />
          <DataBox number={rejectedCount} tag={"Rejected"} />
          <DataBox number={offerCount} tag={"Offered"} />
          <DataBox number={ghostedCount} tag={"Ghosted"} />
        </section>

        <section className="topRow">
          {/* Pie Chart Section */}
          <section className="pieChartSection">
            <h3>Status Breakdown</h3>

            {/* Implementing Pie Chart component */}
            <AppPieChart statusData={statusData} />
          </section>

          {/* Recent Applications Section  */}
          <section className="recentApps">
            <h3>Recent Activity</h3>
            <ul>
              {/* //* Component renders list of 4 most recent applications completed */}
              <RecentActivity recentApps={recentApps} />
            </ul>
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

        {/*AREA CHART SECTION  */}
        <section>
          <AppAreaChart applications={applications} />
        </section>
      </section>
    </>
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
  const navigate = useNavigate();
  return recentApps.map((currApp, index) => (
    <li
      className="recentAppList"
      key={index}
      onClick={() => navigate(`/applications/${currApp.id}`)}
    >
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
