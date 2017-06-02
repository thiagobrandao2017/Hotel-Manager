const pgp = require('pg-promise')({});

const config = {
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
};


if (process.env.NODE_ENV === "production") {
  module.exports = pgp(process.env.DATABASE_URL);
} else {
  module.exports = pgp(config);
}
