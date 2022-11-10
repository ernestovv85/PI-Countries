import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createActivities, getCountries } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import "./Create.css";

export default function Create() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: [],
    countries: [],
  });

  function validate(input) {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!input.name.trim()) {
      errors.name = "Se necesita nombre de actividad";
    } else if (!regexName.test(input.name.trim())) {
      errors.name = "El campo actividad, solo acepta letras y espacios";
    }
    if (!input.difficulty) {
      errors.difficulty = "Se requiere grado de dificultad";
    }
    if (!input.duration) {
      errors.duration = "Se requiere disponibilidad";
    } else if (input.duration < 0) {
      errors.duration = "No se permiten números negativos";
    } else if (input.duration > 12) {
      errors.duration = "La disponibilidad no puede exceder de 12 meses";
    }
    if (!input.season.length) {
      errors.season = "Se requiere al menos una temporada";
    }
    if (!input.countries.length) {
      errors.countries = "Se requiere al menos un país";
    }
    return errors;
  }

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  function handleCheck(event) {
    if (event.target.checked) {
      setInput({
        ...input,
        season: [...input.season, event.target.value],
      });
    }
  }

  function handleSelectDif(event) {
    setInput({
      ...input,
      difficulty: event.target.value,
    });
  }

  function handleSelect(event) {
    if (input.countries.includes(event.target.value)) return;
    setInput({
      ...input,
      countries: [...input.countries, event.target.value],
    });
  }

  function handleErrors(event) {
    handleChange(event);
    setErrors(validate(input));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors(validate(input));
    if (Object.keys(errors).length === 0) {
      dispatch(createActivities(input));
      alert("Actividad registrada");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: [],
        countries: [],
      });
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function handleDelete(event) {
    setInput({
      ...input,
      countries: input.countries.filter((country) => country !== event),
    });
  }

  return (
    <div className="fondo">
      <h1 className="tituloCrear">Registrar Actividad</h1>
      <Link to="/home">
        <button className="homeButton">Volver a Home</button>
      </Link>
      <button className="homeButton" onClick={refreshPage}>
        Refresh
      </button>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="items">
          <div className="labels">
            <label>Nombre de actividad:</label>
            <input
              className="input"
              type="text"
              value={input.name}
              required
              name="name"
              placeholder="Actividad"
              onBlur={(event) => handleErrors(event)}
              onChange={(event) => handleChange(event)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label className="labels">Grado de dificultad</label>
            <select
              className="list"
              name="difficulty"
              required
              placeholder="Dificultad"
              onBlur={(event) => handleErrors(event)}
              onChange={(event) => handleSelectDif(event)}
            >
              <option hidden>Dificultad</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            {errors.difficulty && <p className="error">{errors.difficulty}</p>}
          </div>
          <div>
            <label className="labels">Disponibilidad en meses:</label>
            <input
              className="input"
              type="number"
              required
              value={input.duration}
              name="duration"
              placeholder="Disp"
              onBlur={(event) => handleErrors(event)}
              onChange={(event) => handleChange(event)}
            />
            {errors.duration && <p className="error">{errors.duration}</p>}
          </div>
          <div>
            <label className="labels">Temporada del Año:</label>
            <div className="itemsCheckbox">
              <label className="labels">
                <input
                  type="checkbox"
                  name={input.season}
                  value="Primavera"
                  onBlur={(event) => handleErrors(event)}
                  onChange={(event) => handleCheck(event)}
                />
                Primavera
              </label>
              <label className="labels">
                <input
                  type="checkbox"
                  name={input.season}
                  value="Verano"
                  onBlur={(event) => handleErrors(event)}
                  onChange={(event) => handleCheck(event)}
                />
                Verano
              </label>
              <label className="labels">
                <input
                  type="checkbox"
                  name={input.season}
                  value="Otoño"
                  onBlur={(event) => handleErrors(event)}
                  onChange={(event) => handleCheck(event)}
                />
                Otoño
              </label>
              <label className="labels">
                <input
                  type="checkbox"
                  name={input.season}
                  value="Invierno"
                  onBlur={(event) => handleErrors(event)}
                  onChange={(event) => handleCheck(event)}
                />
                Invierno
              </label>
            </div>
            {errors.season && <p className="error">{errors.season}</p>}
          </div>
          <div>
            <label className="labels">Países</label>
            <select
              className="list"
              onBlur={(event) => handleErrors(event)}
              onChange={(event) => handleSelect(event)}
            >
              <option hidden>Elija los países</option>
              {countries?.map((country) => (
                <option value={country.name}>{country.name}</option>
              ))}
            </select>
            {errors.countries && <p className="error">{errors.countries}</p>}
          </div>
        </div>
        <div>
          <input
            className="enviar"
            disabled={
              !input.name ||
              !input.difficulty ||
              !input.duration ||
              !input.season.length === 0 ||
              !input.countries.length === 0
                ? true
                : false
            }
            type="submit"
            value="Enviar"
          />
        </div>
      </form>
      <div className="countriesItems">
        {input.countries.map((country) => {
          return (
            <div>
              <p key={country} className="itemscountries">
                {country}
                <button
                  className="buttonRemove"
                  onClick={() => handleDelete(country)}
                >
                  X
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
