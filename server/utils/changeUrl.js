const axios = require('axios');

async function parseURL(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    // console.log('Fetched HTML:', html); // Логирование содержимого HTML

    const regex = /var\s+n_url\s*=\s*"(.*?)";/;
    const match = html.match(regex);

    if (match && match[1]) {
      return match[1]; // Возвращаем найденный URL
    } 
    
    throw new Error('URL not found in the HTML.');
    
  } catch (error) {
    console.error('Error fetching or parsing the URL:', error);
    throw error;
  }
}

module.exports = parseURL;


