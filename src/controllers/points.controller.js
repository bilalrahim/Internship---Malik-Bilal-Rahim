
const { addPoints: addPointsService, spendPoints: spendPointsService, getPointsBalance: getPointsBalanceService} = require('../services/points.service');

const addPoints = (req, res) => {
  const { payer, points, timestamp } = req.body;

  if (!payer || !points || !timestamp) {
    return res.status(400).json({ success: false, message: '[request-body-incomplete]'})
  }

  addPointsService(payer, points, timestamp);  

  return res.status(200).send();
};

const spendPoints = (req, res) => {
  const { points } = req.body;
  if (!points) {
    return res.status(400).json({ success: false, message: '[request-body-incomplete]'})
  }

  const deductions = spendPointsService(points);
  if (deductions?.success) {
    return res.status(200).json([deductions?.data]);
  }

  res.status(400).send(deductions?.message)
  
};

const getPointsBalance = (req, res) => {

  const pointsBalance = getPointsBalanceService();
  res.status(200).json(pointsBalance);
};

module.exports = {
  addPoints,
  spendPoints,
  getPointsBalance
};
