const cron = require('node-cron');
const { processTrassirCameras, processRTSPMeCameras, processRTCameras, processRTCamerasRT } = require('./routes/statusFunctionsMaker');

// Настроить cron-задачу для выполнения каждый понедельник в 10:00
const cameraStatusJob = cron.schedule('*/34 * * * *', async () => {
// '0 10 * * 1
  console.log('Starting camera status processing job...');

  try {
    console.log('Starting CHECKING cameras status!!!!!!!!!!!')
    await processTrassirCameras();
    await processRTSPMeCameras();
    await processRTCameras();
    await processRTCamerasRT();
    console.log('Camera status processing done!!!!!!!!!!!!!!!');
  } catch (error) {
    console.error('Error processing cameras:', error.message);
  }
}, {
  scheduled: false // Отключить автоматический запуск
});

module.exports = cameraStatusJob;

