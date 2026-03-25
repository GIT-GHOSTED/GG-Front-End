import { Tabs } from "antd";
import { ExclamationOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function FollowUpToggle({ toggle, setToggle }) {
  return (
    <Tabs
      activeKey={toggle}
      onChange={(key) => setToggle(key)}
      items={[
        {
          key: "upcoming",
          label: "Upcoming",
          icon: <ClockCircleOutlined />,
        },
        {
          key: "overdue",
          label: "Overdue",
          icon: <ExclamationOutlined />,
        },
      ]}
    />
  );
}
