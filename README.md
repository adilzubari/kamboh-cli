# Kamboh-CLI

A CLI tool to manage all Kamboh products. This tool is designed to speed up the development process.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Features](#features)
- [License](#license)
- [Contributing](#contributing)

## Installation

To install the `kamboh-cli` CLI tool, run the following command:

```bash
npm install -g kamboh-cli
```

## Usage

After installation, you can create a new Express.js project by running:

```bash
kamboh express-delivery:init <projectName>
```

Replace `<projectName>` with the desired name of your project.

## Commands

### `kamboh express-delivery:init <projectName>`

- **Description:** Initializes a new Express project in a new directory.
- **Parameters:**
  - `projectName`: The name of the project directory to be created.

#### Example

```bash
express-delivery:init my-express-app
```

This command will create a new directory called `my-express-app`, initialize a new Node.js project inside it, install Express and Nodemon, create a basic `index.js` file, and add a `.gitignore` file to exclude the `node_modules` directory. Finally, it starts the server.

## Features

- Creates a new Express project with minimal configuration.
- Installs essential dependencies (Express and Nodemon).
- Sets up a basic server with a sample route.
- Includes a `.gitignore` file for better project management.

## License

This project is licensed under the MIT License.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request.

For any issues or feature requests, please open an issue on GitHub.
