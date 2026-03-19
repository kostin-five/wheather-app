const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
const lastBtn = document.querySelector("#lastSearchBtn");

import { toggleHistoryTitle, showCard, showError, showLoading } from "./ui.js";
import { fetchWeather } from "./api.js";

toggleHistoryTitle();

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
      }
    } else {
      showError("Ошибка: город не найден");
    }
  }
});
