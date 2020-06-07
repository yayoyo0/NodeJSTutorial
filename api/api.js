let Router = require("express");
let api = Router();
let users = require('../users/users');
let middleware = require('../middleware/api')
let jwt = require("jsonwebtoken");
let user = { email: "prueba@prueba.com", password: "ThisIsNotATest" };
const secret_key = "Tut0r1al";

// Routes
api.get('/prueba',(req,res)=>{
  res.json({"test":true});
})

api.get('/users',middleware,(req,res)=>{
  res.json({"users":users});
})

api.route('/login')
  .post((req,res)=>{
    if(req.body.email == user.email && req.body.password == user.password){
      jwt.sign({ user: user }, secret_key, (err, token) => {
            res.json({ success: true, token: token });
      });
    }else{
      res.status(403).json({success:false,message:"User not valid"});
    }

  })
// End Routes
module.exports = api;
