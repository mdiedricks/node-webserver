const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a1fa903f2261e340c379314f24d28852&query=${lon},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Error accessing weather services");
    } else if (body.error) {
      callback("Request parameters incorrect. Please try again");
    } else {
      callback(undefined, body.location);
    }
  });
};

module.exports = forecast;
