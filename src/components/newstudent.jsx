import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import "./styles/newstudent.css";

const NewStudent = ({ onAddStudent }) => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        course: "",
        grade: "",
        isPresent: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.age) newErrors.age = "Age is required";
        if (!formData.course.trim()) newErrors.course = "Course is required";
        if (!formData.grade) newErrors.grade = "Grade is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        onAddStudent({
            ...formData,
            age: parseInt(formData.age),
            grade: parseFloat(formData.grade),
            isPresent: formData.isPresent
        });

        // Reset form
        setFormData({ name: "", age: "", course: "", grade: "", isPresent: false });
        setErrors({});
    };

    return (
        <div className="new-student-card">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <Input
                        label="Full Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        error={errors.name}
                        required
                    />
                    <Input
                        label="Course"
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        placeholder="e.g. React.js"
                        error={errors.course}
                        required
                    />
                    <Input
                        label="Age"
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="e.g. 20"
                        error={errors.age}
                        required
                    />
                    <Input
                        label="Grade"
                        type="number"
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        placeholder="e.g. 85"
                        error={errors.grade}
                        required
                    />
                </div>

                <div className="checkbox-group">
                    <div className="custom-checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="isPresent"
                            name="isPresent"
                            checked={formData.isPresent}
                            onChange={handleChange}
                            className="custom-checkbox-input"
                        />
                        <label htmlFor="isPresent" className="custom-checkbox-label">
                            <span className="checkbox-box">
                                {formData.isPresent && (
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </span>
                            Mark as Present
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <Button type="submit" variant="primary">
                        Add Student
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewStudent;
