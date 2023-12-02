const env = require("dotenv").config();
const {
  DB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  DB_USERNAME,
  DB_PASSWORD,
  APP_PORT,
  ORIGIN,
  HASH_SECRET,
  PEPPER_SECRET
} = process.env

const e = {
  DB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  DB_USERNAME,
  DB_PASSWORD,
  APP_PORT,
  ORIGIN,
  HASH_SECRET,
  PEPPER_SECRET
}

module.exports = e