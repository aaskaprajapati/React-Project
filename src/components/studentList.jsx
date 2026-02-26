import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";
import Input from "./Input";
import "./styles/studentList.css";

const StudentList = ({ students, onStatusChange, onDelete }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCourse, setFilterCourse] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    // Get unique courses for filter dropdown
    const courses = ["All", ...new Set(students.map(s => s.course))];

    // Filter and Sort logic
    const filteredStudents = students.filter(std => {
        const matchesSearch = std.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = filterCourse === "All" || std.course === filterCourse;
        const matchesStatus = filterStatus === "All" ||
            (filterStatus === "Present" && std.isPresent) ||
            (filterStatus === "Absent" && !std.isPresent);

        return matchesSearch && matchesCourse && matchesStatus;
    }).sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "grade") return b.grade - a.grade;
        return 0;
    });

    return (
        <div className="student-list-container">

            {/* Toolbar */}
            <div className="toolbar">
                <div className="toolbar-group toolbar-search">
                    <Input
                        label="Search Students"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="toolbar-group">
                    <label className="input-label">Course</label>
                    <select
                        className="toolbar-select"
                        value={filterCourse}
                        onChange={(e) => setFilterCourse(e.target.value)}
                    >
                        {courses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="toolbar-group">
                    <label className="input-label">Status</label>
                    <select
                        className="toolbar-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </div>
                <div className="toolbar-group">
                    <label className="input-label">Sort By</label>
                    <select
                        className="toolbar-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Name (A–Z)</option>
                        <option value="grade">Grade (High–Low)</option>
                    </select>
                </div>
            </div>

            {filteredStudents.length === 0 ? (
                <div className="empty-state">
                    <h3>No students found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="student-grid">
                    {filteredStudents.map((std) => {
                        const isTopPerformer = std.grade >= 90;
                        return (
                            <div key={std.id} className="student-card">
                                {/* Card top: name + grade */}
                                <div className="card-top">
                                    <div className="student-avatar">
                                        {std.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </div>
                                    <span className="student-grade">{std.grade}</span>
                                </div>

                                {/* Info */}
                                <div className="student-info">
                                    <h3 className="student-name">{std.name}</h3>
                                    <p className="student-detail">{std.course} · Age {std.age} · ID #{std.id}</p>

                                    {/* Badges — status AND top performer both shown inside the card */}
                                    <div className="badge-row">
                                        <Badge type={std.isPresent ? "success" : "danger"}>
                                            {std.isPresent ? "Present" : "Absent"}
                                        </Badge>
                                        {isTopPerformer && (
                                            <Badge type="warning">⭐ Top Performer</Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="card-actions">
                                    <Button
                                        variant="outline"
                                        onClick={() => onStatusChange(std.id)}
                                    >
                                        Toggle Status
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => onDelete(std.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentList;