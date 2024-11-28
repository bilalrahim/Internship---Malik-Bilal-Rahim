const { writeDataToFile, readAllFiles, readDataFromFile } = require('../utils/file.utils');
const path = require('path');

const addPoints = (payer, points, timestamp) => {
  const filePath = path.resolve(__dirname, `../../datastore/${timestamp}.json`);  
  writeDataToFile(filePath, { payer, points, timestamp })

  return;
}

const spendPoints = (spendAmount) => {
  const datastorePath = path.resolve(__dirname, "../../datastore");

    const transactionFiles = readAllFiles(datastorePath);
    const transactions = transactionFiles.map((file) => {
      const filePath = path.join(datastorePath, file);
      return readDataFromFile(filePath);
    });
    
    const totalPoints = transactions.reduce((acc, { points }) => acc + points, 0);
    if (spendAmount > totalPoints) {
      return { success: false, message: "[Not-Enough-Points]" };
    }

    transactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    let pointsToSpend = spendAmount;
    const deductions = {};

    transactions.forEach((transaction) => {
      if (pointsToSpend <= 0) return;
    
      const { payer, points, timestamp } = transaction;
    
      if (points <= 0) return;
    
      const pointsToDeduct = Math.min(points, pointsToSpend);
      pointsToSpend -= pointsToDeduct;
      transaction.points -= pointsToDeduct;
    
      deductions[payer] = (deductions[payer] || 0) - pointsToDeduct;
    
      const filePath = path.join(datastorePath, `${timestamp}.json`);
      writeDataToFile(filePath, transaction);
    });
    

    return { success: true, data: deductions };
}

const getPointsBalance = () => {
  const datastorePath = path.resolve(__dirname, "../../datastore");

  const payerBalances = {};

  const files = readAllFiles(datastorePath);

    files.forEach((file) => {
      const filePath = path.join(datastorePath, file);
      const transaction = readDataFromFile(filePath)

      const { payer, points } = transaction;

      payerBalances[payer] = (payerBalances[payer] || 0) + points;
    });

    return payerBalances;
}

module.exports = {
  addPoints,
  spendPoints,
  getPointsBalance
}