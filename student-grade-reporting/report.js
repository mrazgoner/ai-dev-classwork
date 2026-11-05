// Builds JSON summaries and readable text reports.

const {
  calculateAverage,
  findHighest,
  findLowest,
  letterGrade,
  isPassing,
} = require("./grades_utils");

const DIVIDER = "================================";

function roundScore(value) {
  if (value === null) {
    return null;
  }
  return Math.round(value * 100) / 100;
}

function formatScore(value) {
  return value === null ? "N/A" : Number(value).toFixed(2);
}

function buildStudentSummary(student) {
  const grades = student.grades;
  const average = calculateAverage(grades);

  return {
    id: student.id,
    name: student.name,
    grades: grades.slice(),
    highest: roundScore(findHighest(grades)),
    lowest: roundScore(findLowest(grades)),
    average: roundScore(average),
    letterGrade: letterGrade(average),
    status: isPassing(average) ? "Passing" : "Needs improvement",
  };
}

function buildClassSummary(students) {
  const summaries = students.map(buildStudentSummary);
  const averages = students
    .map((student) => calculateAverage(student.grades))
    .filter((average) => average !== null);

  return {
    studentCount: students.length,
    passingCount: summaries.filter((summary) => summary.status === "Passing").length,
    classAverage: roundScore(calculateAverage(averages)),
    students: summaries,
  };
}

function generateReport(student) {
  const summary = buildStudentSummary(student);
  const gradesText = summary.grades.length > 0
    ? summary.grades.join(", ")
    : "No grades recorded";

  return [
    DIVIDER,
    "       STUDENT GRADE REPORT",
    DIVIDER,
    `Name:           ${summary.name}`,
    `Grades:         ${gradesText}`,
    `Highest:        ${formatScore(summary.highest)}`,
    `Lowest:         ${formatScore(summary.lowest)}`,
    `Average:        ${formatScore(summary.average)}`,
    `Letter grade:   ${summary.letterGrade}`,
    `Status:         ${summary.status}`,
    DIVIDER,
  ].join("\n");
}

function generateClassReport(students) {
  const summary = buildClassSummary(students);

  return [
    DIVIDER,
    "          CLASS SUMMARY",
    DIVIDER,
    `Students:       ${summary.studentCount}`,
    `Passing:        ${summary.passingCount}`,
    `Class average:  ${formatScore(summary.classAverage)}`,
    DIVIDER,
  ].join("\n");
}

module.exports = {
  buildStudentSummary,
  buildClassSummary,
  generateReport,
  generateClassReport,
};
