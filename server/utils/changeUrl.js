const axios = require('axios');

async function parseURL(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const regex = /var\s+n_url\s*=\s*"(.*?)";/;
    const match = html.match(regex);

    if (match && match[1]) {
      return match[1];
    } 
      throw new Error('URL not found in the HTML.');
    
  } catch (error) {
    console.error('Error fetching or parsing the URL:', error);
    throw error;
  }
}
// console.log(parseURL('https://rtsp.me/embed/38ZdhZ8D/').then((r)=>console.log(r)))
module.exports = parseURL;

