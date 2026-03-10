import {
  Modal,
  Checkbox,
  Input,
  Button,
  Space,
  Select,
  Row,
  Col,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const categoryOptions = [
  { label: "Learning", value: "learning" },
  { label: "Practice", value: "practice" },
  { label: "Project", value: "project" },
  { label: "Preparation", value: "preparation" },
  { label: "Research", value: "research" },
];

export default function GoalsModal({ open, setOpen, goals = [], chatId }) {
  const [goalList, setGoalList] = useState(goals);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (goals?.length) {
      setGoalList(goals);
    }
  }, [goals]);

  const toggleGoal = (index) => {
    const updated = [...goalList];
    updated[index].isDone = !updated[index].isDone;
    setGoalList(updated);
  };

  const editGoal = (value, index) => {
    const updated = [...goalList];
    updated[index].title = value;
    setGoalList(updated);
  };

  const changePriority = (value, index) => {
    const updated = [...goalList];
    updated[index].priority = value;
    setGoalList(updated);
  };

  const changeCategory = (value, index) => {
    const updated = [...goalList];
    updated[index].category = value;
    setGoalList(updated);
  };

  const removeGoal = (index) => {
    setGoalList(goalList.filter((_, i) => i !== index));
  };

  const addGoal = () => {
    setGoalList([
      ...goalList,
      {
        title: "",
        priority: "medium",
        category: "practice",
        isDone: false,
      },
    ]);
  };

  const saveGoals = async () => {
    setLoading(true);
    await apiClient.post("/goals/save", { goals: goalList });
    setLoading(false);
    setOpen(false);
    message.success("Goals saved successfully");
  };

  return (
    <Modal
      title="Goal Planner"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={750}
    >
      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          paddingRight: 6,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size={16}>
          {goalList.map((goal, index) => (
            <Row key={index} gutter={10} align="middle">
              <Col>
                <Checkbox
                  checked={goal.isDone}
                  onChange={() => toggleGoal(index)}
                />
              </Col>

              <Col flex="auto">
                <Input.TextArea
                  rows={2}
                  value={goal.title}
                  onChange={(e) => editGoal(e.target.value, index)}
                  placeholder="Enter goal task"
                />
              </Col>

              <Col>
                <Select
                  style={{ width: 110 }}
                  value={goal.priority}
                  options={priorityOptions}
                  onChange={(v) => changePriority(v, index)}
                />
              </Col>

              <Col>
                <Select
                  style={{ width: 130 }}
                  value={goal.category}
                  options={categoryOptions}
                  onChange={(v) => changeCategory(v, index)}
                />
              </Col>

              <Col>
                <DeleteOutlined
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => removeGoal(index)}
                />
              </Col>
            </Row>
          ))}
        </Space>
      </div>

      <Space
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={addGoal}>+ Add Goal</Button>

        <Space>
          <Button type="primary" onClick={saveGoals} loading={loading}>
            Save Goals
          </Button>
        </Space>
      </Space>
    </Modal>
  );
}
