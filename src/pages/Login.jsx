import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await apiClient.post("/auth/login", values);
      const token = res.data.token;
      console.log(res.data);
      localStorage.setItem("token", token);

      message.success("Login successful");
      navigate("/");
    } catch (error) {
      message.error("Login failed");
      console.error(error);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "100px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
}
