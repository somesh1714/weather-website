const request = require("request");

const forecast = (latitude, longitude, callback) => {
  let url =
    "http://api.weatherstack.com/current?access_key=a8d88f1fdc9f82fd079eadcbd5133849&query=" +
    latitude +
    "," +
    longitude;
  // console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network access issue", undefined);
    } else if (body.error) {
      callback("location is not specified", undefined);
    } else {
      data = body;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
