const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = " ";
  messageThree.textContent = " ";

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      console.log(data);
      messageOne.textContent = data.name;
      messageTwo.textContent = `Lat ${data.lat}, Lon ${data.lon}`;
      messageThree.textContent = `Humidity is ${data.humidity}%, and temp is ${data.temperature}`;
    });
  });
});
