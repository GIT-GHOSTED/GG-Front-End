import { Space, Switch } from "antd";

export default function FollowUpToggle() {
  return (
    <Space vertical>
      <Switch checkedChildren="Upcoming" unCheckedChildren="Overdue" />
    </Space>
  );
}
