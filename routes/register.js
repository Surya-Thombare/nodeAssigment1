// var {Router} = require('express');
import { Router } from 'express';
var router = Router();
import mongoose from "mongoose";
import User from "../model/user";
// import pkg from 'joi';
// const { string, validate } = pkg;
import Joi from "@hapi/joi";



const validateUser = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        username: Joi.string().min(3).max(18).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(20).required(),
    });
    return schema.validate(data)
    //   return validate(data, schema);
}

router.post('/', async (req, res) => {
    await mongoose.connect('mongodb+srv://suryathombre:WoZYUSnBsgLjFTw4@cluster.ijno3qe.mongodb.net/favCart?retryWrites=true&writeConcern=majority');
    console.log(req.body);
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    await user.save().then((res) => console.log(res));;
    res.send(user);
});



export default router;
// module.exports = router;
