#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

// Initialize the commander program
const program = new Command();

// Function to recursively load command files
function loadCommands(dir) {
  // Read all files and directories in the current directory
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // If it's a directory, recursively load commands
    if (stat.isDirectory()) {
      loadCommands(fullPath);
    }
    // If it's a file and ends with .js, import the command
    else if (file.endsWith(".js")) {
      const command = require(fullPath);
      program.addCommand(command);
    }
  });
}

// Load commands from the 'commands' folder
loadCommands(path.join(__dirname, "commands"));

// Parse the command-line arguments
program.parse(process.argv);
