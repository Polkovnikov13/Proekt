// /* eslint-disable no-await-in-loop */
// /* eslint-disable import/no-extraneous-dependencies */
// const puppeteer = require('puppeteer');
// const { Sequelize } = require('sequelize');
// const sequelize = require("../db/db");

// const AllCameras = sequelize.define('link_oks_utilita', {
//   "id": {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   "oks_code":{
//     type: Sequelize.STRING,
//   },
//   "oks_name":{
//     type: Sequelize.STRING,
//   },
//   "master_camera":{
//     type: Sequelize.STRING,
//   },
//   "working_camera": {
//     type: Sequelize.INTEGER,
//   },
//   "link": {
//     type: Sequelize.STRING,
//   },
//   "url": {
//     type: Sequelize.STRING,
//   },
// }, {
//   schema: 'oks_gdb',
//   tableName: 'link_oks_utilita',
//   timestamps: false,
// });

// // Импортируйте необходимые модули и настройте модель Sequelize

// async function processUrls(urls, cameras) {
//   const browser = await puppeteer.launch();
//   const resultArray = [];

//   try {
//     const promises = urls.map(async (url, index) => {
//       const page = await browser.newPage();
//       let mediaElements;

//       try {
//     //    if(url.startsWith('htstp://')) {
//     //     console.log('===> https <===')
//     //       const cameraId = cameras[index].id; 
//     //        await AllCameras.update(
//     //        { working_camera: 0, url },
//     //        { where: { id: cameraId } }
//     // );
//     // console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//     // return ['http']
//      //   }
//         if(url.startsWith('https://stream.telko.ru/') || url.includes('//185.12.68.239:555')) {
//         console.log('asdasdasdasdasdasdasdasd')
//           const cameraId = cameras[index].id; 
//            await AllCameras.update(
//            { working_camera: 1, url },
//            { where: { id: cameraId } }
//     );
//     console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//     return ['stream']
//         }


//         if (!url.startsWith("http") || url.startsWith("https://vk.com") || url.startsWith("https://www.youtube.com")|| url.startsWith("https://youtu")) {
//           // Обработка случая, когда URL не является допустимым
//           const cameraId = cameras[index].id;
//           await AllCameras.update(
//             { working_camera: 0, url },
//             { where: { id: cameraId } }
//           );
//           console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//           return [];
//         }


// if (url.includes("autostart")) {
//   const cameraId = cameras[index].id;
//   // Проверка, установлен ли уже "autostart" в значение true
//   if (!url.includes("autostart=true")) {
//     // Если "autostart" равен false или отсутствует, обновите URL
//     const updatedUrl = url.replace(/autostart=false/, 'autostart=true');
//     // Обновление базы данных новым URL
//     await AllCameras.update(
//       { working_camera: 1, url: updatedUrl },
//       { where: { id: cameraId } }
//     );
//     console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//   }
//   return ['autostart'];
// }

// if (url.includes("autoplay")) {
//   const cameraId = cameras[index].id;
//   // Проверка, установлен ли уже "autoplay" в значение 1
//   if (!url.includes("autoplay=1")) {
//     // Если "autoplay" равен 0 или отсутствует, обновите URL
//     const updatedUrl = url.replace(/autoplay=0/, 'autoplay=1');
//     // Обновление базы данных новым URL
//     await AllCameras.update(
//       { working_camera: 1, url: updatedUrl },
//       { where: { id: cameraId } }
//     );
//     console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//   }
//   return ['autoplay'];
// }


//         if (url !== undefined) {
//           await page.goto(url, { waitUntil: 'networkidle2' });

//           mediaElements = await page.$$eval('video, iframe, source', elements => elements.map(element => element.src));

//           if (mediaElements.length === 0 || mediaElements.every(element => element === '')) {
//             // Обработка случая, когда медиа-элементы пусты
//             const cameraId = cameras[index].id;
//             await AllCameras.update(
//               { working_camera: 0, url: `https://polkovnikovdeveloper.ru/camera/${cameraId}` },
//               { where: { id: cameraId } }
//             );
//             console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//           }

//             if (mediaElements.length === 1 && mediaElements[0] !== '' && !mediaElements[0].includes('mlsonline.tv')) {
//             // Обработка случая, когда медиа-элементы пусты
//             const cameraId = cameras[index].id;
//             await AllCameras.update(
//               { working_camera: 0, url: `${mediaElements[0]}` },
//               { where: { id: cameraId } }
//             );
//             console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//           } else if(mediaElements[0].includes('mlsonline.tv')) {
//             const cameraId = cameras[index].id;
//             await AllCameras.update(
//               { working_camera: 1, url: `${mediaElements[0]}` },
//               { where: { id: cameraId } }
//             );
//             console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//           }

//            if (mediaElements.length === 2 && mediaElements[0] === '' && !mediaElements[1].startsWith('https://RT:1243@camera.fc-rsk.ru')) {
//            console.log('<========================================================================================>')
//             const cameraId = cameras[index].id;
//             console.log(cameraId,'cameraId',mediaElements[1])
//             await AllCameras.update(
//           { working_camera: 0, url: `${mediaElements[1]}` },
//           { where: { id: cameraId } }
//           );
//           console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
          
//            }


//          if (mediaElements.length > 1 && mediaElements[0] !== '' && !mediaElements[1].startsWith('https://RT:1243@camera.fc-rsk.ru')) {
//   // Обработка случая, когда выполняется конкретное условие для первого элемента
//           const cameraId = cameras[index].id;
//             await AllCameras.update(
//           { working_camera: 0, url: `${mediaElements[0]}` },
//           { where: { id: cameraId } }
//           );
//           console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//   // Создание новой записи для второго элемента
//   const originalCameraFromBd = await AllCameras.findByPk(cameraId);
//   for (let i = 1; i < mediaElements.length; i+=1) {
//   if (mediaElements[i] !== '') {
//   const cleanedUrl = mediaElements[i].startsWith('blob:') ? mediaElements[i].replace('blob:', '') : mediaElements[i];
//     await AllCameras.create({
//       oks_code: originalCameraFromBd.oks_code || 'fix it',
//       oks_name: originalCameraFromBd.oks_name || 'fix it',
//       link: originalCameraFromBd.link || 'fix it', // Логика для link
//       master_camera: originalCameraFromBd.master_camera,
//       working_camera: 0,
//       url: cleanedUrl,
//     });
//     console.log(`Создана новая запись в базе данных для ${i + 1}-го элемента`);
//   }
// }
// }
//           if (mediaElements.length === 2 && mediaElements[1].startsWith('https://RT:1243@camera.fc-rsk.ru')) {
//             // Обработка случая, когда выполняется конкретное условие
//             console.log('RT камеры')
//             const cameraId = cameras[index].id;
//             await AllCameras.update(
//               { working_camera: 1, url: `${mediaElements[1]}` },
//               { where: { id: cameraId } }
//             );
//             console.log(`Обновлен объект с ID ${cameraId} в базе данных`);
//           }
//         } else {
//           console.error(`URL с индексом ${index} является undefined`);
//         }
//       } catch (error) {
//         console.error(`Ошибка для URL ${url}:`, error);

//         // Проверка, является ли ошибка TimeoutError, и соответствует ли URL конкретному условию
//         if (error.name === 'TimeoutError' || error.message.includes('net::ERR_CERT_AUTHORITY_INVALID') || error.message.includes('net::ERR_CONNECTION_REFUSED')) {
//           const cameraId = cameras[index].id;
//           console.log(cameras)
//           await AllCameras.update(
//             { working_camera: 0, url: `https://polkovnikovdeveloper.ru/camera/${cameraId}` },
//             { where: { id: cameraId } }
//           );
//           console.log(`Обновлен объект с ID ${cameraId} в базе данных из-за TimeoutError или ERR_CERT_AUTHORITY_INVALID`);
//         }
//          else if (error.name === 'Error' && error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
//           const cameraId = cameras[index].id;
//         await AllCameras.update(
//        { working_camera: 0, url: `https://polkovnikovdeveloper.ru/camera/${cameraId}` },
//        { where: { id: cameraId } }
//     );
//     console.log(`Обновлен объект с ID ${cameraId} в базе данных из-за ERR_NAME_NOT_RESOLVED`);
//   }

//         return ['Errors versions'];
//       } finally {
//         await page.close();
//       }

//       return mediaElements;
//     });

//     resultArray.push(...(await Promise.all(promises)));

//     console.log('Результирующий массив ---->', resultArray.length, resultArray);
//   } catch (error) {
//     console.error('Ошибка при обработке URL-ов:', error);
//   } finally {
//     await browser.close();
//   }
// }

// module.exports = { processUrls };







