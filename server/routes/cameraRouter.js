const { Router } = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require("../db/db");
const { processUrls } = require('../utils/parseHtml');
const parseURL = require('../utils/changeUrl');
// const { createUrlsForAllCameras } = require('../utils/createUrls');

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
console.log('==============================')
console.log("Зашли в get /")
console.log('==============================')
  try {
    const cameras = await AllCameras.findAll({
      raw: true,
      attributes: ["id", "link", "working_camera","oks_code"],
    });
    const start = 0
    const end = 10
  const urlsToProcess = cameras
    .sort((a, b) => a.id - b.id)
    .slice(start, end)
    .map((el) => el.link);
  let camerasIds = cameras
    .sort((a, b) => a.id - b.id)
    .slice(start, end)
    .map((el) => el.id)
    camerasIds = camerasIds.map((camera) => ({ id: camera }))
    console.log('====================')
    console.log(urlsToProcess,camerasIds,'camerasIds')
    console.log('====================')
    console.log(urlsToProcess.length,camerasIds.length,'camerasIds')
    processUrls(urlsToProcess,camerasIds);
    // cameras = cameras.filter(camera => camera.link.startsWith("https://RT:1243@camera.fc-rsk.ru:8081")).slice(0,100);
   // cameras = cameras.filter(camera => camera.link.startsWith("http://")).slice(0,66);
    // cameras.sort((a, b)=> b.working_camera - a.working_camera)
    // cameras = cameras.slice(100,200).sort((a,b)=>a.id - b.id);
    // cameras.sort((a, b) => {
    //   const statusComparison = b.working_camera - a.working_camera;
    //   if (statusComparison === 0) {
    //     return a.id - b.id;
    //   }
    //   return statusComparison;
    // });
    res.json(cameras);
  } catch (error) {
    console.error('Error retrieving cameras:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/savelog', async (req, res) => {
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
  console.log("Loading")
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
    if(views2[0].link.startsWith('https://rtsp.me/embed/')){
      console.log('<===================>')
      const extractedURL = await parseURL(views2[0].link);
      // Заменяем "+hash.sub+" на Ga8fIYIKPsEk14_Iq-BI1w или IzQApTsiMyYuXb1c5GNznw
      const modifiedURL = extractedURL.replace(/\+hash\.sub\+/g, extractedURL.includes('ip=195.181.164.34') ? 'Ga8fIYIKPsEk14_Iq-BI1w' : 'IzQApTsiMyYuXb1c5GNznw');
      console.log('Modified URL:', modifiedURL);
      views2[0].n_url = modifiedURL.replace(/["]/g,'')
    }
    console.log(views2)
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

// createUrlsForAllCameras();
// const urlsToProcess = [
// "https://camera.rt.ru/sl/QGv9-82gi",
// "https://camera.rt.ru/sl/kEIshMdFb",
// "https://RT:1243@camera.fc-rsk.ru:8081/live/media/camera02/DeviceIpint.849/SourceEndpoint.video:0:0?format=mp4",
// "https://RT:1243@camera.fc-rsk.ru:8081/live/media/camera02/DeviceIpint.848/SourceEndpoint.video:0:0?format=mp4",
// ];




module.exports = router;


