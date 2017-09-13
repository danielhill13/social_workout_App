const   express         = require('express'),
        router          = express.Router()
        db           = require('../db');

//INDEX of ALL activities
router.get('/', function(req, res){
        db.query('SELECT * FROM activity', function(err, rows){
        if(err) {
                throw err;
        } else {
                obj = {activities : rows};
                res.render('activities', obj);
        }
})
})
//ADD page is for testing only.
router.get('/add', function(req, res){
        res.render('newactivity');
        })
//Need to add middleware for authentication
router.post('/', function(req, res){
        var response = [];
        if (
                req.body.title &&
                req.body.description
        ) {
                var     sunday = false,
                        monday = false,
                        tuesday = false,
                        wednesday = false,
                        thursday = false,
                        friday = false,
                        saturday = false;
                var     title = req.body.title,
                        description = req.body.description,
                        address = req.body.address,
                        city = req.body.city,
                        state = req.body.state,
                        zip = req.body.zip;
                if (req.body.Sunday){
                        sunday = true;
                }
                if (req.body.Monday){
                        monday = true;
                }
                if (req.body.Tuesday){
                        tuesday = true;
                }
                if (req.body.Wednesday){
                        wednesday = true;
                }
                if (req.body.thursday){
                        thursday = true;
                }
                if (req.body.Friday){
                        friday = true;
                }
                if (req.body.Saturday){
                        saturday = true;
                }
                var     starttime = req.body.starttime,
                        duration = req.body.duration
                // console.log(title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration)
                db.query("INSERT INTO activity (Title, Description, Address, City, State, Zip, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, StartTime, Duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration])
                } else {
                        console.log("You Must add a title and description");
                        res.redirect('/activity/add');
                }
})
//SHOW One Activity Details
router.get("/:id", function(req, res){
        db.query("SELECT * FROM activity where id = '" + req.params.id + "'",
        function(err, row){
                if(err) {
                        throw err;
                } else {
                        // console.log(row);
                        res.render('activity', {activity: row});
                }
        })
        })
//EDIT Page
router.get("/:id/edit", function(req, res){
        db.query("SELECT * FROM activity where id = '" + req.params.id + "'",
        function(err, row){
                if(err) {
                        throw err;
                } else {
                        res.render('activityedit', {activity: row});
                }
        })
})
//UPDATE Route
router.put('/:id', function(req, res){
        if (
                req.body.title &&
                req.body.description
        ) {
                var     sunday = false,
                        monday = false,
                        tuesday = false,
                        wednesday = false,
                        thursday = false,
                        friday = false,
                        saturday = false;
                var     title = req.body.title,
                        description = req.body.description,
                        address = req.body.address,
                        city = req.body.city,
                        state = req.body.state,
                        zip = req.body.zip;
                if (req.body.Sunday){
                        sunday = true;
                }
                if (req.body.Monday){
                        monday = true;
                }
                if (req.body.Tuesday){
                        tuesday = true;
                }
                if (req.body.Wednesday){
                        wednesday = true;
                }
                if (req.body.Thursday){
                        thursday = true;
                }
                if (req.body.Friday){
                        friday = true;
                }
                if (req.body.Saturday){
                        saturday = true;
                }
                var     starttime = req.body.starttime,
                        duration = req.body.duration;
        console.log(title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration);
                var updateQuery = "UPDATE activity SET Title = ?, Description = ?, Address = ?, City = ?, State = ?, Zip = ?, Sunday = ?, Monday = ?, Tuesday = ?, Wednesday = ?, Thursday = ?, Friday = ?, Saturday = ?, StartTime = ?, Duration = ? WHERE id = '"+req.params.id+"'";
                db.query(updateQuery, [title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration])
                res.redirect('/activity/'+req.params.id);
        } else  {
                console.log("You Must add a title and description");
                res.redirect('/activity/'+req.params.id);
        }
})
// var query = 'UPDATE employee SET profile_name = ?, phone =?, .. WHERE id=?';

// connection.query(query,[req.name,req.phone,...,req.id] function (error, result, rows, fields) {

module.exports = router;