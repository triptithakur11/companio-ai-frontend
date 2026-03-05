import { Form, Input, Button, Card } from "antd";

export default function Login() {

  return (

    <Card title="Login">

      <Form layout="vertical">

        <Form.Item label="Email">
          <Input />
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password />
        </Form.Item>

        <Button type="primary">
          Login
        </Button>

      </Form>

    </Card>

  );
}