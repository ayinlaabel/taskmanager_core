const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

/**
 * @desc - Import mongoose model
 */
 const { List, Task, User} = require("../database/models");


router.post('/', (req, res, next)=>{
    const { email, password } = req.body;

    bcrypt.hash(password, 10).then(
        (hash) => {
            let newUser = new User({
                email,
                password: hash
            });

            newUser.save().then(
                user => {
                    res.send({ user });
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )

        }
    ).catch(
        err => {
            console.log(err);
        }
    )

})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({email}).then(
        user => {
            if (user){
                bcrypt.compare(password, user.password).then(
                    (result) => {
                        if(!result){
                            res.send({message: "Wrong password, try again."})
                        }else{
                            jwt.sign({userId: user._id}, 'my-secret-to-login', (err, token)=>{
                                if (err) throw err;

                                res.send({token, user})
                            })
                        }
                    }
                ).catch(
                    err => console.log(err)
                )
            }else{
                res.send({message: "User not found!"})
            }
        }
    )
})

module.exports = router;