// import { Router } from 'express';
import { Router } from 'express';
import mongoose from "mongoose";
const  router = Router();
import Fav from "../model/fav";
import Joi from "@hapi/joi";


// router.get('/home', (req, res) => {
//     res.send("This is the homepage");
//     res.render('index', { title: 'Express' });
// });

// const validateData = (data) => {
//     const schema = Joi.object({
//         countryId: Joi.any(),
//         userId: Joi.any()
//     });
//     return schema.validate(data)
//     //   return validate(data, schema);
// }


router.post('/fav',async (req, res) => {
    await mongoose.connect('mongodb+srv://suryathombre:WoZYUSnBsgLjFTw4@cluster.ijno3qe.mongodb.net/favCart?retryWrites=true&writeConcern=majority');
    
    

    // if (error) return res.status(400).send(error.details[0].message);

    const favourite = new Fav({
        countryId: req.body.countryId,
        userId: req.body.userId,
    });

    const error = favourite.validateSync();
    if (error) return res.status(400).send(error.details[0].message);

    await favourite.save().then((res) => console.log(res));;
    res.send(favourite);
    });

router.get("/fav/:userId", async (req, res) => {
    await mongoose.connect('mongodb+srv://suryathombre:WoZYUSnBsgLjFTw4@cluster.ijno3qe.mongodb.net/favCart?retryWrites=true&writeConcern=majority');
    let db = mongoose.connection
    let collection = db.collection("countries");
    let results = await collection.find({})
      .limit(20)
      .toArray();
  
    res.send(results).status(200);
  });

export default router;