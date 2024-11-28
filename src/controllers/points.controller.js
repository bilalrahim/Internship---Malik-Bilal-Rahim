const { addPoints: addPointsService, spendPoints: spendPointsService, getPointsBalance: getPointsBalanceService} = require('../services/points.service');

/**
 * Handles the request to add points for a given payer at a specified timestamp.
 * 
 * @param {Object} req - The request object containing the body with payer, points, and timestamp.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {void} - Sends a status response, no return value.
 */
const addPoints = (req, res) => {
  const { payer, points, timestamp } = req.body;
  if (!payer || !points || !timestamp) {
    return res.status(400).json({ success: false, message: '[request-body-incomplete]'});
  }

  addPointsService(payer, points, timestamp);
  
  return res.status(200).send();
};

/**
 * Handles the request to spend points. If the user has enough points, it deducts them from the oldest transactions.
 * 
 * @param {Object} req - The request object containing the body with the points to be spent.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {void} - Sends a response with the result of the spend operation.
 */
const spendPoints = (req, res) => {
  const { points } = req.body;
  if (!points) {
    return res.status(400).json({ success: false, message: '[request-body-incomplete]'});
  }

  const deductions = spendPointsService(points);
  if (deductions?.success) {
    return res.status(200).json([deductions?.data]);
  }

  res.status(400).send(deductions?.message);
};

/**
 * Retrieves the current balance of points for each payer.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns {void} - Sends the current points balance for each payer.
 */
const getPointsBalance = (req, res) => {
  const pointsBalance = getPointsBalanceService();
  
  res.status(200).json(pointsBalance);
};

module.exports = {
  addPoints,
  spendPoints,
  getPointsBalance
};