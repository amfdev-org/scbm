# SCBM

A messaging & promotion tool for music producers and their platform of choice

## Pre-requisites

* node v10.18 or newer
* yarn
* a mysql server
* Nginx or another reverse-proxying web server
    * [Nginx dev sample config is included](https://github.com/amfdev-org/scbm/blob/master/dev-nginx.conf.sample)
* SSL cert for your external domain - the app might work without this, but it's not tested

## Installation

1. Clone the repository

2. Configure the Express API backend
    * rename **/api/.env.sample** to **/api/.env**
    * populate & save the file with your environmental variables
        
        * `RUN_MODE`: can be set to **dev** or **prod**. Setting to **dev** is recommended
        * `PORT`: the port on localhost where you want the api to run - naturally needs to match Nginx or other reverse proxy config
        * `DB_HOST`: mysql hostname, usually **localhost**
        * `DB_USER`: mysql username, usually **root**
        * `DB_PASS`: mysql password
        * `DB_NAME`: can be anything you like - installation will create this database for you
        * `DB_PORT`: mysql port, usually **3306**
        * `DB_TIMEZONE`: setting this to **Europe/London** was required for me to make timestamps work, though [node-mysql2 currently throws an error](https://stackoverflow.com/a/47505427) when you do this
        * `EXPRESS_SESSION_NAME`: the cookie name to pass between server and client - could simply be **scbm**
        * `EXPRESS_SESSION_SECRET`: should be a randomly-generated string to secure the sessions
        * `CRYPTR_KEY`: should be a randomly-generated string for password encryption
        * `ROOT_PATH`: the full current working directory for the api e.g. **/path/to/your/folder/scbm/api**
        * `BASE_URL`: the full external URL you're using for the api e.g. **https://scbm.co.uk/api**
        
3. Configure the React frontend
    * rename **/app/.env.sample** to **/app/.env**
    * populate & save the file with your environmental variables

        * `PORT`: the port on localhost where you want the Create React App dev server to run - naturally needs to match Nginx or other reverse proxy config
        * `REACT_APP_ROOT_PATH`: the full current working directory for the app e.g. **/path/to/your/folder/scbm/app**
        * `REACT_APP_BASE_URL`: the full external URL you're using for the app e.g. **https://scbm.co.uk**
        * `REACT_APP_API_URL`: the full external URL you're using for the api e.g. **https://scbm.co.uk/api**

4. From the root directory, run `sudo chmod u+x install && sudo chmod u+x start-dev && sudo chmod u+x stop-dev` to make the install, start and stop scripts executable

5. From the root directory, run `./install` to generate dependencies and install the mysql db schema

6. To create a production build rather than use the Create React App dev server:
    * run `yarn build` from the `app` directory
    * re-configure Nginx as per the [included sample config](https://github.com/amfdev-org/scbm/blob/master/prod-nginx.conf.sample) or instructions [here](https://stackoverflow.com/a/47505427) to point to the **build** directory
    * you will still need the api backend to run of course, so from the root directory you can use `./start-api-only`
    
## To start the app

* Run `./start-dev` from the root directory - this will use `pm2` to create two watched processes `scbm-api` and `scbm-app`

* To check the status of these processes, do `pm2 status`

* To see real-time logging, do `pm2 logs`

## To stop the app

* Run `./stop-dev` from the root directory
