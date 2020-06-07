let Router = require("express");
let api = Router();
let users = require('../users/users');
let middleware = require('../middleware/api');
let jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
let user = { email: "prueba@prueba.com", password: "ThisIsNotATest" };
const secret_key = "Tut0r1al";

api.use(bodyParser.json());

// Routes
api.get('/prueba',(req,res)=>{
  res.json({"test":true});
});

api.get('/users', middleware ,(req,res)=>{
  res.json({"users":users});
});

api.route('/login')
  .post((req,res)=>{
    if(req.body && req.body.email == user.email && req.body.password == user.password){
      jwt.sign({ user: user }, secret_key, (err, token) => {
            res.status(200).json({ success: true, token: token });
      });
    }else{
      res.status(403).json({success:false,message:"User not valid"});
    }

  })
// End Routes
module.exports = api;
