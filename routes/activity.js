const   express         = require('express'),
        router          = express.Router();

//Add new activity

//NEW page is for testing only. Will remove and put in front end repo for actual release
router.get('/activity/add', function(req, res){
        res.render('../newactivity');
})

router.post('/activity/add', function(req, res){
        var response = [];

        if (
                typeof req.body.title !== 'undefined' &&
                typeof req.body.description !== 'undefined' &&
                typeof req.body.day !== 'undefined' &&
                typeof req.body.starttime !== 'undefined'
        ) {
                var     title = req.body.title,
                        description = req.body.description,
                        starttime = req.body.starttime,
                        address = req.body.address,
                        city = req.body.city,
                        state = req.body.state,
                        day = req.body.day,
                        starttime = req.body.starttime,
                        duration = req.body.duration,
                        created = Date.now;
        }
        connection.query("INSERT INTO activity (Created, Title, Description, Address, City, State, Zip, Day, StartTime, Duration) VALUES (created, title, description, address, city, state, zip, day, starttime, duration)")
})






module.exports = router;