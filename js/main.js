const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
const lastBtn = document.querySelector("#lastSearchBtn");
const historyList = document.querySelector("#historyList");

import { showCard, showError, showLoading, renderHistory } from "./ui.js";
import { fetchWeather } from "./api.js";

renderHistory(getHistory());

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
      updateHistory(city);
    } else {
      showError("Ошибка: город не найден");
    }
  }
}

function getHistory() {
  if (!localStorage.getItem("historyArray")) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("historyArray"));
  }
}
function updateHistory(city) {
  const arrayData = getHistory();
  const newArrayData = arrayData.filter((x) => x !== city);
  if (newArrayData.length > 4) {
    newArrayData.shift();
  }
  localStorage.setItem("historyArray", JSON.stringify([...newArrayData, city]));
  renderHistory([...newArrayData, city]);
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

historyList.addEventListener("click", async (event) => {
  const item = event.target.closest("li");
  if (item) {
    const city = item.textContent;
    input.value = city;
    await handleCitySearch(city);
  }
});
