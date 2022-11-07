import React from 'react';
import './Pagination.css';

export default function Pagination({ countriesPerPage, allCountries, paginado }) {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumber.push(i);
  };
  return (
    <div>
      <ul className= 'paginationUl'>
        {pageNumber?.map(number => {
          return (
            <button className='paginationButton' key={number} onClick={() => paginado(number)}>{number}</button>
          )
        })}
      </ul>
    </div>
  )
};