import React from 'react';
import "./Credits.css";

const teamMembers = [
    { name:"David  Gonzales", role: "Team Manager", img: "/Headshots/DavidHeadshot.jpg" },
    { name:"Isaac Benitez Cisneros", role: "Analyst", img: "/Headshots/IsaacHeadshot.jpg" },
    { name:"Long Nguyen", role: "Designer", img: "/Headshots/LongHeadshot.jpg" },
    { name:"Alex Basden", role: "Designer", img: "/Headshots/AlexHeadshot.jpg" },
    { name:"Joshua James", role: "Programmer", img: "/Headshots/JoshuaHeadshot.jpg" },
    { name:"Osvaldo Sanchez-Gonzales", role: "Programmer", img: "/Headshots/OsvaldoHeadshot.jpg" },
    { name:"Dylan Patel", role: "Programmer", img: "/Headshots/DylanHeadshot.jpg" },
    { name:"Aaron-Sean Rodriguez", role: "Quality Control", img: "/Headshots/AaronHeadshot.jpg" },
];

const Credits = () => {
    return (
        <div className="credits-container">
            {teamMembers.map((member, index) => (
                <div key={index} className="member-card">
                    <img src={member.img} alt={member.name} />
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                </div>
            ))}
        </div>
    );
};
export default Credits;
