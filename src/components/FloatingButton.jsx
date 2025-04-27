import React from 'react'
import { Link } from 'react-router-dom'
import './FloatingButton.css'

export default function FloatingButton() {
  return (
    <Link to="/login" className="floating-link">
      <button className="floating-btn">
        Log In
      </button>
    </Link>
  )
}