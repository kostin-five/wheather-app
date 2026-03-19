const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

import { getWeatherDescription } from "./ui.js";

export async function fetchWeather(city) {
  try {
    let url = new URL(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=ru&format=json`
    );
    const response = await fetch(url);
    const data = await response.json();
    if (!data.results || data.results.length == 0) {
      return false;
    }
    const cityData = data.results[0];
    const latitude = cityData.latitude;
    const longitude = cityData.longitude;
    cityName.textContent = cityData.name;
    return await getWeatherData(latitude, longitude);
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getWeatherData(latitude, longitude) {
  try {
    let url = new URL(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    );
    const response = await fetch(url);
    const data = await response.json();
    const currentData = data.current;
    if (!currentData) {
      return false;
    }

    const temperatureData = currentData.temperature_2m;
    const humidityData = currentData.relative_humidity_2m;
    const windSpeedData = currentData.wind_speed_10m;
    const weatherCodeData = currentData.weather_code;
    temperature.textContent = `${temperatureData}°C`;
    humidity.textContent = `Влажность: ${humidityData}%`;
    wind.textContent = `Ветер: ${windSpeedData} км/ч`;
    description.textContent = getWeatherDescription(weatherCodeData);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
