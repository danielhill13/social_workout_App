const   http            = require('http'),
        express         = require('express'),
        app             = express(),
        mysql           = require('mysql'),
        parser          = require('body-parser'),
        methodOverride  = require("method-override"),
        bcrypt          = require('bcryptjs'),
        moment          = require('moment'),
        indexRoutes     = require("./routes/index"),
        activityRoutes  = require("./routes/activity"),
        pool            = require("./db");
//Load environment variables
require('dotenv').config();

//remove prior to release!!!!!!!!!!!
app.set("view engine", "ejs");

//Connect to database
// db.connect(function(err){
//     if(err) throw err
//         console.log("You are connected to the database");
// })

//Express setup
app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.use(express.static('public'));


app.set('port', process.env.PORT);

//Home route
app.get('/', function(req, res){
        pool.query('SELECT * FROM activity', function(err, rows){
        if(err) {
            throw err;
        } else {
            res.render('index', {
                activities : rows,
            moment : moment 
            });
        }
})
})
app.post('/search', function(req, res){
        var sql = "SELECT * FROM ?? WHERE ?? LIKE ?";
        var inserts = ['activity', 'Title', req.body.search];
        sql = mysql.format(sql, inserts);
        pool.query(sql, function(err, rows){
                if(err) {
                        throw err;
                } else {
                        res.render('searchresults', {
                                activities: rows,
                                moment : moment
                        })
                }
        })
})
//This is the right syntax for insert
// connection.query("INSERT INTO user (FirstName, LastName, Username, email) VALUES ('Ricky', 'Bobby', 'ShakeNBake', 'ricky@bobby.com')")


app.use(indexRoutes);
app.use('/activity', activityRoutes);
//Create Server
http.createServer(app).listen(app.get('port'), function(){
    console.log("Server listening on port " + app.get('port'));
})