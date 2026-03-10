import { Form, Input, Button, Card } from "antd";

export default function Signup() {
  return (
    <Card title="Create Account">
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input />
        </Form.Item>

        <Form.Item label="Email">
          <Input />
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password />
        </Form.Item>

        <Button type="primary">Signup</Button>
      </Form>
    </Card>
  );
}
