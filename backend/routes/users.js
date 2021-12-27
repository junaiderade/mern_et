const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res)=>
{
    User.find()//this is a mongoose method to give a list of all users 
    .then(users => res.json(users))//returns users
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;