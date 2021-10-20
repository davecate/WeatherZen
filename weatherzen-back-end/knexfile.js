const path = require("path");
require("dotenv").config();
const { DATABASE_URL } = process.env;

// fetches database url from the local environment and configures the database connection for postgreSQL and Knex.js

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
