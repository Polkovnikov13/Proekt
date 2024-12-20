const cron = require('node-cron');
const fetchCurrencyData = require('./utils/valuteApi');

// Настроить cron-задачу для выполнения каждый понедельник в 10:00
const valuteJob = cron.schedule('0 9 * * *', async () => {
  try {
    await fetchCurrencyData()
  } catch (error) {
    console.error('Error updating valute:', error.message);
  }
}, {
  scheduled: false // Отключить автоматический запуск
});

module.exports = valuteJob;

