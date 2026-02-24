import { useState } from "react";

const NewStudent = ({ onAddStudent }) => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        grade: "",
        status: false // true for present, false for absent
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.age) return;

        onAddStudent({
            ...formData,
            age: parseInt(formData.age),
            status: formData.status ? "present" : "absent"
        });

        // Reset form
        setFormData({
            name: "",
            age: "",
            grade: "",
            status: false
        });
    };

    return (
        <div>
            <h1>New Student Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="grade">Grade:</label>
                <input
                    type="text"
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="status">Is Present?</label>
                <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={formData.status}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Add Student</button>
            </form>
        </div>
    )
}

export default NewStudent;