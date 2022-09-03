// Select Dom Ui
const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

// Event Listner
button.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
