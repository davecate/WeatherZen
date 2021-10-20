const router = require("express").Router({ mergeParams: true });
const controller = require("./observations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// express router: allows http post and get methods for the given route
router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;