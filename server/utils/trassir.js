let first; let second;
let baseUrl = 'https://m30.ru.cloud.trassir.com';

// Функция для генерации URL
const generateExample = () => `${baseUrl}/t/${first}/hls/${second}/master.m3u8`;

// Функция для получения информации о потоке
async function fetchStreamInfo(link) {
    const url = `${baseUrl}/tv?link=${link}&mode=live`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.redirect) {
            baseUrl = `https://${data.redirect}`;
            throw new Error('Redirect detected');
        }
        if (data) {
            return data;
        } 
            throw new Error('Ответ не содержит значения XXXYYY');
        
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
}

// Функция для получения второй информации
async function fetchSecondInfo(result) {
    const url = `${baseUrl}/t/${result.XXXYYY}/tvlogin`;

    const headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Content-Type': 'application/json; charset=utf-8',
        'Host': 'm30.ru.cloud.trassir.com',
        'Origin': 'https://ru.cloud.trassir.com',
        'Referer': 'https://ru.cloud.trassir.com/',
        'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Linux"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    };

    const payload = JSON.stringify({
        "d": result.auth.d,
        "r": result.auth.r
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: payload,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        first = result.XXXYYY; // Устанавливаем значение first
        return { data, XXXYYY: result.XXXYYY };
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

// Функция для получения третьей информации
async function fetchThirdInfo(result) {
    const url = `${baseUrl}/t/${result.XXXYYY}/get_video`;

    const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Host': 'm30.ru.cloud.trassir.com',
        'Origin': 'https://ru.cloud.trassir.com',
        'Referer': 'https://ru.cloud.trassir.com/',
        'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Linux"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    };

    const payload = new URLSearchParams({
        "sid": result.data.sid,
        "channel": "IiT0rMxX",
        "container": "hls",
        "server": "",
        "segment_duration": "1",
        "stream": "main",
        "mute": "true"
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: payload,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        second = data.token; // Устанавливаем значение second
        return data; // Возвращаем результат, если нужно
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

// Новая функция для отправки GET-запроса на сгенерированный URL
async function validateExampleUrl() {
    const exampleUrl = generateExample();
    try {
        const response = await fetch(exampleUrl);
        // console.log(response,'!!!!!!!!');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return exampleUrl;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
}

// Вспомогательная функция для перезапуска цепочки функций с новым URL
async function restartChainWithNewUrl(link) {
    try {
        const result = await fetchStreamInfo(link);
        // console.log('Полученное значение:', result);
        const secondResult = await fetchSecondInfo(result);
        // console.log('Полученный ответ от второй функции:', secondResult);
        await fetchThirdInfo(secondResult);
        const exampleUrl = await validateExampleUrl();
        // console.log('Example URL:', exampleUrl);
        return exampleUrl;
    } catch (error) {
        if (error.message === 'Redirect detected') {
            console.log('Redirect detected, restarting with new URL', link);
            return restartChainWithNewUrl(link); // Перезапуск с новым базовым URL
        } 
            console.error('Ошибка:', error);
        
    }
}

// Запуск цепочки функций
// restartChainWithNewUrl('OrPZqPgUCr3Bd778');
// console.log(restartChainWithNewUrl(''),'Result')

module.exports = restartChainWithNewUrl;
