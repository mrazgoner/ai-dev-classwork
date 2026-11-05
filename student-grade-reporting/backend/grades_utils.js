// Small helpers for working with a list of grades.

function isEmpty(grades) {
  return !Array.isArray(grades) || grades.length === 0;
}

function calculateAverage(grades) {
  if (isEmpty(grades)) {
    return null;
  }

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  return total / grades.length;
}

function findHighest(grades) {
  if (isEmpty(grades)) {
    return null;
  }
  return Math.max(...grades);
}

function findLowest(grades) {
  if (isEmpty(grades)) {
    return null;
  }
  return Math.min(...grades);
}

function letterGrade(average) {
  if (average === null) {
    return "N/A";
  }
  if (average >= 90) {
    return "A";
  }
  if (average >= 80) {
    return "B";
  }
  if (average >= 70) {
    return "C";
  }
  if (average >= 60) {
    return "D";
  }
  return "F";
}

function isPassing(average, passingScore = 60) {
  if (average === null) {
    return false;
  }
  return average >= passingScore;
}

module.exports = {
  calculateAverage,
  findHighest,
  findLowest,
  letterGrade,
  isPassing,
};
