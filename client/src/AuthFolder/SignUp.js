import React, { useState } from 'react';
import './SignUpLogin.css'; // Importing the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const SignUp = () => {
    const { registerUser, error } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailOrNumber: '',
        password: '',
        gender: '',
        dateOfBirth: { day: '', month: '', year: '' },
    });

    const handleGenderChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, gender: value });
    }



    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { day, month, year } = formData.dateOfBirth;
            const formattedDateOfBirth = new Date(`${year}-${month}-${day}`);
            const updatedFormData = { ...formData, dateOfBirth: formattedDateOfBirth };

            setLoading(true);
            await registerUser(updatedFormData);
            navigate("/");
        } catch (error) {
            console.error("An error occurred during registration:", error);
            // Optionally, you can set an error state here to display an error message to the user
        } finally {
            setLoading(false);
        }
    };


    // Generate day options from 1 to 31
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Array of months
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Generate years from 1999 to the current year
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 + 1 }, (_, i) => 1999 + i);

    return (
        <div className="abc123_signup-container">
            <h1 className="abc123_signup-title">facebook</h1>
            <form className="abc123_signup-form" onSubmit={handleSubmit}>
                <h3>Create a New Account</h3>

                <div className="abc123_name-inputs">
                    <input
                        type="text"
                        placeholder='First name'
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder='Surname'
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>

                {/* Date of birth section */}
                <div className="abc123_dob-section">
                    <label>Date of Birth</label>
                    <div className="abc123_dob-selectors">
                        <select
                            value={formData.dateOfBirth.day}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: { ...formData.dateOfBirth, day: e.target.value } })}
                        >
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <select
                            value={formData.dateOfBirth.month}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: { ...formData.dateOfBirth, month: e.target.value } })}
                        >
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <select
                            value={formData.dateOfBirth.year}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: { ...formData.dateOfBirth, year: e.target.value } })}
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Gender radio buttons */}
                <div className="abc123_gender-section">
                    <label>Gender</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleGenderChange}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleGenderChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="custom"
                            checked={formData.gender === 'custom'}
                            onChange={handleGenderChange}
                        />
                        Custom
                    </label>
                </div>

                <div className="abc123_contact-password-section">
                    <input
                        type="text"
                        placeholder="Mobile number or email"
                        value={formData.emailOrNumber}
                        onChange={(e) => setFormData({ ...formData, emailOrNumber: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="New password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                {/* Button to submit the form */}
                <button
                    className="abc123_signup-button"
                    disabled={loading}
                    type="submit"
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <span className="abc123_signup-footer">Already have an account? <Link to="/login">Login</Link></span>

            {error && <div className="error-message">{error.message}</div>}

        </div>
    );
};

export default SignUp;
