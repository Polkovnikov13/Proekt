/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const { JSDOM } = require('jsdom');

async function fetchAndLogPosterUrl(url) {
  try {
    // Fetch HTML content
    const response = await axios.get(url);
    const html = response.data;

    // Parse HTML into DOM
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Find the <video> element by ID
    const videoElement = document.getElementById('video');

    // Check if videoElement exists
    if (videoElement) {
      // Get the value of the 'poster' attribute
      const posterUrl = videoElement.getAttribute('poster');

      // Check if posterUrl is defined
      if (posterUrl) {
        // Fetch response from the fetched posterUrl
        const posterResponse = await axios.head(posterUrl);
        // Check if the response status is 200
        if (posterResponse.status === 200) {
          console.log('Response status from poster URL:', posterResponse.status);
          return posterUrl;
        } 
          console.log('Response status from poster URL:', posterResponse.status);
          return 'No working';
        
      } 
        throw new Error('Poster attribute not found in the video tag.');
      
    } else {
      throw new Error('Video element with ID "video" not found.');
    }
  } catch (error) {
    return 'No working!!!';
  }
}

// Example usage:
// fetchAndLogPosterUrl('https://rtsp.me/embed/z4EzZyF4/')
//   .then(result => console.log('Final result:', result))
//   .catch(error => console.error('Final error:', error));

module.exports = fetchAndLogPosterUrl;
