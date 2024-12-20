const axios = require('axios'); // Подключение axios для выполнения HTTP-запросов
const fs = require('fs'); // Подключение модуля fs для работы с файлами

// Функция для получения текущей даты в формате YYYY-MM-DD
function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Функция для получения курса валют и записи в файл
async function fetchCurrencyData() {
  const date = getCurrentDateFormatted();
  const currencies = 'RUB,CNY';
  const source = 'USD';
  const accessKey = "4e3edb1a56f0d72bc9193105dece4cb8"; // Укажите ваш ключ
  const url = `http://api.currencylayer.com/historical?access_key=${accessKey}&date=${date}&currencies=${currencies}&source=${source}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.success) {
      const rubRate = data.quotes[`USD${'RUB'}`];
      const cnyRate = data.quotes[`USD${'CNY'}`];
      const rubToCnyRate = rubRate / cnyRate;

      const result = `
Курс доллара к рублю на ${date}: 1 USD = ${rubRate.toFixed(2)} RUB
Курс рубля к юаню на ${date}: 1 CNY = ${rubToCnyRate.toFixed(2)} RUB
-----------------------------------
      `;

      console.log(result);

      // Сохранение данных в файл
      fs.writeFile(`currency_rates_${date}.txt`, result, (err) => {
        if (err) {
          console.error('Ошибка при записи в файл:', err.message);
        } else {
          console.log(`Результаты успешно сохранены в файл currency_rates_${date}.txt`);
        }
      });
    } else {
      console.error('Ошибка получения данных:', data.error.info);
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error.message);
  }
}

module.exports = fetchCurrencyData;
