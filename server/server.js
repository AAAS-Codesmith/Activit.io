const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const boredRouter = require('./routers/boredRouter.js')
const dbRouter = require('./routers/dbRouter.js');

// Server parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/activity', boredRouter);


app.use('/db', dbRouter);

// Catch all to redirect back to index.html (Login page)
app.use('*', (req, res) => res.redirect('/'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(`\u001b[1;31m ${errorObj.log}`);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(port, () => {
  console.log(`\u001b[1;35mServer listening at http://localhost:${port}`);
});

