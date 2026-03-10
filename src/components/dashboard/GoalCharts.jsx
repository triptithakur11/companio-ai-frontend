import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function GoalCharts({ data }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (data) {
      setGoals(data);
    }
  }, [data]);

  const doneCount = goals.filter((g) => g.isDone).length;
  const pendingCount = goals.length - doneCount;

  const totalGoals = goals.length || 1;

  const completionPercent = Math.round((doneCount / totalGoals) * 100);

  const completionData = [
    { name: "Completed", value: doneCount },
    { name: "Pending", value: pendingCount },
  ];

  const completionColors = {
    Completed: "#52c41a",
    Pending: "#1677ff",
  };

  const priorityMap = {};
  const categoryMap = {};

  goals.forEach((g) => {
    priorityMap[g.priority] = (priorityMap[g.priority] || 0) + 1;
    categoryMap[g.category] = (categoryMap[g.category] || 0) + 1;
  });

  const priorityData = Object.keys(priorityMap).map((key) => ({
    name: key,
    value: priorityMap[key],
  }));

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div style={{ height: 480 }}>
      <h4>Completion</h4>

      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={completionData}
            dataKey="value"
            innerRadius={45}
            outerRadius={65}
          >
            {completionData.map((entry, index) => (
              <Cell key={index} fill={completionColors[entry.name]} />
            ))}
          </Pie>

          <Tooltip />

          {/* CENTER TEXT */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: "18px", fontWeight: "bold", fill: "#333" }}
          >
            {completionPercent}%
          </text>
        </PieChart>
      </ResponsiveContainer>

      <h4 style={{ marginTop: 10 }}>Priority</h4>

      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={priorityData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1677ff" />
        </BarChart>
      </ResponsiveContainer>

      <h4 style={{ marginTop: 10 }}>Category</h4>

      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={categoryData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#52c41a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
