const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
const lastBtn = document.querySelector("#lastSearchBtn");
const historyList = document.querySelector("#historyList");

import { showCard, showError, showLoading, renderHistory } from "./ui.js";
import { fetchWeather } from "./api.js";

if (localStorage.getItem("historyArray")) {
  renderHistory(JSON.parse(localStorage.getItem("historyArray")));
} else {
  renderHistory([]);
}

async function handleCitySearch(city) {
  if (city === "") {
    showError();
    input.value = "";
  } else {
    showLoading();
    input.value = "";
    const isSuccess = await fetchWeather(city);
    if (isSuccess) {
      showCard();
      if (!localStorage.getItem("historyArray")) {
        localStorage.setItem("historyArray", JSON.stringify([city]));
        renderHistory(JSON.parse(localStorage.getItem("historyArray")));
      } else {
        const arrayData = JSON.parse(localStorage.getItem("historyArray"));
        const newArrayData = arrayData.filter((x) => x !== city);
        if (newArrayData.length > 4) {
          newArrayData.shift();
        }
        localStorage.setItem(
          "historyArray",
          JSON.stringify([...newArrayData, city])
        );
        renderHistory(JSON.parse(localStorage.getItem("historyArray")));
      }
    } else {
      showError("Ошибка: город не найден");
    }
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = input.value.trim();
  await handleCitySearch(city);
});

lastBtn.addEventListener("click", async () => {
  if (localStorage.getItem("historyArray")) {
    const lastCity = JSON.parse(localStorage.getItem("historyArray")).pop();
    input.value = lastCity;
    await handleCitySearch(lastCity);
  }
});

historyList.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (item) {
    const city = item.textContent;
    input.value = city;
    handleCitySearch(city);
  }
});
