import { Form, Input, Button, Card, message, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    message.info(
      "Demo credentials are available below. Copy & paste to login.",
    );
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await apiClient.post("/auth/login", values);
      const token = res.data.token;

      localStorage.setItem("token", token);

      const userRes = await apiClient.get("/user");
      const user = userRes.data;
      localStorage.setItem("user", JSON.stringify(user));
      message.success("Login successful");
      navigate("/");
    } catch (error) {
      message.error("Login failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "100px auto" }}>
      <Alert
        type="info"
        showIcon
        message="Demo Credentials"
        description={
          <div>
            <div>
              <b>Email:</b> john.doe@example.com
            </div>
            <div>
              <b>Password:</b> password123
            </div>
          </div>
        }
        style={{ marginBottom: 20 }}
      />

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form>
    </Card>
  );
}