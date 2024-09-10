console.log("Hellooo");
const modalWindow = document.getElementById("modal-window");
const cancel = document.getElementById("cancel");
const submit = document.getElementById("submit");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("open-modal")) {
    modalWindow.style.display = "block";
  }
});

cancel.addEventListener("click", function () {
  modalWindow.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modalWindow) {
    modalWindow.style.display = "none";
  }
});

submit.addEventListener("click", function () {
  console.log("Hi!!");
});
