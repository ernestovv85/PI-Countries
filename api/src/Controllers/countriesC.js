const axios = require("axios");
const { Op } = require('sequelize');
const { Country, Activity } = require("../db");

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all")
  const apiInfo = await apiUrl.data.map(country => {
    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[0],
      continents: country.continents[0],
      capital: country.capital != null ? country.capital[0] : 'No tiene capital',
      subregion: country.subregion != null ? country.subregion : 'No tiene subregión',
      area: country.area,
      population: country.population
    };
  });
  await Country.bulkCreate(apiInfo, {include: Activity});
  return apiInfo;
};

const getCountries = async () => {
  const countries = await Country.findAll({
    attributes: ['id', 'name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population'],
    include: [Activity],
  });
  return countries;
};

const getCountriesByName = async (name) => {
  const countries = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: ['id', 'name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population'],
    include: [Activity],
  });
  return countries;
};

const getCountryById = async (id) => {
  const country = await Country.findByPk(id.toUpperCase(), {
    attributes: ['id','name', 'flag', 'continents', 'capital', 'subregion', 'area', 'population',
    ],
    include: [Activity],
  });
  return country;
};

module.exports = {
  getApiInfo,
  getCountries,
  getCountriesByName,
  getCountryById
}