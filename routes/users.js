var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require('../src/tokens');
const { isAuth } = require('../src/isAuth');
const {verify} = require('jsonwebtoken');
// var cookieParser = require('cookie-parser');
// router.use(cookieParser());


// Get all users from database
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
    // Check if user exists
    db(`select * from users where email = '${req.body.email}';`)
        .then(async result => {
            // if user exist, send an error message
            if(result.data.length > 0){
                // res.status(400).send('A user with this email already exists');
                throw new Error("A user with this email already exists");
            } // if user doesn't exist....
            else{
                try {
                    // hash the password
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    // insert into user database
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
    // find if user exists...
    await db(`SELECT * FROM users where email = '${req.body.email}';`)
        .then(result => {
            // if user exists, store user object in 'user' variable
            if(result.data.length > 0){
                user = result.data[0];
                // console.log(`User from if-statement ${user}`);
            } // if user doesn'' exist, send error message
            else{
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
            const accessToken = createAccessToken(user.id);
            const refreshToken = createRefreshToken(user.id);

            // put the refresh token in the database
            await db(`UPDATE users SET refresh_token='${refreshToken}' WHERE id=${user.id};`)
                .then(result => {
                    // send token. Refresh token as a cookie and access token as regular json response
                    sendRefreshToken(res, refreshToken);
                    sendAccessToken(res, req, accessToken);
                })
                .catch(err => {
                    res.status(500).send(err.message);
                })
        }else{
            //if wrong password, throw an error
            // res.status(400).send("Wrong Password");
            throw new Error("Wrong password");
        }
    }catch (err) {
        res.status(500).send(err.message);
    }
});

//TODO: Logout a user
router.post('/logout', (req, res) => {
   res.clearCookie('refreshToken', {path: '/refresh_token'});
    return res.send({
        message: 'Logged Out'
    })
});


//TODO: Setup a protected route
router.post('/protected', async (req, res) => {
   try{
       const userId = isAuth(req);
       if (userId !== null){
           res.send({
               data: 'This is protected data.'
           })
       }
   } catch(err){
       res.status(500).send(`Error: ${err.message}`);
   }
});

//TODO: Get a new access token with a refresh token
router.post('/refresh_token', async (req, res) => {
    // Get refesh token from the cookie of the request
    const token = req.cookies.refreshToken;
    console.log(`REFRESH TOKEN: ${token}`);
    // if there isn't a token in the request cookie, return an empty access token
    if(!token) return res.send({ accessToken: `${token}`});
    // We have a token, let's verify it!
    let payload = null;
    try{
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    }catch (err){
        return res.send({accessToken: ''});
    }
    console.log(`PAYLOAD IS ${payload.userID}`);
    // Token is valid, check if user exists
    let user = null;
    await db(`SELECT * FROM users where id = '${payload.userID}';`)
        .then(result => {
            // if user exists, store user object in 'user' variable
            if(result.data.length > 0){
                user = result.data[0];
                console.log(`USER IS: ${user.name}`);
            }else{
                // console.log("in else statement")
                return res.send({accessToken: ''});
            }
        })
        .catch(err => {
            // console.log("in catch statement")
            return res.send({accessToken: ''});
        });
    console.log(`USER REFRESH TOKEN: ${user.refresh_token}`);
    console.log(`COOKIE REFRESH TOKEN: ${token}`);
    if(user.refresh_token !== token) return res.send({accessToken: ''});
    // Token exists, create new Refresh and Access Tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    console.log(`USER ID IS: ${user.id}`);
    console.log(`REFRESH TOKEN IS: ${refreshToken}`);
    // put new refresh token in the database
    await db(`UPDATE users SET refresh_token='${refreshToken}' WHERE id=${user.id};`)
        .then(result => {
            console.log("After UPDATE query")
            // send token. Refresh token as a cookie and access token as regular json response
            sendRefreshToken(res, refreshToken);
            return res.send({accessToken});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err.message);
        })
});

module.exports = router;