import { GET_COUNTRIES, FILTER_BY_CONTINENT, GET_ACTIVITIES, FILTER_ACTIVITIES, FILTER_BY_NAME, FILTER_BY_POPULATION, COUNTRIES_BY_NAME, CREATE_ACTIVITIES, GET_DETAIL, CLEAR_DETAIL } from "./actions";
const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  detail: [],
  paginado: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload
      };
    case COUNTRIES_BY_NAME:
      return {
        ...state,
        countries: action.payload
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: []
      }
    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries
      const filter = action.payload === 'default' ? allCountries : allCountries.filter(country => country.continents === action.payload)
      return {
        ...state,
        countries: filter
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      };
    case FILTER_ACTIVITIES:
      let activity = action.payload === 'default' ? state.allCountries : state.allCountries.filter((country) => {
        const activities = country.activities.map((activity) => activity.name)
        return activities.includes(action.payload)
      })
      return {
        ...state,
        countries: activity
      };
    case FILTER_BY_NAME:
      let sortName = action.payload === 'asc' ?
        state.countries.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function (a, b) {
          if (a.name > b.name) {
            return - 1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        countries: sortName
      };
    case FILTER_BY_POPULATION:
      let sortPopulation = action.payload === 'min_pop' ?
        state.countries.sort(function (a, b) {
          if (a.population > b.population) {
            return 1;
          }
          if (b.population > a.population) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function (a, b) {
          if (a.population > b.population) {
            return - 1;
          }
          if (b.population > a.population) {
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        countries: sortPopulation
      };
    case CREATE_ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities, action.payload]
      };

    default: return state;
  };
};

export default rootReducer;