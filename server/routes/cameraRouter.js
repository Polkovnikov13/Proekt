const { Router } = require('express');
const { Sequelize } = require('sequelize');
const axios = require('axios')
const https = require('https');
const sequelize = require("../db/db");


const router = Router();
const AllCameras = sequelize.define('link_oks_utilita',{
  "id": {
  type: Sequelize.INTEGER, 
  primaryKey: true, 
  autoIncrement: true,
},
  "working_camera": {
    type: Sequelize.INTEGER,
  },
  "link": {
    type: Sequelize.STRING,
  },
  "url": {
    type: Sequelize.STRING,
  },
},{
    schema: 'oks_gdb',
    tableName: 'link_oks_utilita',
    timestamps: false,
});

router.get('/', async (req, res) => {
  try {
    const cameras = await AllCameras.findAll({
      raw: true,
      attributes: ["id", "link", "working_camera","oks_code"],
    });
    
    cameras.sort((a, b)=> b.working_camera - a.working_camera)
    // cameras = cameras.slice(800,900)
    cameras.sort((a, b) => {
      const statusComparison = b.working_camera - a.working_camera;
      if (statusComparison === 0) {
        return a.id - b.id;
      }
      return statusComparison;
    });
    // console.log(cameras)
    res.json(cameras);
  } catch (error) {
    console.error('Error retrieving cameras:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/saveLog', async (req, res) => {
  const { logContent } = req.body;
  try {
    const parsedLogData = JSON.parse(logContent); // Парсим входные данные
    // Создаем массив обещаний для выполнения всех обновлений
    console.log(parsedLogData.length);
    console.log(parsedLogData)
    const updatePromises = parsedLogData.map(async (item) => {
      const { id, status } = item; // Получаем айдишник и статус из элемента массива
      // Обновляем запись в базе данных на основе айдишника
      const updatedCamera = await AllCameras.update(
        { "working_camera": status},
        { where: { id } }
      );
      return updatedCamera;
    });
    // Ждем, пока все обновления завершатся
    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Данные успешно обновлены в базе данных' });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    res.status(500).json({ error: 'Произошла ошибка при обработке данных' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Получаем id из параметра URL
    const views2 = await AllCameras.findAll({
      raw: true,
      attributes: ["link"],
      where: {
        id
      }
    });
    console.log('!!!',views2[0].link)
    // Имя пользователя и пароль для аутентификации на удаленном сервере
    const username = 'RT';
    const password = '1243';
    // Опции для HTTP-запроса с аутентификацией
    const axiosOptions = {
      auth: {
        username,
        password
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Add this line
    };
    // Выполняем HTTP-запрос на удаленный сервер с аутентификацией
    const response = await axios.get(`${views2[0].link}`, axiosOptions);
    console.log('HTTP Response:', response);
    res.json(views2); // Отправляем данные на фронтенд
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});


router.post('/:id', async (req, res) => {
  try {
    console.log(req.params)
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
        { "working_camera": 1 },
        { where: { id } }
      );
      res.status(200).json({ message: 'Статус камеры обновлен' });
    } else if (requestBody.message === 'Видео НЕ проигрывается') {
      await AllCameras.update(
        {"working_camera": 0 },
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

// const createUrlsForAllCameras = async () => {
//   try {
//     const allCameras = await AllCameras.findAll({ raw: true });
//     const updatePromises = allCameras.map(async (camera) => {
//       const {id} = camera;
//       const {link} = camera;
//       const url = link.startsWith('http') ? `https://polkovnikovdeveloper.ru/camera/${id}` : link;

//       await AllCameras.update(
//         { "url": url },
//         { where: { id } }
//       );
//     });

//     await Promise.all(updatePromises);
//     console.log('URLs успешно созданы и обновлены для всех камер с условием.');
//   } catch (error) {
//     console.error('Произошла ошибка:', error);
//   }
// };
// createUrlsForAllCameras();

module.exports = router;


