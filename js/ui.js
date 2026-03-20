const messageError = document.querySelector("#errorMessage");
const loading = document.querySelector("#loadingMessage");
const cardResult = document.querySelector("#weatherCard");
const history = document.querySelector(".history");
const historyList = document.querySelector("#historyList");

export function getWeatherDescription(code) {
  switch (code) {
    case 0:
      return "Ясно ☀️";
    case 1:
      return "Преимущественно ясно 🌤️";
    case 2:
      return "Переменная облачность ☁️";
    case 3:
      return "Пасмурно 🌧️";
    default:
      return "Неизвестная погода 🌫️";
  }
}

export function toggleHistoryTitle() {
  if (history.lastElementChild.children.length === 0) {
    history.firstElementChild.classList.add("hidden");
  } else {
    history.firstElementChild.classList.remove("hidden");
  }
}

export function showError(msg = "Введите название города!") {
  loading.classList.add("hidden");
  cardResult.classList.add("hidden");
  messageError.classList.remove("hidden");
  messageError.textContent = msg;
}

export function showLoading() {
  messageError.classList.add("hidden");
  cardResult.classList.add("hidden");
  loading.classList.remove("hidden");
}

export function showCard() {
  loading.classList.add("hidden");
  messageError.classList.add("hidden");
  cardResult.classList.remove("hidden");
}

export function renderHistory(historyArray) {
  if (!historyList) {
    return;
  } else {
    historyList.innerHTML = `
    ${historyArray.map((city) => `<li>${city}</li>`).join("")}
  `;
  }
  toggleHistoryTitle();
}
