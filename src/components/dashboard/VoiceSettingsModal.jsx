import { Modal, Form, Select, Slider, Button, message, Input } from "antd";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

const { Option } = Select;

export default function VoiceSettingsModal({ open, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [assistantName, setAssistantName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const saved = user?.voiceSettings;
    if (saved) form.setFieldsValue(saved);
  }, []);

  const handleSave = async (values) => {
    try {
      setLoading(true);
      const res = await apiClient.put("user/voice-settings", values);
      if (res.status === 200) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.voiceSettings = values;
        localStorage.setItem("user", JSON.stringify(user));
        message.success("Voice settings saved successfully");
      } else {
        message.error("Failed to save voice settings");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      title="🎙️ Voice Settings"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSave}
        initialValues={{
          voice: "male",
          style: "assistant",
          speed: 1.05,
          pitch: 2,
          styleDegree: 1.35,
        }}
      >
        <Form.Item label="Name" name="username">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Assistant Name" name="assistantName">
          <Input
            placeholder="Enter assistant name"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Voice" name="voice">
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Style" name="style">
          <Select>
            <Option value="assistant">Assistant</Option>
            <Option value="friendly">Friendly</Option>
            <Option value="cheerful">Cheerful</Option>
            <Option value="calm">Calm</Option>
            <Option value="excited">Excited</Option>
            <Option value="sad">Sad</Option>
            <Option value="angry">Angry</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Speed" name="speed">
          <Slider min={0.8} max={1.5} step={0.05} />
        </Form.Item>

        <Form.Item label="Pitch" name="pitch">
          <Slider min={-10} max={10} step={1} />
        </Form.Item>

        <Form.Item label="Emotion Intensity" name="styleDegree">
          <Slider min={0.5} max={2} step={0.1} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Save Settings
        </Button>
      </Form>
    </Modal>
  );
}