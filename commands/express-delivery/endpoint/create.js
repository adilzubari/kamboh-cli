const { Command } = require("commander");
const { execSync: originalExecSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Override execSync to include stdio inheritance
function execSync(command, options = {}) {
  console.log(`Executing: ${command}`);
  return originalExecSync(command, { stdio: "inherit", ...options });
}

const validMethods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "ALL",
  "STANDARD",
];
const init = new Command()
  .command("express-delivery:create-endpoint <method> <endpoint> [template]")
  .description("Create new endpoint")
  .action((method, endpoint, template) => {
    // Validate method
    if (!validMethods.includes(method.toUpperCase())) {
      console.error(
        "Invalid method. Please provide a valid HTTP request method."
      );
      return;
    }

    // Create folder with endpoint name
    const folderName = endpoint.includes("/");
    if (folderName) {
      console.error("Endpoint name cannot contain '/'");
      return;
    }

    fs.mkdirSync(folderName);

    // Create index.js file
    const indexContent = `// ${folderName}/index.js`;
    fs.writeFileSync(path.join(folderName, "index.js"), indexContent);

    // Create config.json file
    const configContent = `// ${folderName}/config.json`;
    fs.writeFileSync(path.join(folderName, "config.json"), configContent);

    // Create test file
    const testContent = `// ${folderName}/test.js\n\n// Add your tests here`;
    fs.writeFileSync(path.join(folderName, "test.js"), testContent);

    console.log(`Endpoint '${endpoint}' created successfully.`);
  });

// Export the program object
module.exports = init;
