const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { notFoundHandler } = require("./middlewares/notFoundHandler");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/express-delivery", routes);

// Error Handling middlewares
app.use(notFoundHandler); // Handle 404
app.use(errorHandler); // Handle other errors

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
