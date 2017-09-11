const   http            = require('http'),
        express         = require('express'),
        mysql           = require('mysql'),
        parser          = require('body-parser');

//Load environment variables
require('dotenv').config();


//Connect to database
const connection = mysql.createConnection({
    host        : process.env.MYSQLHOST,
    user        : process.env.MYSQLUSER,
    password    : process.env.MYSQLPASSWORD,
    database    : process.env.MYSQLDB
});
try {
    connection.connect();
} catch(e) {
    console.log("Database Connection Failed:" + e);
}

//Express setup
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));
app.set('port', process.env.PORT) || 3000;

//Home route
app.get('/', function(req, res){
    res.send("Welcome to the social workout app homepage");
})

//Create Server
http.createServer(app).listen(app.get('port'), function(){
    console.log("Server listening on port " + app.get('port'));
})