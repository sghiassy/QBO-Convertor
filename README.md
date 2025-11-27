# QBO-Convertor

[![Build Status](https://travis-ci.org/sghiassy/QBO-Convertor.svg?branch=master)](https://travis-ci.org/sghiassy/QBO-Convertor)

## Dev Setup

    - `git clone git@github.com:sghiassy/QBO-Convertor.git`
    - `cd QBO-Conertor`
    - `npm install`
    - `npx grunt`
    - `npm start`

## Deploying

### Docker Swarm VPS (Current)

The application is now deployed to a custom VPS using Docker Swarm at **https://qboconverter.com**

#### Prerequisites
- Docker installed locally
- Docker context configured for VPS (named `hostinger`)
- Access to Docker Hub account `sghiassy`

#### Deployment Steps

```bash
npm run docker:build:image  # Build Docker image for linux/amd64
npm run docker:push         # Push to Docker Hub
npm run docker:deploy       # Deploy to VPS via Docker Swarm
```

The deployment process:
1. Builds the image locally with Grunt build included
2. Pushes to Docker Hub as `sghiassy/qbo-converter:latest`
3. Deploys to VPS using Docker stack `qbo-app`
4. Caddy automatically handles SSL/TLS and reverse proxy

### Heroku (Legacy - Deprecated)

Previously, this repo was set to automatically deploy to Heroku once the Travis CI job passed.

#### Manual Heroku Deployment (No longer used)

Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-command-line

Configuration:
```bash
git remote add heroku git@heroku.com:qbo-converter.git
```

Deploy:
```bash
git push heroku master
```
