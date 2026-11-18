require('dotenv').config();

const { PORT, DB_USER, DB_PASSWORD, DB_HOST, API_KEY, CLIENT_ORIGIN } = process.env;

module.exports = {
  port: PORT || 3001,
  clientOrigin: CLIENT_ORIGIN || 'http://localhost:3000',
  dogApiKey: API_KEY,
  databaseUrl: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
};
