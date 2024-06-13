const { Sequelize } = require('sequelize');
const sequelize = require("../db/db");

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
  
  const createUrlsForAllCameras = async () => {
  try {
    const allCameras = await AllCameras.findAll({ raw: true }).slice(0,10);
    const updatePromises = allCameras.map(async (camera) => {
      const { id, link } = camera;
      let url;

      // Check if the link starts with a specific URL
      if (link.startsWith('https://RT:1243@camera.fc-rsk.ru:8081/live/media')) {
        url = link; // Use the link directly
      } else {
        url = link.startsWith('http') ? `https://polkovnikovdeveloper.ru/camera/${id}` : link;
      }

      await AllCameras.update(
        { "url": url },
        { where: { id } }
      );
    });

    await Promise.all(updatePromises);
    console.log('URLs успешно созданы и обновлены для всех камер с условием.');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};

module.exports = { createUrlsForAllCameras }
