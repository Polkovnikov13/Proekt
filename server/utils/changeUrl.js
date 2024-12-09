const axios = require('axios');

async function parseURL(url) {
  // Извлекаем нужную часть из URL (например, "NNGfn8E6")
  const regex = /https:\/\/rtsp\.me\/embed\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    const hash = match[1];  // Получаем "NNGfn8E6"
    
    // Получаем Unix timestamp
    const timestamp = Math.floor(Date.now() / 1000);  // Делим на 1000, чтобы получить секунды
    
    // Формируем итоговый URL с использованием timestamp и hash
    const result = `https://msk.rtsp.me/"+hash.sub+"/${timestamp}/hls/${hash}.m3u8?ip=195.96.64.250`;

    // Возвращаем сформированный URL
    return result;
  } 
    throw new Error('Invalid URL format');
}


// async function parseURL(url) {
//   console.log(url,'URL') // https://rtsp.me/embed/38ZdhZ8D/ URL
//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const regex = /var\s+n_url\s*=\s*"(.*?)";/;
//     const match = html.match(regex);

//     if (match && match[1]) {
//       console.log(match[1]);
//       return match[1];
//     } 
//       throw new Error('URL not found in the HTML.');
    
//   } catch (error) {
//     console.error('Error fetching or parsing the URL:', error);
//     throw error;
//   }
// }
// console.log(parseURL('https://rtsp.me/embed/38ZdhZ8D/').then((r)=>console.log(r,'1')))
// console.log(parseURL('https://rtsp.me/embed/rYf76ZKi/').then((r)=>console.log(r,'2')))
// // 
// // eslint-disable-next-line no-console
// console.log(parseURL('https://rtsp.me/embed/aNzYzBkK/').then((r)=>console.log(r,'3')))
 module.exports = parseURL;

