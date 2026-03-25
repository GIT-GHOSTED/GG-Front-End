import { Tabs } from "antd";
import { ExclamationOutlined, ClockCircleOutlined } from "@ant-design/icons";

//* Component renders tab toggle that allows user to switch between "Upcoming" and "Overdue" follow-ups
export default function FollowUpToggle({ toggle, setToggle }) {
  return (
    <Tabs
      //* "activeKey" determines which tab is currently selected based on toggle state
      activeKey={toggle}
      //* Updates toggle state when user switches between tabs
      onChange={(key) => setToggle(key)}
      //* Defines the tabs displayed to the user along with labels and icons
      items={[
        {
          //* This is tab for displaying upcoming follow-ups
          key: "upcoming",
          label: "Upcoming",
          icon: <ClockCircleOutlined />,
        },
        {
          //* This is tab for displaying overdue follow-ups
          key: "overdue",
          label: "Overdue",
          icon: <ExclamationOutlined />,
        },
      ]}
    />
  );
}
