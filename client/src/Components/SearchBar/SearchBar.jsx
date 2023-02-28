import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { countriesByName, } from '../../redux/actions';
import './SearchBar.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  };
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(countriesByName(name));
    setName('');
  };

  return (
    <div>
      <input
        className='campoBuscar'
        type="text"
        placeholder='Buscar'
        onChange={event => handleInputChange(event)}
      />
      <button className='botonBuscar' type='submit' onClick={event => handleSubmit(event)}>Buscar</button>
    </div>
  )
}

