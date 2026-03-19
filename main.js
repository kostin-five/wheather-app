const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");
const messageError = document.querySelector("#errorMessage");
const loading = document.querySelector("#loadingMessage");
const cardResult = document.querySelector("#weatherCard");
const lastBtn = document.querySelector("#lastSearchBtn");
const history = document.querySelector(".history");

if (history.lastElementChild.children.length === 0) {
  history.firstElementChild.classList.add("hidden");
} else {
  history.firstElementChild.classList.remove("hidden");
}

function showError() {
  loading.classList.add("hidden");
  cardResult.classList.add("hidden");
  messageError.classList.remove("hidden");
  messageError.textContent = "Введите название города!";
}

function showLoading(city) {
  messageError.classList.add("hidden");
  cardResult.classList.add("hidden");
  loading.classList.remove("hidden");
  console.log(city);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = input.value.trim();

  if (city === "") {
    showError();
  } else {
    showLoading(city);
  }
  input.value = "";
});
