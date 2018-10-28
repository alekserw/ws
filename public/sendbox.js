// var express = require('express');
// var router = express.Router();
// var request = require('request');
//
// router.get('/', function(req, res, next) {
//   request({
//     uri: 'https://geek-jokes.sameerkumar.website/api'
//   }).pipe(res);
// });
//
// // module.exports =
//
// console.log(router())


const request = require('request');
request('https://geek-jokes.sameerkumar.website/api', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
});
