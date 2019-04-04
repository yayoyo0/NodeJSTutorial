var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
var bodyParser = require("body-parser");
var users = require('./users/users');
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/**
Set Handlebars engine for the front End
**/
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
/**
Set the first route for JSON Example
**/


app.get('/',(req,res)=>{
  res.json({"URL": req.query,"USERS":users});
})


app.listen(1111,()=>{
  console.log("server started on port: 1111")
});
