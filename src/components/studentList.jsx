import studentData from "../data/studentData.js"
const StudentList = ({ students, onStatusChange, onDelete }) => {
    return (
        <div>
            <h1>List of the Students</h1>
            <div className="std-card-container" style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gap: "10px",
            }}>
                {
                    students.map(
                        (std, i) => {
                            return (
                                <div key={i} className="Std-card" style={{
                                    border: "3px solid gray",
                                    borderRadius: "20px",
                                    padding: "15px",
                                    margin: "5px",
                                }}>
                                    <p>Name: {std.name}</p>
                                    <p>Roll no: {std.id}</p>
                                    <p>Age: {std.age}</p>
                                    <p>Grade: {std.grade}</p>
                                    <p>Status: {std.status}</p>
                                    <button onClick={() => onStatusChange(std.id)} style={{borderRadius: "5px", margin: "3px 0", padding: "5px 10px", cursor: "pointer" }}>Change Status</button>
                                    <button onClick={() => onDelete(std.id)} style={{borderRadius: "5px", margin: "3px 0", padding: "5px 10px", cursor: "pointer" }}>Remove Student</button>
                                </div>
                            )
                        }
                    )
                }
            </div>

        </div>
    )
}

export default StudentList;