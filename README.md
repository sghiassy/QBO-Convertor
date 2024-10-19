# QBO-Convertor

[![Build Status](https://travis-ci.org/sghiassy/QBO-Convertor.svg?branch=master)](https://travis-ci.org/sghiassy/QBO-Convertor)

## Dev Setup

    - `git clone git@github.com:sghiassy/QBO-Convertor.git`
    - `cd QBO-Conertor`
    - `npm install`
    - `npx grunt`
    - `npm start`

## Deploying

This repo is set to automatically deploy to Heroku once the Travis CI job passes

### Manual Deployment

__NOTE: This is no longer required__

#### Heroku CLI

Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-command-line

#### Configuration

If this is the first time cloning the repo, add the Heroku endpoint

    - git remote add heroku git@heroku.com:qbo-converter.git

#### Push

else, you can just deploy

    - git push heroku master
