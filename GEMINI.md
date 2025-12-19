# Project Overview

This project is a web application that converts QFX files to QBO files for use in Quickbooks. The main purpose is to provide a free and easy way for users to import their bank transactions into Quickbooks, even if their bank doesn't support the QBO format.

The application is built using Node.js, Express, and Grunt. The frontend is a single-page application that uses jQuery and the File API to handle file uploads and conversions directly in the browser. The conversion logic is implemented in both a frontend script (`src/js/index.js`) and a backend script (`convert.js`). The backend script seems to be for command-line use, while the frontend script is for the web application.

The project is deployed using Docker and is available at [qboconverter.com](https://qboconverter.com).

# Building and Running

## Development

To set up the project for development, you need to have Node.js and npm installed.

1.  Clone the repository:
    ```bash
    git clone git@github.com:sghiassy/QBO-Convertor.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Build the project:
    ```bash
    npx grunt
    ```
4.  Start the development server:
    ```bash
    npm start
    ```
This will start a web server on port 4000.

## Production

The application is deployed using Docker. The `npm start` command will build and run the docker container. The following scripts are available for managing the deployment:

*   `npm run docker:build:image`: Build the Docker image.
*   `npm run docker:push`: Push the Docker image to Docker Hub.
*   `npm run docker:deploy`: Deploy the application to a Docker Swarm.

# Development Conventions

The project uses Grunt for task automation. The `Gruntfile.js` defines tasks for concatenating and uglifying JavaScript and CSS files, as well as copying images and HTML files to the `build` directory.

The project uses JSHint for linting the JavaScript code. The JSHint configuration is defined in the `Gruntfile.js`.

The project has a `.travis.yml` file, which indicates that it uses Travis CI for continuous integration.
