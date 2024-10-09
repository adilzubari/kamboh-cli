const { Command } = require("commander");
const { execSync: originalExecSync } = require("child_process");
const fs = require("fs");

// Override execSync to include stdio inheritance
function execSync(command, options = {}) {
  console.log(`Executing: ${command}`);
  return originalExecSync(command, { stdio: "inherit", ...options }); // Inherit stdio by default
}

function copyContent(base, target) {
  const content = fs.readFileSync(base, "utf-8");
  fs.writeFileSync(target, content);
}

const copySkeletonContent = (base, target) =>
  copyContent("skeleton-files/express-delivery/" + base, target);

const init = new Command()
  .command("express-delivery:init <projectName>")
  .description("Initialize a new Express project")
  .action((projectName) => {
    console.log(`Initializing Express project: ${projectName}`);

    // Make dir and cd into it
    console.log("Creating project directory...");
    execSync(`mkdir ${projectName}`);
    process.chdir(projectName);

    // Initialize a new Node.js project
    console.log("Initializing Node.js project...");
    execSync("npm init -y");

    // Installing express
    console.log("Installing Express...");
    execSync("npm install express");

    // Installing packages
    console.log("Installing Packages...");
    execSync(
      "npm install yup axios body-parser cors dotenv firebase-admin firebase-functions il8n-iso-countries moment moment-timezone uuid stripe"
    );

    // Create an index.js file
    console.log("Creating index.js file...");
    execSync(`echo "{"routes":[]}" > express-delivery.json`);
    copySkeletonContent("index.js", "index.js");

    // Creating Routes file
    console.log("Creating routes file...");
    copySkeletonContent("routes.js", "routes.js");

    // Creating Middlewares
    console.log("Creating errorHandler Middleware...");
    copySkeletonContent(
      "middlewares/errorHandler.js",
      "middlewares/errorHandler.js"
    );

    console.log("Creating no found handler Middleware...");
    copySkeletonContent(
      "middlewares/notFoundHandler.js",
      "middlewares/notFoundHandler.js"
    );

    // installing dev dependencies
    console.log("Installing dev dependencies...");
    execSync("npm install nodemon firebase-functions-test --save-dev");

    // Add start script to package.json
    console.log("Adding start script to package.json...");
    execSync(
      `npx json -I -f package.json -e "this.scripts.start='nodemon index.js'"`
    );

    // Creating a .gitignore file
    console.log("Creating .gitignore file...");
    execSync(`echo "node_modules" > .gitignore`);

    // Running the server
    console.log("Starting the server...");
    execSync("npm run start");
  });

// Export the program object
module.exports = init;
