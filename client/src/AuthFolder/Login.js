import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './SignUpLogin.css';
import { useAuth } from '../context/authContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({ emailOrNumber: "", password: "" });
    const { loginUser } = useAuth();
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Login data:", loginData);

            const response = await loginUser(loginData);

            if (response) {
                navigate('/');
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };


    return (
        <div className="abc123_signup-container">
            <h1 className="abc123_signup-title">facebook</h1>
            <p className="login-subtitle">Facebook helps you connect and share with the people in your life.</p>

            <form className="abc123_signup-form" onSubmit={handleSubmit}>
                <label className='abc123_name-inputs'>
                    <input
                        type="text"
                        placeholder='Email address or phone number'
                        className="login-input"
                        style={{
                            width: "100%",
                        }}
                        value={loginData.emailOrNumber}
                        onChange={(e) => setLoginData({ ...loginData, emailOrNumber: e.target.value })}
                    />
                </label>
                <label className='abc123_name-inputs'>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        className="login-input"
                        style={{
                            width: "90%",
                        }}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <span onClick={togglePasswordVisibility} className="eye-icon">
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </label>

                <button className="abc123_signup-button">Log in</button>
                <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
            </form>
            <span className="abc123_signup-footer">Don't have an account? <Link to="/register">Register</Link></span>
        </div>
    );
};

export default Login;
