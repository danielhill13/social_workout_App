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
                typeof req.body.title !== 'undefined' &&
                typeof req.body.description !== 'undefined'
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
                }
        // console.log(title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration)
        db.query("INSERT INTO activity (Title, Description, Address, City, State, Zip, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, StartTime, Duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration])
})
//SHOW One Activity Details
router.get("/:id", function(req, res){
        db.query("SELECT * FROM activity where id = '" + req.params.id + "'",
        function(err, row){
                if(err) {
                        throw err;
                } else {
                        // activity = JSON.stringify(row);
                        console.log(row);
                        res.render('activity', {activity: row});
                }
        })
        })




module.exports = router;