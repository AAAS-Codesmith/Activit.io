const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/db.js');
const User = require('./db/mongo/UserModel.js');
const Team = require('./db/mongo/TeamModel.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', (req, res) => res.json('Hello Team Wonderpuss Photogenicus!'));









app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
