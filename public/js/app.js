console.log("client side js ");

// fetch("http://localhost:3000/weather?address=jhunjhunu").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.forecastData);
//       console.log(data.address);
//     }
//   });
// });

let weatherForm = document.querySelector("form");
let searchVal = document.querySelector("input");
let messageOne = document.getElementById("message-1");
let messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(searchVal.value);
  //   console.log("form submitted");

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  let url = "/weather?address=" + searchVal.value;
  //   console.log(url);
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.address;
        let weatherData =
          "The weather in " +
          data.forecastData.location.name +
          " in the country " +
          data.forecastData.location.country +
          " is " +
          data.forecastData.current.weather_descriptions +
          " with wind speed " +
          data.forecastData.current.wind_speed;
        messageTwo.textContent = weatherData;
      }
    });
  });
});
