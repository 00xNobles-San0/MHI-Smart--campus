// src/service.js
const env = require("./env")
const express = require('express');
const routers = require('./routes/index');

const server = express();
const port = env.APP_PORT || 3000;


// Middleware to parse JSON
server.use(express.json());
// Routes
server.use('/api', routers);

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
