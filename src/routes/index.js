// import { Router } from 'express';
import { Router } from 'express';
const  router = Router();
import Country from "../model/countries.js";
import Joi from "@hapi/joi";
import db from "../auth/db.js";
import moment from 'moment';

// router.get('/home', (req, res) => {
//     res.send("This is the homepage");
//     res.render('index', { title: 'Express' });
// });

const validateData = (data) => {
    const schema = Joi.object({
        countryName: Joi.string().min(3).max(15).required(),
        language: Joi.string().min(3).max(15).required(),
        createdAt: Joi.date()
    });
    return schema.validate(data)
}

router.post('/addcountry',async (req, res) => {

    const { error } = validateData(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let today = moment().format('D MMM, YYYY');

    const country = new Country({
        countryName: req.body.countryName,
        language: req.body.language,
        createdAt: today
    });
    await country.save().then((res) => console.log(res));;
    res.send(country);
    });

router.get("/home", async (req, res) => {
    let collection = db.collection("countries");
    let results = await collection.find({})
      .limit(20)
      .toArray();
  
    res.send(results).status(200);
  });

export default router;