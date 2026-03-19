const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
const messageError = document.querySelector("#errorMessage");
const loading = document.querySelector("#loadingMessage");
const cardResult = document.querySelector("#weatherCard");
const lastBtn = document.querySelector("#lastSearchBtn");
const history = document.querySelector(".history");

function notShowHistory() {
  if (history.lastElementChild.children.length === 0) {
    history.firstElementChild.classList.add("hidden");
  } else {
    history.firstElementChild.classList.remove("hidden");
  }
}

notShowHistory();

function showError(msg = "Введите название города!") {
  loading.classList.add("hidden");
  cardResult.classList.add("hidden");
  messageError.classList.remove("hidden");
  messageError.textContent = msg;
}

function showLoading() {
  messageError.classList.add("hidden");
  cardResult.classList.add("hidden");
  loading.classList.remove("hidden");
}

async function fetchWeather(city) {
  let url = new URL(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=ru&format=json`
  );
  const response = await fetch(url);
  const data = await response.json();
  if (!data.results || data.results == []) {
    showError("Ошибка: город не найден");
    return;
  }
  const cityData = data.results[0];
  const latitude = cityData.latitude;
  const longitude = cityData.longitude;
  await getWeatherData(latitude, longitude);
}

async function getWeatherData(latitude, longitude) {
  let url = new URL(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );
  const response = await fetch(url);
  const data = await response.json();
  const currentData = data.current;
  const temperature = currentData.temperature_2m;
  const humidity = currentData.relative_humidity_2m;
  const windSpeed = currentData.wind_speed_10m;
  const weatherCode = currentData.weather_code;
  console.log(
    "температура: " +
      temperature +
      " влажность: " +
      humidity +
      " ветер: " +
      windSpeed +
      " код: " +
      weatherCode
  );
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = input.value.trim();

  if (city === "") {
    showError();
  } else {
    showLoading();
    await fetchWeather(city);
  }
  input.value = "";
});
