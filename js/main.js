const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
// const lastBtn = document.querySelector("#lastSearchBtn");

import { toggleHistoryTitle, showCard, showError, showLoading } from "./ui.js";
import { fetchWeather } from "./api.js";

toggleHistoryTitle();

if (localStorage.getItem("lastCity")) {
  input.value = localStorage.getItem("lastCity");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = input.value.trim();

  if (city === "") {
    showError();
    input.value = "";
  } else {
    showLoading();
    input.value = "";
    const isSuccess = await fetchWeather(city);
    if (isSuccess) {
      showCard();
      localStorage.setItem("lastCity", city);
    } else {
      showError("Ошибка: город не найден");
    }
  }
});
