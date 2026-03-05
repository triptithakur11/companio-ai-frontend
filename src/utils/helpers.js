import jsPDF from "jspdf";

export const exportGoalsPDF = () => {

  const doc = new jsPDF();

  doc.text("Goal Progress Report", 20, 20);

  doc.save("goal-report.pdf");

};