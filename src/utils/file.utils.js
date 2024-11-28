const fs = require("fs");
const path = require("path");

/**
 * Writes data to a JSON file.
 * 
 * @param {string} filePath - The path to the JSON file.
 * @param {object} data - The data to write to the file.
 */
const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error(`Error writing data to file: ${error.message}`);
  }
};

/**
 * Reads and returns all data from a JSON file.
 * 
 * @param {string} filePath - The path to the JSON file.
 * @returns {object} - The parsed JSON data from the file.
 */
const readDataFromFile = (filePath) => {
  try {
    const rawData = fs.readFileSync(path.resolve(filePath), "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading data from file: ${error.message}`);
    return null;
  }
};

/**
 * Reads All Files in a Directory.
 * 
 * @param {string} directory - The path to the JSON file.
 * @returns {Array} - All files.
 */
const readAllFiles = (directory) => {
  try {
    const files = fs.readdirSync(directory);
    return files;
  } catch (error) {
    console.error(`Error reading data from file: ${error.message}`);
    return null;
  }
};

module.exports = {
  writeDataToFile,
  readDataFromFile,
  readAllFiles
};
