
const express = require('express');
const parkingRoutes = require('./parkingSpacesRoutes');
const reservationsRoutes = require('./reservationsRoutes');
const usersRoutes = require('./usersRoutes');

const routers = express.Router();


routers.use("/parking-spaces",parkingRoutes)
routers.use("/reservation",reservationsRoutes)
routers.use("/users",usersRoutes)

module.exports = routers