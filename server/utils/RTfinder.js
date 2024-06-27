async function RTfinder(browser, url) {
  let mediaElements = [];

  try {
    const page = await browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
      await page.waitForTimeout(5000); // Задержка в 5 секунд для полной загрузки элементов
      mediaElements = await page.$$eval('video, iframe, source', elements => elements.map(element => element.src).filter(src => src));
    } catch (error) {
      console.error(`Error requesting URL ${url}:`, error);
    } finally {
      await page.close();
    }
  } catch (error) {
    console.error('Error processing URL:', error);
  }

  return mediaElements;
}


// Пример использования функции с одной ссылкой
// const urlToProcess = 'https://RT:1243@camera.fc-rsk.ru:8081/live/media/camera02/DeviceIpint.1092/SourceEndpoint.video:0:0?format=mp4';

// RTfinder(urlToProcess).then(result => {
//   console.log('Результат:', result);
// }).catch(err => {
//   console.error('Ошибка:', err);
// });

module.exports = RTfinder;




