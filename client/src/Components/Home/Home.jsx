import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountries,
  getActivities,
  countriesByContinent,
  filterActivities,
  filterByName,
  filterByPopulation
} from '../../redux/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries);
  const activities = useSelector((state) => state.activities);
  const [, setOrden] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const [countriesPerPage,] = useState(10);
  const lastCountry = (currentPage * countriesPerPage);
  const firstCountry = lastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(firstCountry, lastCountry);

  const paginado = pageNumber => {
    setcurrentPage(pageNumber)
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleClick(event) {
    event.preventDefault();
    window.location.reload(false);
  };

  function handleFilterContinent(event) {
    dispatch(countriesByContinent(event.target.value))
    setcurrentPage(1);
  };

  function handleFilterActivitie(e) {
    dispatch(filterActivities(e.target.value))
  };

  function handleFilterName(event) {
    event.preventDefault();
    dispatch(filterByName(event.target.value));
    setcurrentPage(1);
    setOrden(`${event.target.value}`);
  };

  function handleFilterPop(event) {
    event.preventDefault();
    dispatch(filterByPopulation(event.target.value));
    setcurrentPage(1);
    setOrden(`${event.target.value}`);
  };

  return (
    <div className='home'>
      <h1 className='texto'>Worldpedia</h1>
      <div>
        <SearchBar />
        <Link to='/create'><button className='crear'>Crear Actividad</button></Link>
      </div>
      <button className='refresh' onClick={event => { handleClick(event) }}>
        Refresh
      </button>
      <div>
        <select className='lista' onChange={event => handleFilterName(event)}>
          <option hidden>País por nombre</option>
          <option value='asc'>A-Z</option>
          <option value='des'>Z-A</option>
        </select>
        <select className='lista' onChange={event => handleFilterPop(event)}>
          <option hidden>País por población</option>
          <option value='min_pop'>Menor Población</option>
          <option value='max_pop'>Mayor Población</option>
        </select>
        <select className='lista' onChange={event => handleFilterContinent(event)}>
          <option value='default'>Continentes</option>
          <option value='Africa'>África</option>
          <option value='Antarctica'>Antárdida</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europa</option>
          <option value='North America'>Norteamérica</option>
          <option value='Oceania'>Oceanía</option>
          <option value='South America'>Sudamérica</option>
        </select>
        <select className='lista' onChange={event => handleFilterActivitie(event)}>
          <option value='default'>Actividades</option>
          {activities.map((activity) => (
            <option value={activity.name}>{activity.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Pagination
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado} />
      </div>
      <div className='positions'>
        {
          currentCountries?.map(country => {
            return (
              <div key={country.id}>
                <Link to={`/home/${country.id}`}>
                  <Card 
                  name={country.name} 
                  continents={country.continents} 
                  flag={country.flag} 
                  id={country.id} />
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};