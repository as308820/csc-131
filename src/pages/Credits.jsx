<<<<<<< HEAD
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
=======
import React, { useRef, useEffect, useState } from 'react';
import './Credits.css';

const members = [
  { role: 'Team Manager', name: 'David Gonzales', img: '/Headshots/DavidHeadshot.jpg' },
  { role: 'Analyst', name: 'Isaac Benitez Cisneros', img: '/Headshots/IsaacHeadshot.jpg' },
  { role: 'Designer', name: 'Long Nguyen', img: '/Headshots/LongHeadshot.jpg' },
  { role: 'Designer', name: 'Alex Basden', img: '/Headshots/AlexHeadshot.jpg' },
  { role: 'Programmer', name: 'Joshua James', img: '/Headshots/JoshuaHeadshot.jpg' },
  { role: 'Programmer', name: 'Osvaldo Sanchez-Gonzales', img: '/Headshots/OsvaldoHeadshot.jpg' },
  { role: 'Programmer', name: 'Dylan Patel', img: '/Headshots/DylanHeadshot.jpg' },
  { role: 'Quality Control', name: 'Aaron-Sean Rodriguez', img: '/Headshots/AaronHeadshot.jpg' },
];

const Credits = () => {
  const containerRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, currentTarget } = e;
      const { width, left } = currentTarget.getBoundingClientRect();
      const midPoint = left + width / 2;
      const distanceFromCenter = (clientX - midPoint) / (width / 2);
      setScrollSpeed(distanceFromCenter);
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      if (scrollSpeed !== 0) {
        container.scrollLeft += scrollSpeed * 5;
      }
    }, 16);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [scrollSpeed]);

  return (
    <div className="credits-carousel" ref={containerRef}>
      {members.map((member, idx) => (
        <div key={idx} className="member-card">
          <img src={member.img} alt={`${member.name} Headshot`} />
          <h4>{member.role}</h4>
          <p>{member.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Credits;
>>>>>>> 8d27519 (Final project)
