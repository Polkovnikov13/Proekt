const axios = require('axios');

async function cctv(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      timeout: 6000 // Таймаут 3 секунды
    });

    // Проверяем статус ответа
    if (response.status === 200) {
      return 'work';
    }
   
    
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
        return 'No working!!!';
      // console.error('Request timed out');
    } if (error.response) {
      console.error('Error fetching or parsing the URL:', error.response.status);
    } else {
      console.error('Unknown error:', error.message);
    }
    throw error;
  }
}

// Вызываем функцию cctv и обрабатываем результаты
// cctv('https://cctv.cit23.ru/6LJYCJayGAbvSjKKp3wgwIygqjGR0s/mjpeg/6AYSktf57L/yeNvi0psNl')
//   .then((result) => {
//     console.log('Result:', result); // Здесь будет либо 'work', либо 'No working!!!'
//     console.log('Operation completed.');
//   })
//   .catch((error) => {
//     console.error('Operation failed.');
//   });

module.exports = cctv;



