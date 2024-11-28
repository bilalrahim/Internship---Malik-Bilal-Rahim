const { writeDataToFile, readAllFiles, readDataFromFile } = require('../utils/file.utils');
const path = require('path');
const FILEPATH = path.resolve(__dirname, '../../datastore')
/**
 * Adds points to a specific payer at a given timestamp.
 * 
 * @param {string} payer - The name of the payer.
 * @param {number} points - The number of points to add.
 * @param {string} timestamp - The timestamp of when the transaction takes place.
 * @returns {void} - No return value.
 */
const addPoints = (payer, points, timestamp) => {
  const filePath = `${FILEPATH}/${timestamp}.json`;  
  writeDataToFile(filePath, { payer, points, timestamp });
  return;
}

/**
 * Deducts points from the oldest transactions until the specified spend amount is reached.
 * 
 * @param {number} spendAmount - The total amount of points to spend.
 * @returns {Object} - The result of the spend operation, including success and deducted points by payer.
 * @returns {boolean} result.success - Whether the operation was successful.
 * @returns {string} [result.message] - A message indicating the failure reason (if any).
 * @returns {Object} [result.data] - An object showing the deductions per payer, with the payer as the key and deducted points as the value.
 */
const spendPoints = (spendAmount) => {
  const transactionFiles = readAllFiles(FILEPATH);

  const transactions = transactionFiles.map((file) => {
    const filePath = path.join(FILEPATH, file);
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

    const pointsToDeduct = Math.min(points, pointsToSpend);
    pointsToSpend -= pointsToDeduct;
    transaction.points -= pointsToDeduct;

    deductions[payer] = (deductions[payer] || 0) - pointsToDeduct;

    const filePath = path.join(FILEPATH, `${timestamp}.json`);
    writeDataToFile(filePath, transaction);
  });

  return { success: true, data: deductions };
}

/**
 * Retrieves the current points balance for each payer.
 * 
 * @returns {Object} - A mapping of each payer to their current points balance.
 * @returns {string} payer - The name of the payer.
 * @returns {number} payerBalance - The total points balance for that payer.
 */
const getPointsBalance = () => {
  const payerBalances = {};

  const files = readAllFiles(FILEPATH);

  files.forEach((file) => {
    const filePath = path.join(FILEPATH, file);
    const transaction = readDataFromFile(filePath);
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
