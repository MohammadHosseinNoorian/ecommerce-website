const fs = require("fs");
const path = require("path");

// Read your db.json file
const dbPath = path.join(process.cwd(), "db.json");
let db = {};

try {
  const dbData = fs.readFileSync(dbPath, "utf8");
  db = JSON.parse(dbData);
} catch (error) {
  console.error("Error reading db.json:", error);
}

exports.handler = async (event) => {
  const { path, httpMethod, body, queryStringParameters } = event;

  // Remove '/.netlify/functions/api' from the path
  const requestPath = path.replace("/.netlify/functions/api", "") || "/";

  console.log(`Request: ${httpMethod} ${requestPath}`);

  try {
    let responseData;
    let statusCode = 200;

    switch (httpMethod) {
      case "GET":
        responseData = handleGet(requestPath, queryStringParameters);
        break;
      case "POST":
        responseData = handlePost(requestPath, body);
        statusCode = 201;
        break;
      case "PUT":
        responseData = handlePut(requestPath, body);
        break;
      case "DELETE":
        responseData = handleDelete(requestPath);
        break;
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    return {
      statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

function handleGet(path, queryParams) {
  if (path === "/" || path === "") {
    return db;
  }

  const resources = path.split("/").filter(Boolean);
  let currentData = db;

  for (const resource of resources) {
    if (currentData[resource] !== undefined) {
      currentData = currentData[resource];
    } else {
      throw new Error("Resource not found");
    }
  }

  // Simple filtering (you can enhance this)
  if (queryParams && Object.keys(queryParams).length > 0) {
    if (Array.isArray(currentData)) {
      return currentData.filter((item) => {
        return Object.entries(queryParams).every(([key, value]) => {
          return item[key] == value; // Use == for loose comparison
        });
      });
    }
  }

  return currentData;
}

function handlePost(path, body) {
  const resources = path.split("/").filter(Boolean);
  const resourceName = resources[0];

  if (!db[resourceName]) {
    db[resourceName] = [];
  }

  const newItem = {
    id: Date.now(), // Simple ID generation
    ...JSON.parse(body),
  };

  db[resourceName].push(newItem);
  saveDB();

  return newItem;
}

function handlePut(path, body) {
  const resources = path.split("/").filter(Boolean);
  const resourceName = resources[0];
  const id = parseInt(resources[1]);

  if (!db[resourceName]) {
    throw new Error("Resource not found");
  }

  const index = db[resourceName].findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Item not found");
  }

  const updatedItem = {
    ...db[resourceName][index],
    ...JSON.parse(body),
    id: id, // Preserve original ID
  };

  db[resourceName][index] = updatedItem;
  saveDB();

  return updatedItem;
}

function handleDelete(path) {
  const resources = path.split("/").filter(Boolean);
  const resourceName = resources[0];
  const id = parseInt(resources[1]);

  if (!db[resourceName]) {
    throw new Error("Resource not found");
  }

  const index = db[resourceName].findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Item not found");
  }

  db[resourceName].splice(index, 1);
  saveDB();

  return { message: "Item deleted successfully" };
}

function saveDB() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error("Error saving db.json:", error);
  }
}
