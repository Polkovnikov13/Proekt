const puppeteer = require('puppeteer');
const { Router } = require('express');
const { Sequelize, Op } = require('sequelize');
const sequelize = require("../db/db"); // Подключение к базе данных
const RTfinder = require('../utils/RTfinder'); // Функция для проверки камер
const findKey = require('../utils/findKey');
const fetchAndLogPosterUrl = require('../utils/checkAvatarVideo');
const trassir = require('../utils/trassir');

const router = Router();

// Определение модели для работы с таблицей link_oks_utilita
const AllCameras = sequelize.define('link_oks_utilita', {
  "id": {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  "oks_code": {
    type: Sequelize.STRING,
  },
  "oks_name": {
    type: Sequelize.STRING,
  },
  "link": {
    type: Sequelize.STRING,
  },
  "master_camera": {
    type: Sequelize.INTEGER,
  },
  "working_camera": {
    type: Sequelize.INTEGER,
  },
  "url": {
    type: Sequelize.STRING,
  },
}, {
  schema: 'oks_gdb',
  tableName: 'link_oks_utilita',
  timestamps: false,
});



// Обработка Статусов камер https://trassir !!!! Не сделано!!!!
// router.get('/', async (req, res) => {
//   try {
//     let views = await AllCameras.findAll({
//       where: {
//         link: {
//           [Sequelize.Op.like]: 'https://ru.cloud.trassir%'
//         }
//       },
//       raw: true
//     });
//     views = views.slice(0,30)
//     console.log(views)
//     // Собираем все промисы для парсинга URL в массив
//     const parsePromises = views.map(async (oneElem) => {
//       const updatedElem = { ...oneElem }; // Создаем копию объекта
//       try {
//         const match = oneElem.link.match(/tube\/([^?]+)/);
//         const extractedValue = match ? match[1] : null;
//         console.log(extractedValue)
//         const parsedUrl = await trassir(extractedValue);
//           console.log(parsedUrl,'ASNWER!!!!!!!!!!!!!!', oneElem.link)
//         // Устанавливаем значение working_camera в зависимости от результата fetchAndLogPosterUrl
//         updatedElem.working_camera = parsedUrl === undefined ? 4 : 5;
//         updatedElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
//       } catch (error) {
//         console.error(`Error processing URL (${oneElem.link}):`, error.message);
//         updatedElem.working_camera = 0;
//       }
//       return updatedElem;
//     });

//     // Дожидаемся выполнения всех промисов и обновляем элементы
//      const updatedViews = await Promise.all(parsePromises);

//     // Сохраняем все изменения в базе данных
//     const savePromises = updatedViews.map(oneElem => AllCameras.update({
//       working_camera: oneElem.working_camera,
//       url: oneElem.url,
//     }, {
//       where: { id: oneElem.id }
//     }));
//     await Promise.all(savePromises);

//     // Отправляем ответ с обновленными данными
//        res.json(updatedViews);
//   } catch (error) {
//     console.error('Error retrieving examples:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Обработка Статусов камер https://trassir%



// Обработка Статусов камер https://rtsp.me/embed/%
// router.get('/', async (req, res) => {
//   try {
//     const views = await AllCameras.findAll({
//       where: {
//         link: {
//           [Sequelize.Op.like]: 'https://rtsp.me/embed/%'
//         }
//       },
//       raw: true
//     });

//     // Собираем все промисы для парсинга URL в массив
//     const parsePromises = views.map(async (oneElem) => {
//       const updatedElem = { ...oneElem }; // Создаем копию объекта
//       try {
//         const parsedUrl = await fetchAndLogPosterUrl(oneElem.link);

//         // Устанавливаем значение working_camera в зависимости от результата fetchAndLogPosterUrl
//         updatedElem.working_camera = parsedUrl === 'No working!!!' ? 0 : 1;
//         updatedElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
//       } catch (error) {
//         console.error(`Error processing URL (${oneElem.link}):`, error.message);
//         updatedElem.working_camera = 0;
//       }
//       return updatedElem;
//     });

//     // Дожидаемся выполнения всех промисов и обновляем элементы
//     const updatedViews = await Promise.all(parsePromises);

//     // Сохраняем все изменения в базе данных
//     const savePromises = updatedViews.map(oneElem => AllCameras.update({
//       working_camera: oneElem.working_camera,
//       url: oneElem.url,
//     }, {
//       where: { id: oneElem.id }
//     }));
//     await Promise.all(savePromises);

//     // Отправляем ответ с обновленными данными
//     res.json(updatedViews);
//   } catch (error) {
//     console.error('Error retrieving examples:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Обработка Статусов камер https://rtsp.me/embed/%


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Обработка Статусов камер https://lk-b2b.camera.rt.ru% И https://camera.rt.ru/sl%
// router.get('/', async (req, res) => {
//   try {
//     const views = await AllCameras.findAll({
//       where: {
//         [Op.or]: [
//           { link: { [Op.like]: 'https://lk-b2b.camera.rt.ru%' } },
//           { link: { [Op.like]: 'https://camera.rt.ru/sl%' } }
//         ]
//       },
//       raw: true
//     });

//     // Собираем все промисы для парсинга URL в массив
//     const parsePromises = views.map(async (oneElem) => {
//       const updatedElem = { ...oneElem }; // Создаем копию объекта
//       try {
//         const parsedUrl = await findKey(oneElem.link);

//         // Устанавливаем значение working_camera в зависимости от результата fetchAndLogPosterUrl
//         updatedElem.working_camera = parsedUrl === 'Не работает!!!' ? 0 : 1;
//         updatedElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
//       } catch (error) {
//         console.error(`Error processing URL (${oneElem.link}):`, error.message);
//         updatedElem.working_camera = 0;
//       }
//       return updatedElem;
//     });

//     // Дожидаемся выполнения всех промисов и обновляем элементы
//     const updatedViews = await Promise.all(parsePromises);

//     // Сохраняем все изменения в базе данных
//     const savePromises = updatedViews.map(oneElem => AllCameras.update({
//       working_camera: oneElem.working_camera,
//       url: oneElem.url,
//     }, {
//       where: { id: oneElem.id }
//     }));
//     await Promise.all(savePromises);

//     // Отправляем ответ с обновленными данными
//     res.json(updatedViews);
//   } catch (error) {
//     console.error('Error retrieving examples:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Обработка Статусов камер https://lk-b2b.camera.rt.ru% И https://camera.rt.ru/sl%
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Функция для обработки пакета ссылок RT:1243@camera.fc-rsk.ru:8081
// async function processBatch(browser, views) {
//   // Создаем массив промисов для проверки камер
//   const parsePromises = views.map(async (originalElem) => {
//     const oneElem = { ...originalElem };

//     try {
//       // Вызываем функцию RTfinder для проверки камеры по ссылке
//       const parsedUrl = await RTfinder(browser, oneElem.link);
//       console.log(parsedUrl, '!!!');
//       if (parsedUrl.length === 0) {
//         oneElem.working_camera = 0;
//         oneElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
//       } else {
//         oneElem.working_camera = 1;
//         oneElem.url = oneElem.link;
//       }
//     } catch (error) {
//       console.error(`Error processing URL (${oneElem.link}):`, error.message);
//       oneElem.working_camera = 0;
//       oneElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
//     }

//     return oneElem;
//   });

//   // Дожидаемся выполнения всех промисов и получаем обновленные элементы
//   const updatedViews = await Promise.all(parsePromises);

//   // Создаем массив промисов для обновления записей в базе данных
//   const savePromises = updatedViews.map(oneElem => 
//     AllCameras.update({
//       working_camera: oneElem.working_camera,
//       url: oneElem.url,
//     }, {
//       where: { id: oneElem.id }
//     })
//   );

//   // Дожидаемся выполнения всех промисов обновления в базе данных
//   await Promise.all(savePromises);

//   return updatedViews;
// }
// Функция для обработки всех ссылок пакетами
// async function processAllInBatches(browser, views, batchSize = 35) {
//   // Создаем массив индексов для разбивки на части
//   const batches = Array.from({ length: Math.ceil(views.length / batchSize) }, (_, i) => views.slice(i * batchSize, (i + 1) * batchSize));

//   // Обрабатываем каждую часть последовательно
//   return batches.reduce(async (accPromise, batch) => {
//     const acc = await accPromise;
//     const processedBatch = await processBatch(browser, batch);
//     return acc.concat(processedBatch);
//   }, Promise.resolve([]));
// }
// Обработчик GET запроса на корневой URL
// router.get('/', async (req, res) => {
//   let browser;
//   try {
//     // Находим все записи, удовлетворяющие условию поиска ссылок на камеры
//     const views = await AllCameras.findAll({
//       where: {
//         link: {
//           [Sequelize.Op.like]: 'https://RT:1243@camera.fc-rsk.ru:8081%'
//         }
//       },
//       raw: true // Получаем данные в виде обычного JS объекта
//     });

//     // Открываем браузер один раз перед началом обработки
//     browser = await puppeteer.launch();

//     // Обрабатываем все ссылки пакетами по 35
//     const updatedViews = await processAllInBatches(browser, views, 35);

//     // Отправляем ответ с обновленными данными
//     res.json(updatedViews);
//   } catch (error) {
//     console.error('Error retrieving cameras:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   } finally {
//     // Закрываем браузер после завершения всех операций
//     if (browser) {
//       await browser.close();
//     }
//   }
// });
// ===> Функция для обработки пакета ссылок RT:1243@camera.fc-rsk.ru:8081
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Ставим всем в url => polkovnikovDeveloper
// router.get('/', async (req, res) => {
//   try {
//     const views = await AllCameras.findAll({
//       raw: true
//     });
      
//     // Создаем массив промисов для обновления записей
//     const updatePromises = views.map(view => {
//       let newUrl;

//       // Проверяем наличие "autostart=false" в поле link
//       if (view.link && view.link.includes('autostart=false')) {
//         // Заменяем "autostart=false" на "autostart=true"
//         newUrl = view.link.replace('autostart=false', 'autostart=true');
//       } else if (view.link && view.link.includes('autoplay=0')) {
//         // Заменяем "autoplay=0" на "autoplay=1"
//         newUrl = view.link.replace('autoplay=0', 'autoplay=1');
//       } else if ((view.link && view.link.includes('enpv.ru')) || (view.link && !view.link.includes('http'))) {
//         // Оставляем link без изменений
//         newUrl = view.link;
//       } else {
//         // Иначе задаем URL с включением ID записи
//         newUrl = `https://polkovnikovdeveloper.ru/camera/${view.id}`;
//       }

//       // Возвращаем промис обновления записи
//       return AllCameras.update(
//         { url: newUrl },
//         { where: { id: view.id } }
//       );
//     });

//     // Дожидаемся выполнения всех обновлений
//     await Promise.all(updatePromises);

//     console.log('Все записи обновлены успешно.');
//     res.status(200).send('Все записи обновлены успешно.');
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Произошла ошибка при обновлении записей.');
//   }
// });
// Ставим всем в url => polkovnikovDeveloper



// ===> Создать новую запись
// router.get('/', async (req, res) => {
//   try {
//     const newCameraData = {
//       oks_code: '317654101001220001',
//       oks_name: 'Строительство общеобразовательной школы по ул. Благовещенской в г. Калининграде',
//       link: 'https://www.klgd.ru/activity/construction/reconstruction/streams_building/school11.php',
//       master_camera: 0,
//       working_camera: 0,
//       url: 'new'
//     };
//       await AllCameras.create(newCameraData);
//   } catch (error) {
//     console.log(error);
//   }
// })

module.exports = router;
