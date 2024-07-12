const axios = require('axios');

// Функция для получения информации о потоке для одной ссылки
async function checkLinkStatus(link) {
    const baseUrls = [
        `https://m30.ru.cloud.trassir.com/tv?link=${link}&mode=live`,
        `https://k30.ru.cloud.trassir.com/tv?link=${link}&mode=live`
    ];

    for (const url of baseUrls) {
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                const { data } = response;
                if (data.XXXYYY) {
                    return 'yes'; // Возвращаем значение XXXYYY при успешном запросе
                } 
                    console.warn(`Ответ не содержит значения XXXYYY для URL: ${url}`);
                
            } else {
                console.warn(`HTTP error! Status: ${response.status} for URL: ${url}`);
            }
        } catch (error) {
            return 'no';
        }
    }

    return 'Invalid URL';
}

// Функция для обработки массива ссылок
async function StatusTrassir(links) {
    const results = await Promise.all(links.map(link => checkLinkStatus(link)));
    return results;
}

// Вызываем функцию для отправки GET запросов и получения массива значений XXXYYY
// StatusTrassir(['tWXJX75u0TB1y92K', 'anotherLink', 'yetAnotherLink','pJn4ob61OEmrZRu7','asd'])
//     .then(results => {
//         console.log('Полученные значения:', results);
//         // Дальнейшие действия с полученными значениями XXXYYY
//     })
//     .catch(error => {
//         console.error('Ошибка при получении значений XXXYYY:', error);
//         // Обработка ошибки при запросе
//     });

module.exports = checkLinkStatus;

