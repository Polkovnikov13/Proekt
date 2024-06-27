const axios = require('axios');

async function findKey(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const regex = /data-camera-uid\s*=\s*"(.*?)"/;
    const match = html.match(regex);

    if (match && match[1]) {
      return match[1];
    } 
      throw new Error('URL not found in the HTML.');
    
  } catch (error) {
    console.error('Error fetching or parsing the URL:');
    return 'Не работает!!!';
  }
}
// console.log(findKey('https://camera.rt.ru/sl/1My84SvXr').then(res => console.log(res)))
module.exports = findKey;
