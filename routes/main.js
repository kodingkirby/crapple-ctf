var router = require('express').Router()
var vulnDict = require('../config/vulns')
var authHandler = require('../core/authHandler')
var vh = require('../core/validationHandler')
var si = require('../mysql_init/sqlInit')
const replace = require('replace-in-file');
//const os = require('os');
var metadata = require('node-ec2-metadata');
//var hostname;
var isInit = 0;

metadata.getMetadataForInstance('public-hostname')
.then(function(instanceId) {
    console.log("AWS Public Hostname: " + instanceId);
    hostname = instanceId;
})
.fail(function(error) {
    console.log("Error: " + error);
    //hostname = os.hostname();
});

//dockername = os.hostname();
//console.log('Dockername: ' + dockername); 
//main js? Just say yes!

module.exports = function (passport) {
	router.get('/', authHandler.isAuthenticated, function (req, res) {
		res.redirect('/homepage')
	})

	router.get('/login', authHandler.isNotAuthenticated, function (req, res) {
		if (isInit == 0){
		  si.initDb();
                  
const hostreplace = {
  files: '/solutions/*.html',
  from: 'queryAndPopInAwsHostNameHere',
  to: hostname,
};
		try {
                    const changes = replace.sync(hostreplace);
                    console.log('Modified files:', changes.join(', '));
                  }
                  catch (error){
                    console.error('error happened with hostname replace:', error);
                  }                 
                  isInit = 1;
                        
		}
		res.render('login')
	})

	router.get('/homepage', authHandler.isAuthenticated, function (req, res){
		res.render('homepage');
	})

	router.get('/register', authHandler.isNotAuthenticated, function (req, res) {
		res.render('register')
	})

	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})

	router.get('/forgotpw', function (req, res) {
		res.render('forgotpw')
	})

	router.get('/resetpw', authHandler.resetPw)

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/homepage',
		failureRedirect: '/login',
		failureFlash: true
	}))

	router.post('/register', passport.authenticate('signup', {
		successRedirect: '/homepage',
		failureRedirect: '/register',
		failureFlash: true
	}))

	router.post('/forgotpw', authHandler.forgotPw)

	router.post('/resetpw', authHandler.resetPwSubmit)

	return router
}
