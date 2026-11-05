// Holds one student's id, name, and list of grades.

class Student {
  static nextId = 1;

  constructor(name, grades = []) {
    // Check the input before assigning an id, so a bad request does not skip a number.
    const cleanName = Student.cleanName(name);
    const cleanGrades = Student.cleanGrades(grades);

    this.id = Student.nextId;
    Student.nextId += 1;
    this.name = cleanName;
    this.grades = cleanGrades;
  }

  static cleanName(name) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Student name must be a non-empty string.");
    }
    return name.trim();
  }

  static cleanGrade(grade) {
    const number = Number(grade);

    if (Number.isNaN(number) || number < 0 || number > 100) {
      throw new Error(`Grade must be a number from 0 to 100. Received: ${grade}`);
    }

    return number;
  }

  static cleanGrades(grades) {
    if (!Array.isArray(grades)) {
      throw new Error("addGrades expects an array of numbers.");
    }
    return grades.map((grade) => Student.cleanGrade(grade));
  }

  // Store one grade from 0 to 100.
  addGrade(grade) {
    this.grades.push(Student.cleanGrade(grade));
  }

  // Store several grades at once.
  addGrades(grades) {
    this.grades.push(...Student.cleanGrades(grades));
  }

  hasGrades() {
    return this.grades.length > 0;
  }
}

module.exports = Student;
