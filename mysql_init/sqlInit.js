var authH = require("../core/authHandler.js");
var db = require('../models');

function initDb(){
  db.User.create({
    email: 'skirby@qualcomm.com',
    password: authH.createHash('12345678'),
    name: 'Sam',
    login: 'skirby'
  }).then(function (user) {
    console.log(user);
  });
}

setTimeout(initDb(), 10000);

