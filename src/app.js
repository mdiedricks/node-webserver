const path = require("path");
const express = require("express");
const { appendFile } = require("fs");
const hbs = require("hbs");

const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

//creates new express server
const app = express();

// Express paths for config
const publicDirectoryPath = path.join(__dirname, "../public"); // create path to html files
const viewsPath = path.join(__dirname, "../templates/views"); //customize 'views' locations
const partialsPath = path.join(__dirname, "../templates/partials"); //customize 'partials' locations

// Setup handlbars and view engine
app.set("view engine", "hbs"); // tell express to use handlebars as template engine
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // customize your server - this finds index.html by default

app.get("", (req, res) => {
  res.render("index.hbs", {
    page: "Home",
    title: "Weather App",
    name: "Michael Diedricks",
  }); //express goes to find this in the 'views' folder
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    page: "About",
    title: "Weather App",
    name: "Michael Diedricks",
  });
});

app.get("/help", (req, res) => {
  res.render("help.hbs", {
    page: "Help & FAQ",
    title: "Weather App",
    name: "Michael Diedricks",
    message: "Ask me about stuff",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address must be provided" });
  }
  geocode(req.query.address, (error, { center, place_name } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(center[0], center[1], (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: place_name,
        lat: forecastData.lat,
        lon: forecastData.lon,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    page: "404",
    message: "Help article not found",
    name: "Michael Diedricks",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    page: "404",
    message: "404: page not found",
    name: "Michael Diedricks",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});