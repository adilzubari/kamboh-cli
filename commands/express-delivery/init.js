const { Command } = require("commander");
const { execSync: originalExecSync } = require("child_process");

// Override execSync to include stdio inheritance
function execSync(command, options = {}) {
  console.log(`Executing: ${command}`);
  return originalExecSync(command, { stdio: "inherit", ...options }); // Inherit stdio by default
}

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

    // Create an index.js file
    console.log("Creating index.js file...");
    execSync(
      `echo "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello World!'));\n\napp.listen(3000, () => console.log('Server running on port 3000'));" > index.js`
    );

    // installing nodemon
    console.log("Installing nodemon...");
    execSync("npm install nodemon --save-dev");

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
