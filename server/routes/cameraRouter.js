const { Router } = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require("../db/db");

const router = Router();

const AllCameras = sequelize.define('svod_camera_oks_one',{
  "id": {
  type: Sequelize.INTEGER, // Используйте INTEGER
  primaryKey: true, // Сделайте его первичным ключом
  autoIncrement: true, // Установите autoIncrement в true
},
  "Статус камеры": {
    type: Sequelize.STRING,
  },
  "Код ОКС" : {
    type: Sequelize.STRING,
  },
  "ссылка": {
    type: Sequelize.STRING,
  },
},{
    schema: 'oks_gdb',
    tableName: 'svod_camera_oks_one',
    timestamps: false,
});

router.get('/', async (req, res) => {
  try {
   const views = await AllCameras.findAll({
    raw: true,
    attributes: ["id","Статус камеры","Код ОКС", "ссылка"],
    where: {
         "Статус камеры": "1" 
      }
  })
    res.json(views);
  } catch (error) {
    console.error('Error retrieving examples:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
   try {
    const {id} = req.params; // Получаем id из параметра URL
    const views2 = await AllCameras.findAll({
      raw: true,
      attributes: ["ссылка"],
      where: {
        "id": id
      }
    });
    // console.log('!!!!!!!!!!!',views2)
    res.json(views2);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
    //console.log(requestBody,'<===>',id);
    if (!requestBody || !requestBody.message) {
      res.status(400).json({ error: 'Отсутствует или некорректное тело запроса' });
      return;
    }
    if (requestBody.message === 'Видео проигрывается') {
      // Обновление статуса камеры на "Видео проигрывается"
      await AllCameras.update(
        { "Статус камеры": "1" },
        { where: { id } }
      );
      res.status(200).json({ message: 'Статус камеры обновлен' });
    } else if (requestBody.message === 'Видео НЕ проигрывается') {
      await AllCameras.update(
        { "Статус камеры": "0" },
        { where: { id } }
      );
      res.status(200).json({ message: 'Статус камеры обновлен' });
    } else {
      res.status(400).json({ error: 'Неправильное значение для обновления' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;


