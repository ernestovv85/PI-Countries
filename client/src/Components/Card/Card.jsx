import React from 'react';
import './Card.css';

export default function Card({ name, flag, continents }) {
  return (
    <div className='card-container'>
        <h2 className='nameHome'>{name}</h2>
        <h3 className='continentHome'>Continente: {continents}</h3>
        <div className='image-container'>
          <img src={flag} alt='img' className='image' />
        </div>
    </div>
  );
};