/* ==== MODULES ==== */
var express         = require('express');
var session         = require('express-session');
var app             = express();

var methodOverride  = require('method-override');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var path            = require('path');

var port            = process.env.PORT || 8080;

/* ==== TEMPLATE ==== */
app.set('views', path.join(__dirname + '/public', 'templates'));
app.set('view engine', 'html');
app.set('layout', 'layout');
app.enable('view cache');
app.engine('html', require('hogan-express'));

/* ==== STATIC SERVING ==== */
app.use(express.static(__dirname + '/public'));     

/* ==== CONFIG ==== */
app.use(morgan('dev'));                     // log every request to the console
app.use(cookieParser());                    // read cookies (needed for auth)
app.use(bodyParser());                      // get information from html forms
app.use(methodOverride());                  // simulate DELETE and PUT
app.use(flash());                           // use connect-flash for flash messages stored in session
app.use(session({ secret: 'shhh' }));       // session secret

require('./app/routes/routes.js')(app);     // routes

/* ==== START ==== */
app.listen(port);
console.log('Currency Converter started on ' + port);
