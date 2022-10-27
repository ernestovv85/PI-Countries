const express = require('express');
const { Router } = require('express');
const { getCountries, getCountriesByName, getCountryById } = require('../Controllers/countriesC.js')

const router = Router();

router.get('/', async (req, res) => {
  const name = req.query.name
  try {
    if(name){
      const countries = await getCountriesByName(name);
      res.status(200).json(countries);
    }else{
      const countries = await getCountries();
      res.status(200).json(countries);
    }
  }
  catch (error) {
    res.status(404).send('No se encontró información');
  }
});

router.get('/:id', async (req, res) =>{
  const id = req.params.id;
  try {
    const country = await getCountryById(id);
    res.status(200).json(country);
  }
  catch (error) {
    res.status(404).send('No se encontró información');
  }
})

module.exports = router;