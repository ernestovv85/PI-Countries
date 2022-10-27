const { Activity, Country } = require("../db");

const getActivities = async ()=>{
  const allActivities = await Activity.findaAll({include: Country});
  return allActivities;
};

const createActivity = async () => {
  const {
    name,
    difficulty,
    duration,
    season,
    countries } = req.body
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season
  })
  const country = await Country.findAll({
      where: {
        name: countries,
      }    
    })
    newActivity.addCountries(country)
    return newActivity;
}

module.exports = { createActivity, getActivities };