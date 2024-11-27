/**
 * points CRUD routes
 *
 * endpoint host/api/points
 */
const { Router } = require("express");
const { addPoints, spendPoints, getPointsBalance } = require("../../controllers/points.controller");
const router = Router();

router.post(
  "/add",
  addPoints
);

router.post(
  "/spend",
  spendPoints
);

router.get(
  "/balance",
  getPointsBalance
);

module.exports = router;
