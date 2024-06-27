function transformUrl(originalUrl) {
    console.log(originalUrl)
    const baseUrl = "https://streamer1.mlsonline.tv:8443/vsaas/cameras/";
    const tokenParam = "hls/best/stream.m3u8?token=";

    // Извлекаем нужные части из исходного URL
    const urlParts = originalUrl.split('/');
    const cameraName = urlParts[urlParts.length - 2];
    const token = originalUrl.split('=')[1];

    // Формируем новый URL
    const newUrl = `${baseUrl}${cameraName}/${tokenParam}${token}`;
    return newUrl;
}

// Примеры использования
// const originalUrl1 = "https://streamer1.mlsonline.tv:8443/cameras/mira13kbs/embed?token=4e647d098c7d56c0f52a581de9e96875b8ac06a0-1719236199";
// const originalUrl2 = "https://streamer1.mlsonline.tv:8443/cameras/mira13stroyka/embed?token=a6758322cb97de4587db86302a9f780ed2695fd7-1719238023";

// const newUrl1 = transformUrl(originalUrl1);
// const newUrl2 = transformUrl(originalUrl2);

// console.log(newUrl1);
// console.log(newUrl2);

module.exports = transformUrl;
