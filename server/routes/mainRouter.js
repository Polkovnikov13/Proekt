const { Router } = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require("../db/db");

const router = Router();

const AllData = sequelize.define('oks_2_0',{
  "NAME" : {
    type: Sequelize.STRING,
  },
  "Наименование Категории" : {
    type: Sequelize.STRING,
  },
  "Наименование ПодКатегории": {
    type: Sequelize.STRING,
  },
  "1_Всего" : {
    type: Sequelize.STRING,
  },
  "1_Строительство": {
    type: Sequelize.STRING,
  },
  "1_Построено" : {
    type: Sequelize.STRING,
  },
  "ID Подкатегории" : {
    type: Sequelize.STRING,
  },
  'ID Категории' : {
    type: Sequelize.STRING,
  },
},{
    schema: 'oks_gdb',
    tableName: 'oks_2_0',
    timestamps: false,
});

router.get('/v1', async (req, res) => {
  try {
  //   const examples = await AllData.findAll({
  //     raw: true,
  //     attributes: ["NAME",  "Наименование Категории", "Наименование ПодКатегории",
  //     "1_Всего","1_Строительство" ,"1_Построено" , "ID Подкатегории"],
  //     where: {
  //       "NAME" : "Российская Федерация"
  //     }
  //   });
  // console.log(examples.filter((el) => el['Наименование Категории'] === 'Все категории'))
   const examples = await AllData.findAll({
    raw: true,
    attributes: ["NAME",  "Наименование Категории", "Наименование ПодКатегории",
    "1_Всего","1_Строительство" ,"1_Построено" , "ID Подкатегории",'ID Категории'],
  });
    const data = {
      array1: examples,
    };
    res.json(data);
  } catch (error) {
    console.error('Error retrieving examples:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
