const https = require('https');

async function sendGetRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = [];

      response.on('data', (fragment) => {
        data.push(fragment);
      });

      response.on('end', () => {
        let body = Buffer.concat(data);        
        resolve(body.toString());
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
  });
}

module.exports = {
  sendGetRequest
}