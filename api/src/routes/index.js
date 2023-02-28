const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const contries = require('./countriesRoute.js');
const activities = require('./activityRoute.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', contries);
router.use('/activities', activities);


module.exports = router;
