const { Router } = require('express');
const { Sequelize, Op } = require('sequelize');
const sequelize = require("../db/db");

const router = Router();

const AllCameras = sequelize.define('svod_camera_oks_one',{
  "id": {
  type: Sequelize.INTEGER, 
  primaryKey: true, 
  autoIncrement: true,
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
      attributes: ["id", "Статус камеры", "Код ОКС", "ссылка"],
    where: {
        ссылка: {
          [Op.like]: '%fc-rsk.ru:8081/live/media%'
        }
      }
    });
    views.sort((a, b) => {
      const statusComparison = b["Статус камеры"] - a["Статус камеры"];
      if (statusComparison === 0) {
        return a.id - b.id;
      }
      return statusComparison;
    });
    res.json(views);
  } catch (error) {
    console.error('Error retrieving examples:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
   try {
    const {id} = req.params; // Получаем id из параметра URL
    console.log(id,"IDDDDDDDDDDDDDDDD")
    const views2 = await AllCameras.findAll({
      raw: true,
      attributes: ["ссылка"],
      where: {
        "id": id
      }
    });
    console.log('!!!!!!!!!!!',views2)
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
    console.log(requestBody,'<===>',id);
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
