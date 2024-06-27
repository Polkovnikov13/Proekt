/* eslint-disable no-cond-assign */
const axios = require('axios');


// console.log('1');
async function httpFinderSrc(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    
    // Регулярное выражение для поиска <iframe> и <video> тегов
    const regex = /<(iframe|video|source)[^>]*\s+src\s*=\s*["']([^"']+)["'][^>]*>/g;
    const matches = [];
    let match;
    
    // Используем цикл для поиска всех совпадений
    while ((match = regex.exec(html)) !== null) {
      matches.push(match[2]); // Индекс 2, так как src находится в подгруппе
    }
    
    if (matches.length > 0) {
      return matches;
    } 
      return 'Их нет'; // Возвращаем фразу, если ни одного тега не найдено
    
    
  } catch (error) {
    console.error('Error fetching or parsing the URL:', error);
    return 'Не работает!!!';
  }
}

// console.log('2');
// Пример вызова функции и вывода результата
// httpFinderSrc('https://ru.cloud.trassir.com/tube/rVKL236ftkxpOgu5?lang=en')
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

module.exports = httpFinderSrc;

