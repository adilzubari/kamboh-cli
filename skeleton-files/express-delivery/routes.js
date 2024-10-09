const express = require("express");
const router = express.Router();
const { routes } = require("./express-delivery.json");

// Helper function to dynamically load the correct handler
function loadHandler(routePath, method) {
  try {
    // Dynamically require the handler using a simple string
    const handler = require(`.${directory}/${method}/index.js`);
    return handler;
  } catch (error) {
    throw new Error(
      `Handler for ${routePath} with method ${method} not found.`
    );
  }
}

// Dynamically register routes
routes.forEach((route) => {
  const { path: routePath, method } = route;

  try {
    // Load the appropriate handler based on the path and method
    const handler = loadHandler(routePath, method);

    // Register the route dynamically based on the HTTP method
    router[method](routePath, handler);

    console.log(`Registered route: [${method.toUpperCase()}] ${routePath}`);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
