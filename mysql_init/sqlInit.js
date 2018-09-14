var authH = require("../core/authHandler.js");
var db = require('../models');

module.exports.insert = function(){
  db.User.create({
    email: 'skirby@qualcomm.com',
    password: authH.createHash('12345678'),
    name: 'Sam',
    login: 'skirby'
  }).then(function (user) {
    console.log(user);
  });
}

