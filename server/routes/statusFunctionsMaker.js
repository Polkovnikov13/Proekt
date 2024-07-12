const puppeteer = require('puppeteer');
const { Sequelize, Op } = require('sequelize');
const sequelize = require("../db/db"); // Подключение к базе данных
const RTfinder = require('../utils/RTfinder'); // Функция для проверки камер
const findKey = require('../utils/findKey');
const fetchAndLogPosterUrl = require('../utils/checkAvatarVideo');
const trassir = require('../utils/trassir');
const StatusTrassir = require('../utils/statusTrassir');
const checkLinkStatus = require('../utils/statusTrassir');

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

// Функция для обработки камер RT:1243@camera.fc-rsk.ru:8081
async function processRTCamerasRT() {
  let browser;
  try {
    const views = await AllCameras.findAll({
      where: {
        link: {
          [Sequelize.Op.like]: 'https://RT:1243@camera.fc-rsk.ru:8081%'
        }
      },
      raw: true
    });

    browser = await puppeteer.launch();

    const updatedViews = await processAllInBatches(browser, views, 35);

    return updatedViews;
  } catch (error) {
    console.error('Error processing RT cameras:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function processBatch(browser, views) {
  const parsePromises = views.map(async (originalElem) => {
    const oneElem = { ...originalElem };

    try {
      const parsedUrl = await RTfinder(browser, oneElem.link);
      if (parsedUrl.length === 0) {
        oneElem.working_camera = 0;
        oneElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
      } else {
        oneElem.working_camera = 1;
        oneElem.url = oneElem.link;
      }
    } catch (error) {
      console.error(`Error processing URL (${oneElem.link}):`, error.message);
      oneElem.working_camera = 0;
      oneElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
    }

    return oneElem;
  });

  const updatedViews = await Promise.all(parsePromises);

  const savePromises = updatedViews.map(oneElem => 
    AllCameras.update({
      working_camera: oneElem.working_camera,
      url: oneElem.url,
    }, {
      where: { id: oneElem.id }
    })
  );

  await Promise.all(savePromises);

  return updatedViews;
}

async function processAllInBatches(browser, views, batchSize = 35) {
  const batches = Array.from({ length: Math.ceil(views.length / batchSize) }, (_, i) => views.slice(i * batchSize, (i + 1) * batchSize));

  return batches.reduce(async (accPromise, batch) => {
    const acc = await accPromise;
    const processedBatch = await processBatch(browser, batch);
    return acc.concat(processedBatch);
  }, Promise.resolve([]));
}

// Основная функция обработки камер Trassir
async function processTrassirCameras() {
    try {
        const views = await AllCameras.findAll({
            where: {
                link: {
                    [Sequelize.Op.like]: 'https://ru.cloud.trassir%'
                }
            },
            raw: true
        });

        const updatedViews = await Promise.all(views.map(async (oneElem) => {
            const updatedElem = { ...oneElem };
            try {
                const match = oneElem.link.match(/tube\/([^?]+)/);
                const extractedValue = match ? match[1] : null;
                const parsedUrl = await checkLinkStatus(extractedValue);

                updatedElem.working_camera = parsedUrl === 'yes' ? 1 : 0;
                updatedElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
            } catch (error) {
                console.error(`Error processing URL (${oneElem.link}):`, error.message);
                updatedElem.working_camera = 33;
            }
            return updatedElem;
        }));

        await Promise.all(updatedViews.map(oneElem =>
            AllCameras.update({
                working_camera: oneElem.working_camera,
                url: oneElem.url,
            }, {
                where: { id: oneElem.id }
            })
        ));

        return updatedViews;
    } catch (error) {
        console.error('Error processing Trassir cameras:', error.message);
        throw error;
    }
}



// Функция для обработки камер RTSP.me
async function processRTSPMeCameras() {
  try {
    const views = await AllCameras.findAll({
      where: {
        link: {
          [Sequelize.Op.like]: 'https://rtsp.me/embed/%'
        }
      },
      raw: true
    });

    const updatedViews = await Promise.all(views.map(async (oneElem) => {
      const updatedElem = { ...oneElem };
      try {
        const parsedUrl = await fetchAndLogPosterUrl(oneElem.link);

        updatedElem.working_camera = parsedUrl === 'No working!!!' ? 0 : 1;
        updatedElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
      } catch (error) {
        console.error(`Error processing URL (${oneElem.link}):`, error.message);
        updatedElem.working_camera = 0;
      }
      return updatedElem;
    }));

    await Promise.all(updatedViews.map(oneElem =>
      AllCameras.update({
        working_camera: oneElem.working_camera,
        url: oneElem.url,
      }, {
        where: { id: oneElem.id }
      })
    ));

    return updatedViews;
  } catch (error) {
    console.error('Error processing RTSP.me cameras:', error.message);
    throw error;
  }
}

// Функция для обработки камер RT.ru
async function processRTCameras() {
  try {
    const views = await AllCameras.findAll({
      where: {
        [Op.or]: [
          { link: { [Op.like]: 'https://lk-b2b.camera.rt.ru%' } },
          { link: { [Op.like]: 'https://camera.rt.ru/sl%' } }
        ]
      },
      raw: true
    });

    const updatedViews = await Promise.all(views.map(async (oneElem) => {
      const updatedElem = { ...oneElem };
      try {
        const parsedUrl = await findKey(oneElem.link);

        updatedElem.working_camera = parsedUrl === 'Не работает!!!' ? 0 : 1;
        updatedElem.url = `https://polkovnikovdeveloper.ru/camera/${oneElem.id}`;
      } catch (error) {
        console.error(`Error processing URL (${oneElem.link}):`, error.message);
        updatedElem.working_camera = 0;
      }
      return updatedElem;
    }));

    await Promise.all(updatedViews.map(oneElem =>
      AllCameras.update({
        working_camera: oneElem.working_camera,
        url: oneElem.url,
      }, {
        where: { id: oneElem.id }
      })
    ));

    return updatedViews;
  } catch (error) {
    console.error('Error processing RT.ru cameras:', error.message);
    throw error;
  }
}

module.exports = {
  processTrassirCameras,
  processRTSPMeCameras,
  processRTCameras,
  processRTCamerasRT
};


