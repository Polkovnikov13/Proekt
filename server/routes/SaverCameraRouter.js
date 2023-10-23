// const { Router } = require('express');
// const { Sequelize, Op } = require('sequelize');
// const sequelize = require("../db/db");



// const router = Router();

// const AllCameras = sequelize.define('svod_camera_oks_one',{
//   "id": {
//   type: Sequelize.INTEGER, 
//   primaryKey: true, 
//   autoIncrement: true,
// },
//   "Статус камеры": {
//     type: Sequelize.STRING,
//   },
//   "Код ОКС" : {
//     type: Sequelize.STRING,
//   },
//   "ссылка": {
//     type: Sequelize.STRING,
//   },
//   "url": {
//     type: Sequelize.STRING,
//   },
// },{
//     schema: 'oks_gdb',
//     tableName: 'svod_camera_oks_one',
//     timestamps: false,
// });

// router.get('/', async (req, res) => {
//   try {
//     const cameras = await AllCameras.findAll({
//       raw: true,
//       attributes: ["id", "Статус камеры", "Код ОКС", "ссылка"],
//       where: {
//         [Op.or]: [
//           {
//             ссылка: {
//               [Op.like]: '%fc-rsk.ru:8081/live/media%'
//             }
//           },
//           {
//             ссылка: {
//               [Op.like]: '%80.76.135.255%'
//             }
//           }
//         ]
//       }
//     });
//     cameras.sort((a, b) => {
//       const statusComparison = b["Статус камеры"] - a["Статус камеры"];
//       if (statusComparison === 0) {
//         return a.id - b.id;
//       }
//       return statusComparison;
//     });
//     // cameras = cameras.slice(0,10)
//     res.json(cameras);
//   } catch (error) {
//     console.error('Error retrieving cameras:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.post('/saveLog', async (req, res) => {
//   const { logContent } = req.body;
//   try {
//     const parsedLogData = JSON.parse(logContent); // Парсим входные данные
//     // Создаем массив обещаний для выполнения всех обновлений
//     console.log(parsedLogData.length);
//     const updatePromises = parsedLogData.map(async (item) => {
//       const { id, status } = item; // Получаем айдишник и статус из элемента массива
//       // Обновляем запись в базе данных на основе айдишника
//       const updatedCamera = await AllCameras.update(
//         { "Статус камеры": status, "url": `https://polkovnikovdeveloper.ru/camera/${id}` },
//         { where: { id } }
//       );
//       return updatedCamera;
//     });
//     // Ждем, пока все обновления завершатся
//     await Promise.all(updatePromises);
//     res.status(200).json({ message: 'Данные успешно обновлены в базе данных' });
//   } catch (error) {
//     console.error('Ошибка при обработке данных:', error);
//     res.status(500).json({ error: 'Произошла ошибка при обработке данных' });
//   }
// });

// router.get('/:id', async (req, res) => {
//    try {
//     const {id} = req.params; // Получаем id из параметра URL
//     const views2 = await AllCameras.findAll({
//       raw: true,
//       attributes: ["ссылка"],
//       where: {
//         "id": id
//       }
//     });
//     // console.log('!!!!!!!!!!!',views2)
//     res.json(views2);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Произошла ошибка' });
//   }
// });

// router.post('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const requestBody = req.body;
//     console.log(requestBody,'<===>',id);
//     if (!requestBody || !requestBody.message) {
//       res.status(400).json({ error: 'Отсутствует или некорректное тело запроса' });
//       return;
//     }
//     if (requestBody.message === 'Видео проигрывается') {
//       // Обновление статуса камеры на "Видео проигрывается"
//       await AllCameras.update(
//         { "Статус камеры": "1" },
//         { where: { id } }
//       );
//       res.status(200).json({ message: 'Статус камеры обновлен' });
//     } else if (requestBody.message === 'Видео НЕ проигрывается') {
//       await AllCameras.update(
//         { "Статус камеры": "0" },
//         { where: { id } }
//       );
//       res.status(200).json({ message: 'Статус камеры обновлен' });
//     } else {
//       res.status(400).json({ error: 'Неправильное значение для обновления' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// const createUrlsForAllCameras = async () => {
//   try {
//     const allCameras = await AllCameras.findAll({ raw: true });
//     const updatePromises = allCameras.map(async (camera) => {
//       const {id} = camera;
//       const {ссылка} = camera;
//       const url = ссылка.startsWith('http') ? `https://polkovnikovdeveloper.ru/camera/${id}` : '';

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
// // Вызов функции для создания и обновления URL для всех камер
// // createUrlsForAllCameras();




// module.exports = router;
