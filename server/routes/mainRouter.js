const { Router } = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require("../db/db");

const router = Router();

const Tmp = sequelize.define('oks_1_0', {
  "ID Категории/Вид объекта": {
    type: Sequelize.INTEGER,
  },
  "Parent_ID": {
    type: Sequelize.STRING,
  },
  "Наименование Категории/Вид объект": {
    type: Sequelize.STRING,
  },
  "2_Запланировано": {
    type: Sequelize.STRING,
  },
  "2_Построено": {
    type: Sequelize.STRING,
  },
  "2_Строится": {
    type: Sequelize.STRING,
  },
  "4_Федеральный бюджет": {
    type: Sequelize.STRING,
  },
  "4_Региональный бюджет": {
    type: Sequelize.STRING,
  },
  // "4_Софинансирование": {
  //   type: Sequelize.STRING,
  // },
  // "4_Инвестиции": {
  //   type: Sequelize.STRING,
  // },
}, {
  schema: 'oks_gdb',
  tableName: 'oks_1_0',
  timestamps: false,
});


const Regions = sequelize.define('spr_region', {
  "region_short_name": {
    type: Sequelize.STRING,
  },
  "federal_district": {
    type: Sequelize.STRING,
  },
}, {
  schema: 'oks_gdb',
  tableName: 'spr_region',
  timestamps: false,
});

// const Tmp = sequelize.define('oks_2_0', {
//   "NAME": {
//     type: Sequelize.INTEGER,
//   },
//   "Столица региона": {
//     type: Sequelize.STRING,
//   },
//   "CODE_AKADEMIA": {
//     type: Sequelize.STRING,
//   },
//   "Наименование Категории": {
//     type: Sequelize.STRING,
//   },
// }, {
//   schema: 'oks_gdb',
//   tableName: 'oks_2_0',
//   timestamps: false,
// });

// attributes: [ "NAME", "Столица региона","CODE_AKADEMIA",  "Наименование Категории"],

router.get('/', async (req, res) => {
  try {
    const examples = await Tmp.findAll({
      raw: true,
      attributes: [ "ID Категории/Вид объекта", "Parent_ID","Наименование Категории/Вид объект",  "2_Запланировано","2_Построено","2_Строится","4_Федеральный бюджет","4_Региональный бюджет"],
    });
    const examplesReg = await Regions.findAll({
      raw: true,
    });
    const data = {
      array1: examples,
      array2: examplesReg
    };
    res.json(data);
     // console.log(data.array2)
  } catch (error) {
    console.error('Error retrieving examples:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;