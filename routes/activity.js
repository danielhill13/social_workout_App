const   express         = require('express'),
        router          = express.Router(),
        pool            = require('../db'),
        moment          = require('moment');

//INDEX of ALL activities
router.get('/', function(req, res){
        pool.query('SELECT * FROM activity', function(err, rows){
        if(err) {
                throw err;
        } else {
                res.render('activities/allactivities', {
                        activities : rows,
                        moment  :  moment
                });
}
})
});
//ADD page is for testing only.
router.get('/add', function(req, res){
        res.render('activities/newactivity');
        })
//Need to add middleware for authentication
router.post('/', function(req, res){
        var response = [];
        if (
                req.body.title &&
                req.body.description
        ) {                
                var     
                        sunday = req.body.Sunday,
                        monday = req.body.Monday,
                        tuesday = req.body.Tuesday,
                        wednesday = req.body.Wednesday,
                        thursday = req.body.Thursday,
                        friday = req.body.Friday,
                        saturday = req.body.Saturday,
                        title = req.body.title,
                        description = req.body.description,
                        address = req.body.address,
                        city = req.body.city,
                        state = req.body.state,
                        zip = req.body.zip,
                        starttime = req.body.starttime,
                        duration = req.body.duration;
                if (zip == ''){
                        zip = null;
                };
                if (duration == ''){
                        duration = null;
                };
                if(sunday == 'on'){
                        sunday = 1;
                } else sunday = 0;
                if(monday == 'on'){
                        monday = 1;
                } else monday = 0;
                if(tuesday == 'on'){
                        tuesday = 1;
                } else tuesday = 0;
                if(wednesday == 'on'){
                        wednesday = 1;
                } else wednesday= 0;
                if(thursday== 'on'){
                        thursday = 1;
                } else thursday= 0;
                if(friday == 'on'){
                        friday = 1;
                } else friday = 0;
                if(saturday == 'on'){
                        saturday = 1;
                } else saturday= 0;
                var freshActivity = [title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration];

                pool.query("INSERT INTO activity (Title, Description, Address, City, State, Zip, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, StartTime, Duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                freshActivity, function(error, results, fields){
                        if (error) throw error;
                        res.redirect('/activity');      
                })
                } else {
                        console.log("You Must add a title and description");
                        res.redirect('/activity/add');
                }
})
//SHOW One Activity Details
router.get("/:id", function(req, res){
        pool.query("SELECT * FROM activity where id = '" + req.params.id + "'",
        function(err, row){
                if(err) {
                        throw err;
                } else {
                        // console.log(row);
                        res.render('activities/activity', {
                                activity: row,
                                moment : moment
                        });
                }
        })
        })
//EDIT Page
router.get("/:id/edit", function(req, res){
        pool.query("SELECT * FROM activity where id = '" + req.params.id + "'",
        function(err, row){
                if(err) {
                        throw err;
                } else {
                        res.render('activities/activityedit', {activity: row});
                }
        })
})
//UPDATE Route
router.put('/:id', function(req, res){
        if (
                req.body.title &&
                req.body.description
        ) {
                var     
                        sunday = req.body.Sunday,
                        monday = req.body.Monday,
                        tuesday = req.body.Tuesday,
                        wednesday = req.body.Wednesday,
                        thursday = req.body.Thursday,
                        friday = req.body.Friday,
                        saturday = req.body.Saturday,
                        title = req.body.title,
                        description = req.body.description,
                        address = req.body.address,
                        city = req.body.city,
                        state = req.body.state,
                        zip = req.body.zip,
                        starttime = req.body.starttime,
                        duration = req.body.duration;
                        if (zip == ''){
                                zip = null;
                        };
                        if (duration == ''){
                                duration = null;
                        };
                        if(sunday == 'on'){
                                sunday = 1;
                        } else sunday = 0;
                        if(monday == 'on'){
                                monday = 1;
                        } else monday = 0;
                        if(tuesday == 'on'){
                                tuesday = 1;
                        } else tuesday = 0;
                        if(wednesday == 'on'){
                                wednesday = 1;
                        } else wednesday= 0;
                        if(thursday== 'on'){
                                thursday = 1;
                        } else thursday= 0;
                        if(friday == 'on'){
                                friday = 1;
                        } else friday = 0;
                        if(saturday == 'on'){
                                saturday = 1;
                        } else saturday= 0;
                var freshActivity = [title, description, address, city, state, zip, sunday, monday, tuesday, wednesday, thursday, friday, saturday, starttime, duration];                
                var updateQuery = "UPDATE activity SET Title = ?, Description = ?, Address = ?, City = ?, State = ?, Zip = ?, Sunday = ?, Monday = ?, Tuesday = ?, Wednesday = ?, Thursday = ?, Friday = ?, Saturday = ?, StartTime = ?, Duration = ? WHERE id = '"+req.params.id+"'";

                pool.query(updateQuery, freshActivity, function(error, results, fields){
                        if (error) throw error;
                        res.redirect('/activity');
                        })
                } else  {
                        console.log("You Must add a title and description");
                        res.redirect('/activity');
                }
})
//DELETE ROUTE
router.delete("/:id",  function(req, res){
        pool.query("DELETE FROM activity WHERE id='"+req.params.id+"'", function(err){
                if (err) throw err;
                res.redirect('/activity');
        });
        
})
module.exports = router;