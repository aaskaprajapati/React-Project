import { useState, useEffect } from "react"
import StudentList from "./components/studentList.jsx"
import NewStudent from "./components/newstudent.jsx"
import initialData from "./data/studentData.js"
import Button from "./components/Button"
import './App.css'

function App() {
  // Version stamp — bump this whenever studentData.js changes
  // so localStorage is automatically cleared and fresh data loads.
  const DATA_VERSION = "v3";

  // Load from localStorage or use initialData
  const [students, setStudents] = useState(() => {
    if (localStorage.getItem("dataVersion") !== DATA_VERSION) {
      localStorage.removeItem("students");
      localStorage.setItem("dataVersion", DATA_VERSION);
      return initialData;
    }
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [showAddForm, setShowAddForm] = useState(false);

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (newStudent) => {
    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents([...students, { ...newStudent, id }]);
    setShowAddForm(false);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents(students.filter(std => std.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setStudents(students.map(std =>
      std.id === id ? { ...std, isPresent: !std.isPresent } : std
    ));
  };


  return (
    <div className="app-wrapper">

      {/* ── Header ── */}
      <div className="app-header">
        <div className="app-header-left">
          <h1>Student Management</h1>
          <p>Track and manage student records</p>
        </div>
        <Button
          variant={showAddForm ? "outline" : "primary"}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "✕ Cancel" : "+ Add Student"}
        </Button>
      </div>


      {/* ── Add Form ── */}
      {showAddForm && (
        <div className="add-form-wrapper">
          <NewStudent onAddStudent={handleAddStudent} />
        </div>
      )}

      <div className="divider" />

      {/* ── Student List ── */}
      <StudentList
        students={students}
        onStatusChange={toggleStatus}
        onDelete={deleteStudent}
      />
    </div>
  );
}

export default App;
