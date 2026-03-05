import { Button } from "antd";
import { exportGoalsPDF } from "../../utils/helpers";

export default function ExportPDFButton() {

  return (
    <Button type="primary" onClick={exportGoalsPDF}>
      Export Goals Report
    </Button>
  );
}