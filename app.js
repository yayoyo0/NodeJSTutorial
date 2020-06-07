const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
const api = require("./api/api");
const users = require("./users/users");
const secret_key = "Tut0r1al";
const user = { email: "prueba@prueba.com", password: "ThisIsNotATest" };
const PORT = 1111;
const check = "/test";
// Add a connect listener
// io.of(check).on('connection', function(socket) {

//   console.log('Client connected.');
//   socket.on('message', function(socket, message) {
//     console.dir(socket, message);
//   });
//   socket.emit("reply",{"item-added": "ThisIsNotATest"});
//   // Disconnect listener
//   socket.on('disconnect', function() {
//       console.log('Client disconnected.');
//   });
// });

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

/**
Set Handlebars engine for the front End
**/
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "tutorial",
    secret: secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("tutorial");
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/secured");
  } else {
    next();
  }
};


/**
Set api Routes
**/
app.use("/api", api);

/**
Set the home route
**/
app.get("/", (req, res) => {
  res.render("index", { req: req.query });
});

app.route("/login")
  .get((req, res) => {
    res.render("login", { title: "Login", layout: "login" });
  })
  .post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    req.session.user = user;
    res.redirect("/secured");
  });

/**
Set a secure route as an example of sessions
**/
app.get("/secured", (req, res) => {
  res.render("secured");
});

// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.tutorial) {
        res.clearCookie('tutorial');
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

app.listen(PORT, () => {
  // console.log("server started on port: " + PORT);
});

module.exports = app;

