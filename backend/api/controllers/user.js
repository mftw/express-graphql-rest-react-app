const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../lib/db');
const { sanitizeIncomingValue, getNewUserId } = db;

exports.user_signup = (req, res, next) => {
    const { email, password, username } = req.body;

    if(!req.body) {
        return res.status(400).json({message: 'only json'})
    }
    if(!email || !password || !username) {
        // console.log('æasldkfjsldkfj')
        console.log(email, password, username)
        return res.status(400).json({message: 'insufficient information for user signup'})
    }

    const checkEmail = db.get('users')
                        .find({email: email})
                        .value();
    
    if(checkEmail) {
        return res.status(400).json({message: 'Email already exists'});
    } else {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                const userObj = {
                    id: getNewUserId(),
                    email: sanitizeIncomingValue(email.toLowerCase()),
                    username: sanitizeIncomingValue(username),
                    password: hash,
                }

                db.get('users')
                .push(userObj)
                .last()
                .write();
                
                const responseObj = {
                    id: userObj.id,
                    email: userObj.email,
                    username: userObj.username
                }

                return res.status(200).json(responseObj)
            }
        })
    }
};

exports.user_login = (req, res, next) => {
    const { email, password } = req.body;
    // const incomingPassword = password;
    // console.log(req.body)


    if(!email || !password) {
        return res.status(401).json({message: 'Insufficient login information'});
    }

    const user = db.get('users')
                    .find({ email: email.toLowerCase() })
                    .value();
    
    const failedMessage = {
        message: 'login failed'
    }

    if(!user) {
        console.log(`User ${email} not found request from ${req.ip}`)
        return res.status(401).json(failedMessage);
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) {
                return res.status(401).json(failedMessage);
            }

            if (result) {
                const tokenInfo = {
                    email: user.email,
                    userId: user.id,
                    username: user.username
                }

                if(user.superuser) {
                    tokenInfo.superuser = true;
                }

                const token = jwt.sign(
                    tokenInfo,
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "1h"
                    }
                );
                
                // const token = jwt.sign(
                //     {
                //         email: user.email,
                //         userId: user.id
                //     },
                //     process.env.JWT_KEY, 
                //     {
                //         expiresIn: "1h"
                //     }
                // );

                console.log(`User ${user.email} with id ${user.id} successfully logged in`)
                return res.status(200).json({
                    message: "Authentication successful",
                    token: token,
                    userId: user.id,
                });
            }
            console.log(`Wrond password for user ${email} request from ${req.ip}`)
            return res.status(401).json(failedMessage);
        })
    }
};

exports.user_delete = (req, res, next) => {
    // const { userId } = req.body;
    const { userId } = req.params;
    const { userData } = req;

    if(!userId) {
        return res.status(400).json({message: 'failed to delete user'})
    }

    const user = db.get('users')
                    .find({ id: userId })
                    .value();

    // Fail request if no user is found or the userid and token doesn't match
    if(!user || (userId !== userData.userId)) {
        if(!db.verifySuperuser(userId)) {
            return res.status(400).json({message: 'failed to delete user'})
        }
    } else {
        db.get('users')
        .remove({id: userId})
        .write();
        return res.status(200).json({message: `user with id: ${userId} deleted successfully`})
    }
};

// TODO: Make passwords resetable
