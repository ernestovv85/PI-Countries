const { Activity, Country } = require("../db");

const getActivities = async () => {
  const allActivities = await Activity.findAll({include: Country});
    return allActivities;
};

const createActivity = async (body) => {
  const {
    name,
    difficulty,
    duration,
    season,
    countries } = body
  const newActivity = await Activity.create({
    name,
    difficulty: Number(difficulty),
    duration,
    season
  })
   const country = await Country.findAll({
    where: {
      name: countries,
    }
  })
  newActivity.addCountry(country)
  return newActivity;
}

module.exports = { createActivity, getActivities };