const service = require("./observations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// numeric codes for different weather conditions: 100 = sunny, 101 = partially cloudy, etc.
const validSkyConditions = [100, 101, 102, 103, 104, 106, 108, 109]

// validation middleware
// validates the data property of the request
function hasData(req, res, next) {
  if (req.body.data) {
    return next()
  }
  next({status: 400, message: "body must have data property"})
}

// validates the latitude property of the request
function hasLatitude(req, res, next) {
  const latitude = Number(req.body.data.latitude)
  if (latitude >= -90 && latitude <= 90 ) {
    return next()
  }
  next({status: 400, message: "latitude must be between -90 and 90"})
}

// validates the longitude property of the request
function hasLongitude(req, res, next) {
  const longitude = Number(req.body.data.longitude)
  if (longitude >= -180 && longitude <= 180 ) {
    return next()
  }
  next({status: 400, message: "longitude must be between -180 and 180"})
}

// validates the skyCondition property of the request
function hasSkyCondition(req, res, next) {
  const skyCondition = Number(req.body.data.sky_condition)

  if (validSkyConditions.includes(skyCondition)) {
    return next()
  }
  next({status: 400, message: `sky_condition must be one of: ${validSkyConditions}`})
}

// API endpoints to initiate SQL database queries using observations.service.js
// HTTP post endpoint: creates a new observation
async function create(req, res) {
  const newObservation = await service.create(req.body.data)
  res.status(201).json({
    data: newObservation,
  });
}

// HTTP get endpoint: lists stored observation data
async function list(req, res) {
  const data = await service.list()
  res.json({ data })
}

module.exports = {
  create: [hasData, hasLatitude, hasLongitude, hasSkyCondition, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};