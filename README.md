# SCBM

A messaging & promotion tool for music producers and their platform of choice

## Pre-requisites

* ubuntu 16.04 (probably runs on other distros but this is not tested)
* node (built with v10.18 - probably works on other versions but this is not tested)
* yarn
* mysql (it should be possible to use another DB but you'd need to refactor)
* Nginx or another webserver to reverse-proxy external requests to `localhost` ([Nginx sample config can be found here](nginx.conf.sample))
* SSL cert for your external domain - might work on http but this is not tested

## Installation

1. Clone the repository

2. Configure the Express backend
    * rename **/api/.env.sample** to **/api/.env**
    * populate & save the file with your environmental variables
        
        * `RUN_MODE`: can be set to **dev** or **prod**. Setting to **dev** is recommended
        * `PORT`: the port on `localhost` where you want the api to run - naturally needs to match Nginx or other reverse proxy config
        * `DB_HOST`: mysql hostname, usually `localhost`
        * `DB_USER`: mysql username, usually `root`
        * `DB_PASS`: mysql password
        * `DB_NAME`: can be anything you like - installation will create this database for you
        * `DB_PORT`: mysql port, usually 3306
        * `DB_TIMEZONE`: setting this to **Europe/London** was required for me to make timestamps work, though [node-mysql2 currently throws an error](https://stackoverflow.com/a/47505427)
        * `EXPRESS_SESSION_NAME`: the cookie name to pass between server and client - could simply be **scbm**
        * `EXPRESS_SESSION_SECRET`: should be a randomly-generated string to secure the sessions
        * `CRYPTR_KEY`: should be a randomly-generated string for password encryption
        * `ROOT_PATH`: the full current working directory for the api e.g. **/path/to/your/folder/scbm/api**
        * `BASE_URL`: the full external URL you're using for the api e.g. **https://scbm.co.uk/api**
        
3. Configure the React frontend
    * rename **/app/.env.sample** to **/app/.env**
    * populate & save the file with your environmental variables

        * `PORT`: the port on `localhost` where you want the Create React App dev server to run - naturally needs to match Nginx or other reverse proxy config
        * `REACT_APP_ROOT_PATH`: the full current working directory for the app e.g. **/path/to/your/folder/scbm/app**
        * `REACT_APP_BASE_URL`: the full external URL you're using for the app e.g. **https://scbm.co.uk**
        * `REACT_APP_API_URL`: the full external URL you're using for the api e.g. **https://scbm.co.uk/api**
        
    * double check that `REACT_APP_API_URL` matches the `BASE_URL` defined in **/api/.env**
    
4. From the root directory run `sudo chmod u+x install && sudo chmod u+x start-dev && sudo chmod u+x stop-dev` to make the install, start and stop scripts executable

5. From the root directory run `./install` to generate dependencies and install the mysql db schema

6. It should also be possible to create a production build rather than use the Create React App dev server:
    * run `yarn build` from the `app` directory
    * re-configure Nginx as per the instructions [here](https://stackoverflow.com/a/47505427)

## To start the app

* Run `./start-dev` from the root directory - this will use `pm2` to create two watched processes `scbm-api` and `scbm-app`

* To check the status of these processes, do `pm2 status`

* To see real-time logging, do `pm2 logs`

## To stop the app

* Run `./stop-dev` from the root directory
