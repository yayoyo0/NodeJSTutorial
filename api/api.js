var Router = require("express");
let api = Router();
var users = require('../users/users');

// Routes
api.get('/prueba',(req,res)=>{
  res.json({"test":true});
})
api.get('/users',(req,res)=>{
  res.json({"users":users});
})
// End Routes
module.exports = api
