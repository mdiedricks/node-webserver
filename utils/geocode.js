const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWRpZWRyaWNrcyIsImEiOiJja21hOGZ2YjMxb3ByMzB3MHZsdnR3czM5In0.FA5yvnRnvMbgfELsqBifrg&limit=1`;

  request({ url, json: true }, (error, response, { features }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, features[0]);
    }
  });
};

module.exports = geocode;
