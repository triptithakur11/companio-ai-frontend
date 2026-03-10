import { PieChart, Pie, Tooltip } from "recharts";

export default function GoalProgressChart({ goals }) {
  if (!goals?.length) return null;
  const doneCount = goals.filter((g) => g.isDone).length;
  const pendingCount = goals.length - doneCount;

  const data = [
    { name: "Completed", value: doneCount },
    { name: "Pending", value: pendingCount },
  ];

  return (
    <PieChart width={300} height={250}>
      <Pie data={data} dataKey="value" outerRadius={90} />
      <Tooltip />
    </PieChart>
  );
}
