const knex = require("../db/connection");

// SQL query to add a new observation to the database
function create(newObservation) {
  return knex("observations").insert(newObservation).returning("*");
}

// SQL query to list all observations in the database
async function list() {
  return knex("observations")
    .select("*")
}

module.exports = {
  create,
  list,
};