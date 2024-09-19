console.log("Hellooo");
const modalWindow = document.getElementById("modal-window");
const cancel = document.getElementById("cancel");
const submit = document.getElementById("submit");
const wrapper = document.querySelector(".wrapper");
const titleModal = modalWindow.querySelector("input");
const textModal = modalWindow.querySelector("textarea");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("open-modal")) {
    modalWindow.classList.add("modal");
  }
});

cancel.addEventListener("click", function () {
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
    console.log("hi, Im a delete button");
  }
));

submit.addEventListener("click", function (event) {
  console.log("Hi!!");
  event.preventDefault();
  const noteTitle = titleModal.value;
  const noteText = textModal.value;
  const dateObj = new Date();
  const dateFormated = dateObj.toLocaleDateString();

  // esto podria ser una funcion aparte que se le de como parametro noteTitle y noteText, crea el objeto  y lo devuelve
  if (noteTitle && noteText) {
    // aqui borro mensaje de error si existe
    console.log(`${noteTitle} ${noteText} ${dateFormated}`);
    const note = {
      title: noteTitle,
      description: noteText,
      date: dateFormated
    };

    const notes = getNotesLS(); // recojo todas las notas que hay en LS, esto es un array
    notes.push(note); // añado la nuevan ota en el array (recuerda, esto no es el LS)
    // aqui deberia ir una funcion que recoge un array de notas y crea en HTML con ellas????
    saveNote(notes); // guardo las notas en el LS (el array)
    cancel.click(); // igual que si hubiese hecho click en cancel
  } else {
    console.log("Debes rellenar los campos de titulo y mensaje.");
    // aqui quiero meter un mensaje de error
  }
});

/* FUNCIONES QUE TENGO QUE HACER
1 - saveNote() FUNCION QUE GUARDE UNA NOTA EN LOCAL STORAGE

2 - showNotes() FUNCION QUE MUESTRE TODAS LAS NOTAS GUARDADAS. SE EJECUTA AL PRINCIPIO DEL SCRIPT SIEMPRE

3- deleteNote() FUNCION QUE BORRA UNA NOTA DE LOCAL STORAGE, LUEGO  MUESTRA DE NUEVO LAS NOTAS

4- editNote() FUNCION QUE EDITA UNA NOTA DE LOCAL STORAGE, LUEGO  MUESTRA DE NUEVO LAS NOTAS

MODAL NEW NOTE: SUBMIT BUTTON HACE: COMPRUEBA QUE LA NOTA NO ESTE VACÍA. SI NO ESTÁ VACIA LA CREA  saveNote() y luego showNotes()
MODAL EDIT NOTE: EDIT BUTTON HACE:
*/

getNotesLS().forEach((note) => {
  /* const noteElement = createNoteDOM(note.id, note.title, note.content); */
  console.log("I'm a forEach");
  console.log(note);
});

function getNotesLS() {
  // returns the array of notes saved in LogalStorage
  return JSON.parse(localStorage.getItem("notesParsed") || "[]");
}

function saveNote(note) {
  // guardamos la nota en local storage, es un objeto notes, pero primero lo pasamos a JSON
  localStorage.setItem("notesParsed", JSON.stringify(note));
}

function createNoteDOM(id, title, content) {
  notes = getNotesLS();
}
