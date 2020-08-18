const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

const MySQLStoreOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
 
var sessionStore = new MySQLStore(MySQLStoreOptions);

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const utils = require('./utils')
console.log = function(d) {
    utils.consoleLogToFile(d)
}

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    name: process.env.EXPRESS_SESSION_NAME,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        httpOnly: false,
        secure: false,
        maxAge: null
    }
}))

//CONTROLLERS
const AuthController = require('./controllers/auth')
const SignupController = require('./controllers/signup')
const LoginController = require('./controllers/login')
const CommenterController = require('./controllers/commenter')
const FollowerController = require('./controllers/follower')
const MessageController = require('./controllers/message')
const UserController = require('./controllers/user')
const SearchController = require('./controllers/search')

//ROUTES
app.get('/auth/', (req, res) => {
    AuthController.getAuth(req, res);
})

app.post('/signup/', (req, res) => {
    SignupController.postSignup(req, res);
});

app.post('/login/', (req, res) => {
    LoginController.postLogin(req, res); 
});

app.get('/commenters/', function(req, res) {
    CommenterController.getCommenters(req, res); 
});
        
app.get('/searches/', function(req, res) {
    SearchController.getSearches(req, res); 
});

app.get('/followers/', function(req, res) {
     FollowerController.getFollowers(req, res); 
});
    
app.get('/sent-messages/', function(req, res) {
    MessageController.getSentMessages(req, res);  
});

app.get('/received-messages/', function(req, res) {
    MessageController.getReceivedMessages(req, res); 
});

app.post('/message/', function(req, res) {
    MessageController.postMessage(req, res); 
});

app.post('/user/', (req, res) => {
    UserController.updateUser(req, res); 
});

app.get('/logout', (req, res) => {
    LoginController.getLogout(req, res);
});

app.get('/download-logs/', function(req, res) {
    utils.getDownloadLogs(req, res);
});

//START THE SERVER
var server = app.listen(process.env.PORT,() => {
  console.log("Started on PORT " + process.env.PORT)
})

server.setTimeout(900000);