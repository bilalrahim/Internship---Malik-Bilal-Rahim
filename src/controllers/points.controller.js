
const addPoints = (req, res) => {
  const { userId, points } = req.body;

  if (!userId || !points) {
    return res.status(400).json({ error: "userId and points are required" });
  }

  res.status(201).json({ message: `Added ${points} points for user ${userId}` });
};


const spendPoints = (req, res) => {
  const { userId, pointsToSpend } = req.body;

  if (!userId || !pointsToSpend) {
    return res.status(400).json({ error: "userId and pointsToSpend are required" });
  }

  res.status(200).json({ message: `Spent ${pointsToSpend} points for user ${userId}` });
};

const getPointsBalance = (req, res) => {

  
  const balance = 1000;
  res.status(200).json({ balance });
};

module.exports = {
  addPoints,
  spendPoints,
  getPointsBalance
};
