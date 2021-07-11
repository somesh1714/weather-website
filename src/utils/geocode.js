const request = require("request");

const geocode = (address, callback) => {
  let url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic29tZXNoMTciLCJhIjoiY2txZjZicTRoMHR1MDJucGV1dWZ2c2MzbiJ9.GopvwXDqEGO8_qqeIPj1PA";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network service issue !", undefined);
    } else if (body.features.length == 0) {
      callback("Unable to find place", undefined);
    } else {
      data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      };
      // console.log(data);
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
