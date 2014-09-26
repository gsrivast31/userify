//Module dependencies
var express = require('express')
    , http = require('http')
    , passport = require('passport')
    , util = require('util')
    , session = require('express-session')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , expressValidator = require('express-validator')
    , auth = require("./auth")
    , oauth = require("./oauth")
    , registration = require("./registration")

// Express configuration
var app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(bodyParser())
app.use(expressValidator())
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat'}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/client/registration', function(req, res) { 
    console.log('Registering client');
    res.render('clientRegistration') 
})

app.post('/client/registration', registration.registerClient)

app.get('/registration', function(req, res) { 
    res.render('userRegistration') 
})

app.post('/registration', registration.registerUser)

app.get('/login', function(req, res) { 
    console.log('Received login');
    console.log(req.query.clientId);console.log(req.query.redirectUri);
    
    res.render('login', 
        {clientId : req.query.clientId, redirectUri: req.query.redirectUri}) 
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    console.log('Received login request');
	res.redirect('/oauth/authorization?response_type=code&client_id=' + req.body.clientId + '&redirect_uri=' + req.body.redirectUri)
})

app.get('/oauth/authorization', oauth.authorization)

app.post('/decision', oauth.decision)

app.post('/oauth/token', oauth.token)

app.get('/restricted', passport.authenticate('accessToken', { session: false }), function (req, res) {
    res.send("Yay, you successfully accessed the restricted resource!")
})

//Start
http.createServer(app).listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0")
