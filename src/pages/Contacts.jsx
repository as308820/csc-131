import React, { useState } from 'react';

const Contact = () => {
    // Store User's information
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
    };

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Contact Page</h2>
            <h3 style={{ marginBottom: '20px' }}>Contact Us!</h3>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <h4 style={{ marginBottom: '10px' }}>Name</h4>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ marginBottom: '20px' }}
                />
                {/* Email */}
                <h4 style={{ marginBottom: '10px' }}>Email</h4>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginBottom: '20px' }}
                />
                {/* Phone */}
                <h4 style={{ marginBottom: '10px' }}>Phone Number</h4>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ marginBottom: '20px' }}
                />
                {/* Subject */}
                <h4 style={{ marginBottom: '10px' }}>Subject</h4>
                <input
                    type="text"
                    name="subject"
                    placeholder="Enter the subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ marginBottom: '20px' }}
                />
                {/* Message */}
                <h4 style={{ marginBottom: '10px' }}>Message</h4>
                <textarea
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ marginBottom: '20px' }}
                ></textarea>
                {/* Submit Button */}
                <button type="submit" style={{ marginTop: '20px' }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;