import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../../redux/actions";
import './Detail.css';

export default function Detail() {
  let { id } = useParams();
  const dispatch = useDispatch()
  console.log(id)

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clearDetail())
    }
  }, [dispatch, id]);

  const country = useSelector((state) => state.detail)

  return (
    <div className='wallpaper'>
      <div className='card-contenedor'>
        <h1 className='name'>{country.name}</h1>
        <img src={country.flag} alt='img' className= 'pictureDetalle'/>
        <div className='itemsCountry'>
          <h3 className='textH3'>Capital: {country.capital}</h3>
          <h3 className='textH3'>Subregión: {country.subregion}</h3>
          <h3 className='textH3'>Area: {country.area} km2</h3>
          <h3 className='textH3'>Habitantes: {country.population}</h3>
        </div>
        <h1 className='name'>Actividades</h1>
        <div>
          <div className='card-activity'>
            {
              country.activities?.length ?
                country.activities?.map(activity => (<div className='itemsActivity'>
                  <h3 className='textH3'>Actividad: {activity.name}</h3>
                  <h3 className='textH3'>Dificultad: {activity.difficulty}</h3>
                  <h3 className='textH3'>Disponibilidad: {activity.duration} meses</h3>
                  <h3 className='textH3'>Temporada:</h3>
                  <h3 className='textH3 itemsSeason'> {activity.season.map(season => <p>{season}</p>)}</h3>
                </div>)) : <div><h3 className='textH3'>No contiene actividades</h3></div>
            }
          </div>
        </div>
      </div>
      <Link to='/home'>
        <button className='regresarHome'>Regresar</button>
      </Link>
    </div>
  );
};

