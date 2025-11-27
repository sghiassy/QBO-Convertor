# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QBO-Converter is a web application that converts QFX (Quicken Financial Exchange) files to QBO (QuickBooks Online) files for import into QuickBooks. The application operates entirely client-side in the browser for security - no files are uploaded to servers.

The project consists of:
- A simple Express.js web server that serves static files
- Client-side JavaScript that performs QFX to QBO conversion in the browser
- A command-line conversion script for local file conversion

## Development Commands

### Setup
```bash
npm install
```

### Build
```bash
npx grunt        # Default build: concatenates JS/CSS/HTML and copies images to build/
npm test         # Alias for 'grunt' (no actual tests currently)
npx grunt build  # Full build with minification
```

### Run Development Server
```bash
npm start        # Runs grunt, then starts Express server on port 3000 (or PORT env var)
```

### Deploy to Heroku (Legacy)
```bash
npm run heroku:deploy  # git push heroku
```

### Deploy to Docker Swarm VPS
```bash
npm run docker:build:image  # Build Docker image for linux/amd64
npm run docker:push         # Push to Docker Hub (sghiassy/qbo-converter)
npm run docker:deploy       # Deploy to VPS via Docker Swarm
```

## Architecture

### Build System (Grunt)
The Gruntfile orchestrates the build process:
- **concat**: Combines source files from `src/` into `build/`
  - JS: `src/js/*.js` → `build/qbo-converter.js`
  - CSS: `src/css/reset.css` + `src/css/main.css` → `build/qbo-converter.css`
  - HTML: Copies `src/html/*.html` → `build/*.html`
- **uglify**: Minifies concatenated JS → `build/qbo-converter.min.js`
- **copy**: Copies all images from `src/images/` to `build/`
- **watch**: Auto-rebuilds on file changes (not used in npm scripts)

### Web Server (web.js)
Simple Express server that:
- Serves static files from `build/` directory with 1-day cache
- Includes a `/test` endpoint for health checks
- Uses morgan for request logging
- Runs on port 3000 locally (configurable via PORT env var)

### Client-Side Conversion Logic
The conversion happens entirely in the browser via `src/js/index.js`:

**Core conversion function** (`app.convertFile`):
1. Searches for XML tags in QFX file: `<ORG>`, `<FID>`, `<INTU.BID>`
2. Replaces bank organization with "AMEX" (hardcoded)
3. Replaces FID (Financial Institution ID) with user-provided value or default "3106"
4. Replaces INTU.BID (Intuit Bank ID) with same value as FID
5. Returns modified file content

**File handling** (`app.handleFileSelect`):
- Uses HTML5 File API for drag-and-drop
- Only accepts `.qfx` files
- Browser compatibility: Chrome only (enforced in code)
- Converts file extension from `.qfx` to `.qbo`
- Triggers browser download of converted file using Blob API

**Advanced mode**:
- Users can override default FID/BID (3106) with custom value
- Checkbox toggles visibility of FID input field
- For QB 2018+ compatibility, users can try FID value "11162"

### Command-Line Script (convert.js)
Standalone Node.js script for local conversion:
```bash
./convert.js --file personal.qfx
```
- Uses same conversion logic as web app
- Hardcoded to AMEX bank with FID/BID "3106"
- Writes output file with `.qbo` extension

### JavaScript Module Structure
The app uses a global `window.app` namespace pattern:
- `app.appSetup()`: Initializes DOM caching, event listeners, window resizing
- `app.setupFileAPI()`: Sets up drag-and-drop file handlers
- `app.convertFile()`: Core conversion logic
- `app.handleFileSelect()`: Processes dropped files
- `app.infoSign` / `app.errorSign`: UI notification system (in `infoSign.js`)
- `app.css`: Stores cached jQuery selectors and window dimensions

## Node Version

This project requires **Node.js 20.18.0** (specified in package.json engines and .nvmrc).

## Deployment

### Docker Swarm VPS (Primary)
The project is deployed to a custom VPS using Docker Swarm:
- **Image**: `sghiassy/qbo-converter` on Docker Hub
- **Domain**: qboconverter.com
- **Reverse Proxy**: Caddy handles SSL and routing
- **Deployment process**:
  1. Build image locally with `npm run docker:build:image` (builds for linux/amd64)
  2. Push to Docker Hub with `npm run docker:push`
  3. Deploy to VPS with `npm run docker:deploy` (uses Docker context `hostinger`)
- **Stack name**: `qbo-app`
- **Network**: Shares `caddy_network` overlay with other services

### Docker Configuration
- **Dockerfile**: Multi-stage build that runs Grunt during image creation
- **Port**: 3000 (internally), exposed via Caddy reverse proxy
- **Build artifacts**: Generated during Docker build, not at runtime

### Heroku (Legacy)
Legacy deployment option:
- Automatic deployment via Travis CI on successful builds
- Manual deployment: `git push heroku master`
- Heroku uses `npm start` script which runs grunt build + Express server

### Caddyfile Configuration
Add to `/root/Caddyfile` on VPS:
```
qboconverter.com {
    reverse_proxy qbo-app_web:3000
}
```
