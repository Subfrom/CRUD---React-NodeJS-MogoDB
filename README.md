# Project Learning

This project is a full-stack application built with React, Node.js, and MongoDB. It includes a client-side created with React and a server-side built with Node.js.

## Project Structure

The project is organized into three main directories:

- [`public/`](command:_github.copilot.openRelativePath?%5B%22public%2F%22%5D "public/"): This directory contains static files served by the application. It includes the `index.html` file, CSS stylesheets, JavaScript files, and a `manifest.json` file for PWA configuration.

- [`server/`](command:_github.copilot.openRelativePath?%5B%22server%2F%22%5D "server/"): This directory contains the server-side code of the application. It is organized into several subdirectories for configuration, controllers, functions, middlewares, models, and routes. The `server.js` file is the entry point of the server-side application.

- [`src/`](command:_github.copilot.openRelativePath?%5B%22src%2F%22%5D "src/"): This directory contains the client-side code of the application. It includes React components, CSS stylesheets, JavaScript files, and a `store/` directory for Redux state management.

## Key Files

- [`public/manifest.json`](command:_github.copilot.openSymbolInFile?%5B%22public%2Fmanifest.json%22%2C%22public%2Fmanifest.json%22%5D "public/manifest.json"): This file contains metadata for the web app, such as the short name, name, icons, start URL, display mode, and theme color.

- [`src/components/pages/Notfound.js`](command:_github.copilot.openSymbolInFile?%5B%22src%2Fcomponents%2Fpages%2FNotfound.js%22%2C%22src%2Fcomponents%2Fpages%2FNotfound.js%22%5D "src/components/pages/Notfound.js"): This file defines a React component for displaying a 404 Not Found page.

- [`src/layout/ResponsiveAppBar.js`](command:_github.copilot.openSymbolInFile?%5B%22src%2Flayout%2FResponsiveAppBar.js%22%2C%22src%2Flayout%2FResponsiveAppBar.js%22%5D "src/layout/ResponsiveAppBar.js"): This file defines a responsive app bar component using Material-UI components.

- [`src/layout/SideBar.js`](command:_github.copilot.openSymbolInFile?%5B%22src%2Flayout%2FSideBar.js%22%2C%22src%2Flayout%2FSideBar.js%22%5D "src/layout/SideBar.js"): This file defines a sidebar component for navigation in the application.

## Running the Project

To run this project, you need to install the dependencies and start both the client-side and server-side applications. You can do this by running the following commands in the terminal:

```sh
# Install dependencies
npm install

# Start the client-side application
npm start

# Start the server-side application
cd server
npm start
```

Please note that you need to have Node.js and npm installed on your machine to run these commands.
