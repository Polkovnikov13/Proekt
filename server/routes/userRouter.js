const express = require('express');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require("../db/db");


const router = express.Router();

const AllUsers = sequelize.define('users',{
  "id": {
    type: Sequelize.INTEGER, // Assuming your 'id' is of type INTEGER
    primaryKey: true, // Add this line to mark 'id' as the primary key
    autoIncrement: true, // If 'id' is an auto-incrementing primary key
  },
  "login" : {
    type: Sequelize.STRING,
  },
  "password": {
    type: Sequelize.STRING,
  },
},{
    schema: 'oks_gdb',
    tableName: 'users',
    timestamps: false,
});

router.post('/login', async (req, res) => {
    const userFront = await AllUsers.findAll({
    raw: true,
    attributes: ["id",  "login", "password"],
  });
   const { login, password } = req.body;
   if (login && password) {
    try {
      const user = await AllUsers.findOne({
        where: { login },
      });
      if (await bcrypt.compare(password, user.password)) {
        const sessionUser = JSON.parse(JSON.stringify(user));
        delete sessionUser.password;
        req.session.user = sessionUser;
        return res.json(sessionUser);
      }
      return res.sendStatus(401);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

// router.post('/check', (req, res) => {
//   if (req.session.user) {
//     // console.log(req.session.user);
//     return res.json(req.session.user);
//   }
//   return res.sendStatus(401);
// });

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

module.exports = router;
