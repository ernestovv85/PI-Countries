import axios from 'axios';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const FILTER_BY_CONTINENT = 'COUNTRIES_BY_CONTINENT';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_ACTIVITIES = 'FILTER_ACTIVITIES';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_POPULATION = 'FILTER_BY_POPULATION';
export const COUNTRIES_BY_NAME = 'COUNTRIES_BY_NAME';
export const CREATE_ACTIVITIES = 'CREATE_ACTIVITIES';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';

export function getCountries() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/countries');
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
};

export function getActivities() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/activities');
    return dispatch({
      type: GET_ACTIVITIES,
      payload: json.data,
    });
  };
};

export function countriesByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload
  };
};

export function countriesByName(name) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/countries?name=${name}`);
    return dispatch({
      type: COUNTRIES_BY_NAME,
      payload: json.data,
    });
  };
};

export function createActivities(payload) {
  return async function (dispatch) {
    let json = await axios.post('http://localhost:3001/activities', payload);
    return dispatch({
      type: CREATE_ACTIVITIES,
      payload: json.data
    });
  };
};

export function getDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: json.data
    });
  };
};

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
    payload: [],
  }
};

export function filterActivities(payload) {
  return {
    type: FILTER_ACTIVITIES,
    payload
  };
};

export function filterByName(payload) {
  return {
    type: FILTER_BY_NAME,
    payload
  };
};

export function filterByPopulation(payload) {
  return {
    type: FILTER_BY_POPULATION,
    payload
  };
};
