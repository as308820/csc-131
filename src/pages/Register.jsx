import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log("Login Data:", formData);
        //add backend call here later
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} require />
                </label>
                <br />
                <label>Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} require />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;