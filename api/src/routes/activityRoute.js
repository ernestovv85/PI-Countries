const express = require('express');
const { Router, request } = require('express');
const { createActivity, getActivities } = require('../Controllers/actvityC.js');

const router = Router();

router.get('/', async (req, res) => {
  try{
    const activities = await getActivities();
    res.status(200).json(activities)
  }
  catch(error){
    res.status(404).send({error})
  }
})

router.post('/', async (req, res) => {
  try {
   const newActivity = await createActivity(req.body)
    res.status(201).json(newActivity);
  }
  catch (error) {
    res.status(507).send('No se pudo almacenar la información');
  };
});

module.exports = router;