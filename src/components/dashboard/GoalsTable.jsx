import {
  Table,
  Checkbox,
  Select,
  Input,
  Button,
  Popconfirm,
  message,
  Flex,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  SaveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export default function GoalsTable({ data }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setGoals(data);
    }
  }, [data]);

  const addGoal = () => {
    const newGoal = {
      title: "",
      priority: "medium",
      category: "learning",
      isDone: false,
    };

    setGoals([...goals, newGoal]);
  };

  const saveGoals = async () => {
    try {
      setLoading(true);

      await apiClient.post("/goals/save", {
        goals,
      });

      message.success("Goals saved successfully");
      window.location.reload();
    } catch (err) {
      message.error("Failed to save goals");
    } finally {
      setLoading(false);
    }
  };

  const updateGoal = (updatedGoal, index) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = updatedGoal;

    setGoals(updatedGoals);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const rows = goals.map((g) => [
      g.title,
      g.priority,
      g.category,
      g.isDone ? "Done" : "Pending",
    ]);

    doc.text("Goals Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [["Goal", "Priority", "Category", "Status"]],
      body: rows,
    });

    doc.save("goals-report.pdf");
  };

  const columns = [
    {
      title: "Done",
      dataIndex: "isDone",
      width: 80,
      render: (_, record, index) => (
        <Checkbox
          checked={record.isDone}
          onChange={(e) =>
            updateGoal({ ...record, isDone: e.target.checked }, index)
          }
        />
      ),
    },
    {
      title: "Goal",
      dataIndex: "title",
      render: (_, record, index) => (
        <Input.TextArea
          rows={2}
          placeholder="Enter goal..."
          value={record.title}
          onChange={(e) =>
            updateGoal({ ...record, title: e.target.value }, index)
          }
        />
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 140,
      render: (_, record, index) => (
        <Select
          value={record.priority}
          options={priorityOptions}
          style={{ width: "100%" }}
          onChange={(value) =>
            updateGoal({ ...record, priority: value }, index)
          }
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 160,
      render: (_, record, index) => (
        <Select
          value={record.category}
          options={categoryOptions}
          style={{ width: "100%" }}
          onChange={(value) =>
            updateGoal({ ...record, category: value }, index)
          }
        />
      ),
    },
    {
      title: "",
      width: 60,
      render: (_, __, index) => (
        <Popconfirm
          title="Delete this goal?"
          onConfirm={() => deleteGoal(index)}
        >
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Button icon={<PlusOutlined />} onClick={addGoal}>
          Add Goal
        </Button>
        <Flex gap={4}>
          <Button icon={<DownloadOutlined />} onClick={exportPDF}>
            Export PDF
          </Button>
          <Button
            icon={<SaveOutlined />}
            type="primary"
            onClick={saveGoals}
            loading={loading}
          >
            Save Goals
          </Button>
        </Flex>
      </Flex>

      <Table
        rowKey={(r, i) => i}
        columns={columns}
        dataSource={goals}
        pagination={false}
        bordered
        scroll={{ y: 380 }}
      />
    </>
  );
}
