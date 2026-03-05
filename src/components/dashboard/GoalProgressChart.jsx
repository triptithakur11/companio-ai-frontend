import { PieChart, Pie, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 8 },
  { name: "In Progress", value: 4 },
  { name: "Pending", value: 3 },
];

export default function GoalProgressChart() {

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        dataKey="value"
        outerRadius={90}
      />
      <Tooltip />
    </PieChart>
  );
}