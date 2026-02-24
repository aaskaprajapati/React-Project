import { useState } from "react"
import StudentList from "./components/studentList.jsx"
import NewStudent from "./components/newstudent.jsx"
import studentData from "./data/studentData.js"
import './App.css'

function App() {
  const [students, setStudents] = useState(studentData);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(std => std.id !== id));
  };

  const toggleStatus = (id) => {
    setStudents(students.map(std => 
      std.id === id 
        ? { ...std, status: std.status === "present" ? "absent" : "present" } 
        : std
    ));
  };

  return (
    <div>
      <StudentList students={students} onStatusChange={toggleStatus} onDelete={deleteStudent} />
      <hr />
      <NewStudent onAddStudent={handleAddStudent} />
    </div>
  )
}

export default App
