var authH = require("../core/authHandler.js");
var db = require('../models');

// module.exports.initDb = function(){
//   console.log('initdb is running');
//   db.User.bulkCreate([
//     email: 'skirby@qualcomm.com',
//     password: authH.createHash('12345678'),
//     name: 'Sam',
//     login: 'skirby'
//   ]).then(function (users) {
//     console.log(users);
//   });
// }


module.exports.initDb = function(){
	db.User.bulkCreate([
	  { name: 'Bossman', login: 'bossman', email: 'bossman@crapple.com', password: authH.createHash('yOuW1ln3v3RgUe55th3Passw0rd'), role: 'admin' },
	  { name: 'Sam', login: 'skirby', email: 'skirby@crapple.com', password: authH.createHash('iamsam123'), role: 'null' },
	  { name: 'Bob', login: 'bdylan', email: 'bdylan@crapple.com', password: authH.createHash('afwn49eraiotsj'), role: 'null' },
	  { name: 'Gordan', login: 'gfreeman', email: 'gfreeman@crapple.com', password: authH.createHash('af40tjaworfes'), role: 'null' },
	  { name: 'Rick', login: 'rsanchez', email: 'rsanchez@crapple.com', password: authH.createHash('aw458FADIasn'), role: 'admin' },
	  { name: 'Tyler', login: 'tperry', email: 'tperry@crapple.com', password: authH.createHash('SGNOI3mfdsdj'), role: 'null' },
	  { name: 'Travis', login: 'tscott', email: 'tscott@crapple.com', password: authH.createHash('ast05jfasmifdj'), role: 'null' }
	]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
	  return db.User.findAll();
	}).then(users => {
	  console.log(users) // ... in order to get the array of user objects
	});
}

