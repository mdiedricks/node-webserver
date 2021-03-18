const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  const url = `http://api.weatherstack.com/current?access_key=a1fa903f2261e340c379314f24d28852&query=${location}`;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = " ";
  messageThree.textContent = " ";

  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error.info);
      }
      messageOne.textContent = data.location.name;
      messageTwo.textContent = `Lat ${data.location.lat}, Lon ${data.location.lon}`;
      messageThree.textContent = `The temperature is ${data.current.temperature}, and humidity is ${data.current.humidity}%`;
    });
  });
});
