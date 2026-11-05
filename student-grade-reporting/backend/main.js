// Express service for storing students and printing grade reports.

const express = require("express");
const cors = require("cors");
const Student = require("./student");
const {
  buildStudentSummary,
  buildClassSummary,
  generateReport,
  generateClassReport,
} = require("./report");

const app = express();
const PORT = process.env.PORT || 3000;

// Grades live in memory. Restarting the server clears them and loads samples again.
const students = [];

function seedStudents() {
  students.push(new Student("Alex Rivera", [88, 92, 79, 95]));

  const jordan = new Student("Jordan Lee");
  jordan.addGrade(74);
  jordan.addGrade(81);
  jordan.addGrade(69);
  students.push(jordan);

  students.push(new Student("Sam Patel", [100, 97, 94]));
  students.push(new Student("Riley Chen"));
}

function findStudent(id) {
  return students.find((student) => student.id === Number(id));
}

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/students", (req, res) => {
  res.json(students.map(buildStudentSummary));
});

app.post("/api/students", (req, res) => {
  const { name, grades = [] } = req.body || {};
  const student = new Student(name, grades);
  students.push(student);
  res.status(201).json(buildStudentSummary(student));
});

app.get("/api/students/:id", (req, res) => {
  const student = findStudent(req.params.id);
  if (!student) {
    res.status(404).json({ error: "Student not found." });
    return;
  }
  res.json(buildStudentSummary(student));
});

app.post("/api/students/:id/grades", (req, res) => {
  const student = findStudent(req.params.id);
  if (!student) {
    res.status(404).json({ error: "Student not found." });
    return;
  }

  const { grade, grades } = req.body || {};
  if (Array.isArray(grades)) {
    student.addGrades(grades);
  } else if (grade !== undefined) {
    student.addGrade(grade);
  } else {
    res.status(400).json({ error: "Send a grade or a grades array." });
    return;
  }

  res.json(buildStudentSummary(student));
});

app.get("/api/students/:id/report", (req, res) => {
  const student = findStudent(req.params.id);
  if (!student) {
    res.status(404).json({ error: "Student not found." });
    return;
  }
  res.type("text/plain").send(generateReport(student));
});

app.get("/api/reports", (req, res) => {
  res.json(buildClassSummary(students));
});

app.get("/api/reports/class", (req, res) => {
  res.type("text/plain").send(generateClassReport(students));
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Turn validation errors from Student into a simple JSON response.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const badJson = err.type === "entity.parse.failed";
  const message = badJson ? "Request body must be valid JSON." : err.message;
  res.status(400).json({ error: message });
});

seedStudents();

app.listen(PORT, () => {
  console.log(`Student grade service running at http://localhost:${PORT}`);
});
