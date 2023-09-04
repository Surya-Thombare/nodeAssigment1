import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import path from 'path';
import {InitiateMongoServer} from "./auth/db.js";

import indexRouter from './routes/index.js';
import registerUser from './routes/register.js';
// const loginUser = require('./routes/user/login');
import Fav from './routes/fav.js'
import health from "./routes/health.js";


let app = express();



const port = 5000

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

InitiateMongoServer();

app.use("/", health)
app.use('/', indexRouter);
app.use('/register', registerUser);
app.use('/', Fav)
// app.use('/login', loginUser);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, (err) => {
    if (err) throw err;
  console.log(`Example app listening on port ${port}`)
})

export default app;
