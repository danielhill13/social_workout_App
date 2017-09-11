const   http            = require('http'),
        express         = require('express'),
        mysql           = require('mysql'),
        parser          = require('body-parser'),
        indexRoutes     = require('./routes/index'),
        activityRoutes  = require('./routes/activity');
//Load environment variables
require('dotenv').config();


//Connect to database
const connection = mysql.createConnection({
    host        : process.env.MYSQLHOST,
    user        : process.env.MYSQLUSER,
    password    : process.env.MYSQLPASSWORD,
    database    : process.env.MYSQLDB
});

connection.connect(function(err){
    if(err) throw err
    console.log("You are connected to the database");
})

//Express setup
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));
app.set('port', process.env.PORT);

//Home route
app.get('/', function(req, res){
    res.send("Welcome to the social workout app homepage");
})

//This is the right syntax for insert
// connection.query("INSERT INTO user (FirstName, LastName, Username, email) VALUES ('Ricky', 'Bobby', 'ShakeNBake', 'ricky@bobby.com')")


app.use('activity', activityRoutes);
app.use(indexRoutes);
//Create Server
http.createServer(app).listen(app.get('port'), function(){
    console.log("Server listening on port " + app.get('port'));
})