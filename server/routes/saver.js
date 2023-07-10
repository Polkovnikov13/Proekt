const { Router } = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('../db');


const router = Router();

const Tmp = sequelize.define('spr_object_type', {
   id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
     },
     object_type_name: {
     type: Sequelize.STRING,
     allowNull: false,
   },
 }, {
   schema: 'oks_gdb',
   tableName: 'spr_object_type',
   timestamps: false,
 });

 router.get('/', async (req, res) => {
   try {
     const examples = await Tmp.findAll({
       raw: true,
       attributes: {
         exclude: [
           'updatedAt', 'createdAt',
         ],
       },
     });
     console.log(examples);
     res.json(examples);
   } catch (error) {
     console.error('Error retrieving examples:', error.message);
     res.status(500).json({ error: 'Internal server error' });
   }
 });


//  const Tmp = sequelize.define('oks_1_0', {
//   "ID Категории/Вид объекта": {
//     type: Sequelize.INTEGER,
//   },
//   "Parent_ID": {
//     type: Sequelize.STRING,
//   },
//   "Наименование Категории/Вид объект": {
//     type: Sequelize.STRING,
//   },
//   "2_Запланировано": {
//     type: Sequelize.STRING,
//   },
//   "2_Построено": {
//     type: Sequelize.STRING,
//   },
//   "2_Строится": {
//     type: Sequelize.STRING,
//   },
//   "4_Федеральный бюджет": {
//     type: Sequelize.STRING,
//   },
//   "4_Региональный бюджет": {
//     type: Sequelize.STRING,
//   },
// }, {
//   schema: 'oks_gdb',
//   tableName: 'oks_1_0',
//   timestamps: false,
// });

// router.get('/', async (req, res) => {
//   try {
//     const examples = await Tmp.findAll({
//       raw: true,
//       attributes: [ "ID Категории/Вид объекта", "Parent_ID","Наименование Категории/Вид объект","2_Запланировано","2_Построено","2_Строится","4_Федеральный бюджет",
//       "4_Региональный бюджет"],
//     });
//     res.json(examples);
//   } catch (error) {
//     console.error('Error retrieving examples:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;