const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
const lastBtn = document.querySelector("#lastSearchBtn");

import { showCard, showError, showLoading, renderHistory } from "./ui.js";
import { fetchWeather } from "./api.js";

if (localStorage.getItem("historyArray")) {
  renderHistory(JSON.parse(localStorage.getItem("historyArray")));
} else {
  renderHistory([]);
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
});

lastBtn.addEventListener("click", () => {
  if (localStorage.getItem("historyArray")) {
    const lastCity = JSON.parse(localStorage.getItem("historyArray")).pop();
    input.value = lastCity;
  }
});
