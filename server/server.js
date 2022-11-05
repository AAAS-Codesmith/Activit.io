const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/db.js');
const User = require('./db/mongo/UserModel.js');
const Team = require('./db/mongo/TeamModel.js');
const cors = require('cors');
const boredRouter = require('./routers/boredRouter.js')
const dbRouter = require('./routers/dbRouter.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// app.use('/api', (req, res) => res.json('Hello Team Wonderpuss Photogenicus!'));

app.use('/api/activity', boredRouter)

app.use('/db', dbRouter);
// Unknown route handler
app.use('*', (req, res) => res.sendStatus(404));


// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
