import { Space, Switch } from "antd";

export default function FollowUpToggle({ toggle, setToggle }) {
  return (
    <Space vertical>
      <Switch
        checked={toggle}
        onChange={setToggle}
        checkedChildren="Overdue"
        unCheckedChildren="Upcoming"
      />
    </Space>
  );
}
