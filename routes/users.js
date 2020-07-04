var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt');
const {createAccessToken, createRefreshToken} = require('../src/tokens');


//TODO: Get all users from database
//Get all users
router.get('/', function (req, res, next) {
    db(`SELECT * FROM users`)
        .then(result => {
            console.log(result.data.length);
            res.status(200).send(result.data)
        })
        .catch(err => res.status(500).send(err.message))
});

//TODO: Register user (save to database)
router.post('/register', async function (req, res){
    db(`select * from users where email = '${req.body.email}';`)
        .then(async result => {
            if(result.data.length > 0){
                // res.status(400).send('A user with this email already exists');
                throw new Error("A user with this email already exists");
            }else{
                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    db(`INSERT INTO users(name, email, password) VALUES('${req.body.name}', '${req.body.email}', '${hashedPassword}');`)
                        .then(result => {
                            res.status(201).send(result.data)
                        })
                        .catch(err => res.status(500).send(err.message))
                }catch (err) {
                    res.status(500).send(err.message);
                }
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});


//TODO: Login a user
router.post('/login', async function (req, res){
    let user = null;
    // find is user is in database and store user object in 'user' variable
    await db(`SELECT * FROM users where email = '${req.body.email}';`)
        .then(result => {
            if(result.data.length > 0){
                user = result.data[0];
                // console.log(`User from if-statement ${user}`);
            }else{
                // res.status(400).send("Cannot find user");
                throw new Error("User does not exist");
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
    // if user exists....
    try {
        // Check if the password entered is correct
        // console.log(`User from try-catch ${user}`);
        if (await bcrypt.compare(req.body.password, user.password)){
            // if password is correct, create refresh and access tokens
            res.status(200).send("Authenticated");
        }else{
            //if wrong password, throw an error
            // res.status(400).send("Wrong Password");
            throw new Error("Wrong password");
        }
    }catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;