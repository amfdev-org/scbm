# SCBM

## Pre-requisites

* ubuntu 16.04 (might run on other distros - I don't know)
* node (built with v10.18 - might work on other versions - I don't know)
* yarn
* mysql (for api session storage)
* Nginx or another webserver, if you plan to reverse-proxy external requests to `localhost` ([Nginx sample config](../blob/master/nginx.conf.sample))
* SSL cert, if you plan on accessing from external web

## Installation

1. Clone the repository

2. Populate the environmental variables for the Express backend in **/api/.env**
..* The backend will then run on `localhost` at the specified `PORT`
    
3. Populate the environmental variables for the React frontend in **/app/.env**
..* The Create React App dev server will then run on `localhost` at the specified `PORT`
..* Make sure that `REACT_APP_API_URL` matches the `BASE_URL` defined in **/api/.env**!
    
4. From the root directory, run `yarn` to install dependencies

5. From the root directory run `sudo chmod a+x start-dev && sudo chmod a+x stop-dev` to make the start/stop scripts executable

6. It should also be possible to create a production build rather than use the Create React App dev server:
..* run `yarn build` from the `app` directory
..* re-configure Nginx as per the instructions [here](https://stackoverflow.com/a/47505427)
    
## To start the app

* Simply run `./start-dev' from the root directory - this will use `pm2` to create two watched processes "scbm-api" and "scbm-app"

* To check the status of the processes, do `pm2 status`

## To stop the app

* Simply run `./stop-dev' from the root directory
