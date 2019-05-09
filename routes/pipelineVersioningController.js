var express = require('express');
var router = express.Router();
var request = require("request");
var GitHub = require('github-api');
var gh = new GitHub({
    username: 'thealitahir431',
    password: 'punjabf13'
    /* also acceptable:
       token: 'MY_OAUTH_TOKEN'
     */
});

router.get('/', function (req, res) {
    const me = gh.getUser();
    console.log(me);
    me.listNotification(function (err, notifcations) {
        console.log(err);
        console.log(notifcations);
        res.send(notifcations)
    });
});


module.exports = router;