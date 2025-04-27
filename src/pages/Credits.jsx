import React from 'react'
import FloatingButton from '../components/FloatingButton'

const Credits = () => {
    return (
        <div>
            {/* Credits Page intro */}
            <h2 style={{ marginBottom: '20px' }}>Credits Page</h2>
            <h3 style={{ marginBottom: '20px' }}> Meet the team!</h3>

            <h4 style={{ marginBottom: '10px' }}>Team Manager</h4>
            <p style={{ marginBottom: '10px' }}>David Gonzales</p>
            {/* Headshot picture */}
            <img
                src="/Headshots/DavidHeadshot.jpg"
                alt="DavidHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

            {/* Analyst About */}
            <h4 style={{ marginBottom: '10px' }}>Analyst</h4>
            <p style={{ marginBottom: '10px' }}>Isaac Benitez Cisneros</p>
            <img
                src="/Headshots/IsaacHeadshot.jpg"
                alt="IsaacHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

            {/* Designer About */}
            <h4 style={{ marginBottom: '10px' }}>Designer</h4>
            <p style={{ marginBottom: '10px' }}>Long Nguyen</p>
            <img
                src="/Headshots/LongHeadshot.jpg"
                alt="LongHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

            <p style={{ marginBottom: '10px' }}>Alex Basden</p>
            <img
                src="/Headshots/AlexHeadshot.jpg"
                alt="AlexHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

            {/* Programmer About */}
            <h4 style={{ marginBottom: '10px' }}>Programmer</h4>
            <p style={{ marginBottom: '10px' }}>Joshua James</p>
            <img
                src="/Headshots/JoshuaHeadshot.jpg"
                alt="JoshuaHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

            <p style={{ marginBottom: '10px' }}>Osvaldo Sanchez-Gonzales</p>
            <img
                src="/Headshots/OsvaldoHeadshot.jpg"
                alt="OsvaldoHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

            <p style={{ marginBottom: '10px' }}>Dylan Patel</p>
            <img
                src="/Headshots/DylanHeadshot.jpg"
                alt="DylanHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

            {/* Quality Control About */}
            <h4 style={{ marginBottom: '10px' }}>Quality Control</h4>
            <p style={{ marginBottom: '10px' }}>Aaron-Sean Rodriguez</p>
            <img
                src="/Headshots/AaronHeadshot.jpg"
                alt="AaronHeadshot"
                style={{ width: '100px', height: '100px', marginBottom: '40px' }}
            />

           
            <FloatingButton />
        </div>
    )
}

export default Credits
