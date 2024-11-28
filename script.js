document
  .querySelector(".searchForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    let input = document.querySelector(".searchBar").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=dce96234cf33980559d69e080d90e134
&units=metric`;
    if (input !== "") {
      showWarning(`Searching...`);
      let response = await fetch(url);
      let json = await response.json();
      // this if json.cod === 200 means that everything is ok, 100%
      if (json.cod === 200) {
        showWarning("");
        showInfo({
          city: json.name,
          country: json.sys.country,
          temperature: json.main.temp,
          weatherIcon: json.weather[0].icon,
          weatherDescription: json.weather[0].description,
          windSpeed: json.wind.speed,
          windDirection: json.wind.deg,
          feelsLike: json.main.feels_like,
          minTemp: json.main.temp_min,
          maxTemp: json.main.temp_max,
        });
      } else {
        showWarning(`Type a valid city`);
      }
    } else {
      showWarning(`Type something`);
    }
  });

function showWarning(msg) {
  document.querySelector(".warning").innerHTML = msg;
}

function showInfo(json) {
  document.querySelector("#weatherContainer").style.display = "block";
  document.querySelector(
    ".cityName"
  ).innerHTML = `${json.city} - ${json.country}`;
  document.querySelector(".temperature").innerHTML = `${json.temperature} °C`;
  document.querySelector(
    ".tempIcon"
  ).src = `http://openweathermap.org/img/wn/${json.weatherIcon}@2x.png`;
  document.querySelector(
    ".weatherDescription"
  ).innerHTML = `${json.weatherDescription}`;
  document.querySelector(".wind").innerHTML = `${json.windSpeed} km/h`;
  document.querySelector(
    ".windIcon"
  ).style.transform = `rotate(${json.windDirection}deg)`;
  document.querySelector(
    ".feelsLike"
  ).innerHTML = `Feels like: ${json.feelsLike}°C`;
  document.querySelector(".tempMin").innerHTML = `Min: ${json.minTemp}°C`;
  document.querySelector(".tempMax").innerHTML = `Max: ${json.maxTemp}°C`;
}
