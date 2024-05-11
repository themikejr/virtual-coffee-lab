// Save this script as convertAlogToJson.mjs

import { readFile } from "fs/promises";

function preprocessData(pythonDictStr) {
  return pythonDictStr
    .replace(/True/g, "true")
    .replace(/False/g, "false")
    .replace(/None/g, "null")
    .replace(/\'/g, '"') // Replace single quotes with double quotes
    .replace(/(\w+)\s*:/g, '"$1":'); // Ensure keys are enclosed in double quotes
}

async function convertPythonDictToJson(pythonDictStr) {
  let jsonLikeStr = preprocessData(pythonDictStr);
  try {
    return JSON.stringify(JSON.parse(jsonLikeStr), null, 4);
  } catch (error) {
    console.error(
      "Failed to convert Python-like syntax to JSON:",
      error.message,
    );
    // Improved error logging: output surrounding text for a larger context
    console.error(
      "Nearby content:",
      jsonLikeStr.substring(
        Math.max(0, error.position - 100),
        error.position + 100,
      ),
    );
    return null;
  }
}

async function readAndConvertFile(filePath) {
  try {
    console.log("Reading file:", filePath);
    const data = await readFile(filePath, "utf8");
    const jsonContent = await convertPythonDictToJson(data);
    if (jsonContent) {
      console.log("Converted JSON:", jsonContent);
    } else {
      console.log("No JSON content generated.");
    }
  } catch (error) {
    console.error("Error reading or converting file:", error);
  }
}

const filePath = process.argv[2]; // Get file path from command line arguments
if (!filePath) {
  console.error("Please provide the file path as an argument.");
  process.exit(1);
}

readAndConvertFile(filePath);
