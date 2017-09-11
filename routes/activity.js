const   express         = require('express'),
        router          = express.Router();

//Add new activity
router.post('/activity/add', function(req, res){
        var response = [];

        if (
                typeof req.body.title !== 'undefined' &&
                typeof req.body.description !== 'undefined' &&
                typeof req.body.starttime !== 'undefined'
        ) {
                var     title = req.body.title,
                        description = req.body.description,
                        starttime = req.body.starttime;
        }
        connection.query("INSERT INTO")
})






module.exports = router;