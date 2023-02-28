import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className='background'>
      <h1 className = 'welcomeText'>Países del Mundo</h1>
      <Link to='/home'>
        <button className= 'button'>Ingresar</button>
      </Link>
    </div>
  )
};