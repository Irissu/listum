const modalWindow = document.getElementById("modal-window");
const cancel = document.getElementById("cancel");
const submit = document.getElementById("submit");
const wrapper = document.querySelector(".wrapper");
const addNewNote = document.querySelector(".postit.new-note");
const titleModal = modalWindow.querySelector("input");
const textModal = modalWindow.querySelector("textarea");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("open-modal")) {
    modalWindow.classList.add("modal");
  }
});

cancel.addEventListener("click", function () {
  titleModal.value = "";
  textModal.value = "";
  modalWindow.classList.remove("modal");
});

window.addEventListener("click", function (event) {
  if (event.target === modalWindow) {
    modalWindow.classList.remove("modal");
  }
});

wrapper.addEventListener("click", function (event) {
  const closeEdit = event.target.closest("button");
  if (closeEdit && closeEdit.classList.contains("edit-note")) {
    console.log("I'm editing my note");
  }
});

document.querySelectorAll(".delete-note").forEach(element => element.addEventListener(
  "click", () => {
    console.log("hi, I'm a delete button");
  }
));

function loadNotes() {
  document.querySelectorAll(".note").forEach(element => element.remove());
  const notes = getNotesLS();
  notes.forEach((note) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("postit", "note");
    newDiv.innerHTML = `
    <h4 class="postit-title">${note.title}</h4>
        <p class="postit-text">${note.description}</p>
        <div class="info-note">
          <small class="postit-date">${note.date}</small>
          <div>
            <button class="edit-note"><i class="fa-solid fa-pencil"></i></button>
            <button class="delete-note"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`;
    addNewNote.insertAdjacentElement("afterend", newDiv);
  });
}
loadNotes();

submit.addEventListener("click", function (event) {
  console.log("Hi!, you clicked on the submit button");
  event.preventDefault();
  const noteTitle = titleModal.value;
  const noteText = textModal.value;
  const dateObj = new Date();
  const dateFormated = dateObj.toLocaleDateString();

  if (noteTitle && noteText) {
    console.log(`${noteTitle} ${noteText} ${dateFormated}`);
    const note = {
      title: noteTitle,
      description: noteText,
      date: dateFormated
    };

    const notes = getNotesLS();
    notes.push(note);
    saveNote(notes);
    loadNotes();
    cancel.click();
  } else {
    console.log("Debes rellenar los campos de titulo y mensaje.");
  }
});

getNotesLS().forEach((note) => {
  console.log("I'm a forEach");
  console.log(note);
});

function getNotesLS() {
  return JSON.parse(localStorage.getItem("notesParsed") || "[]");
}

function saveNote(note) {
  localStorage.setItem("notesParsed", JSON.stringify(note));
}
