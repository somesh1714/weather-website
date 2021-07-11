const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { response } = require("express");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebar engine and views path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "somesh kartikeya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Tell me your problem",
    name: "somesh kartikeya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "somesh kartikeya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter the query string",
    });
  }
  let address = req.query.address;

  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({ forecastData, address });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "somesh kartikeya",
    errorMessage: "ERROR 404 Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "somesh kartikeya",
    errorMessage: "ERROR 404 Page not found!",
  });
});

app.listen(3000, () => {
  // console.log("server is up on port 3000");
});
