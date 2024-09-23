const modalWindow = document.getElementById("modal-window");
const cancel = document.getElementById("cancel");
const submit = document.getElementById("submit");
const wrapper = document.querySelector(".wrapper");
const addNewNote = document.querySelector(".postit.new-note");
const headerModal = modalWindow.querySelector("h2");
const titleModal = modalWindow.querySelector("input");
const textModal = modalWindow.querySelector("textarea");
const DATA_ACTION = "data-action";
const DATA_INDEX = "data-index";

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("open-modal")) {
    modalWindow.classList.add("modal");
    const action = event.target.getAttribute(DATA_ACTION);
    if (action === "create") {
      headerModal.textContent = "New Note";
      titleModal.value = "";
      textModal.value = "";
      submit.setAttribute(DATA_ACTION, "create");
    }
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

function loadNotes() {
  document.querySelectorAll(".note").forEach(element => element.remove());
  const notes = getNotesLS();
  notes.forEach((note, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("postit", "note");
    newDiv.innerHTML = `
    <h4 class="postit-title">${note.title}</h4>
        <p class="postit-text">${note.description}</p>
        <div class="info-note">
          <small class="postit-date">${note.date}</small>
          <div>
            <button class="edit-note" data-action="edit" edit-index="${index}"><i class="fa-solid fa-pencil"></i></button>
            <button class="delete-note" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`;
    addNewNote.insertAdjacentElement("afterend", newDiv);
  });

  // event for detete notes
  wrapper.querySelectorAll(".delete-note").forEach(buttonTrash => {
    buttonTrash.addEventListener("click", function () {
      const noteIndex = this.getAttribute(DATA_INDEX);
      deleteNote(noteIndex);
    });
  });

  // event for updade notes
  wrapper.querySelectorAll(".edit-note").forEach(buttonEdit => {
    buttonEdit.addEventListener("click", function () {
      const editIndex = this.getAttribute("edit-index");
      editNote(editIndex);
    });
  });
}
loadNotes();

submit.addEventListener("click", function (event) {
  event.preventDefault();
  const noteTitle = titleModal.value;
  const noteText = textModal.value;
  const dateObj = new Date();
  const dateFormated = dateObj.toLocaleDateString();
  const action = submit.getAttribute(DATA_ACTION);

  if (noteTitle && noteText) {
    const notes = getNotesLS();
    if (action === "create") {
      const note = {
        title: noteTitle,
        description: noteText,
        date: dateFormated
      };
      notes.push(note);
    } else if (action === "edit") {
      const noteIndex = submit.getAttribute(DATA_INDEX);
      notes[noteIndex].title = noteTitle;
      notes[noteIndex].description = noteText;
      notes[noteIndex].date = dateFormated;
    }

    saveNote(notes);
    loadNotes();
    cancel.click();
  } else {
    alert("All fields must be filled in.");
  }
});

getNotesLS().forEach((note) => {
  console.log(note);
});

function getNotesLS() {
  return JSON.parse(localStorage.getItem("notesParsed") || "[]");
}

function saveNote(note) {
  localStorage.setItem("notesParsed", JSON.stringify(note));
}

function deleteNote(index) {
  const confirmDelete = confirm("Are you sure you want to delete this note?");
  if (!confirmDelete) return;
  console.log(`deleting note with index...: ${index}`);
  const notes = getNotesLS();
  notes.splice(index, 1);
  saveNote(notes);
  loadNotes();
}

function editNote(index) {
  modalWindow.classList.add("modal");
  headerModal.textContent = "Edit note";
  const notes = getNotesLS();
  const noteToEdit = notes[index];
  titleModal.value = noteToEdit.title;
  textModal.value = noteToEdit.description;
  submit.setAttribute(DATA_ACTION, "edit");
  submit.setAttribute(DATA_INDEX, index);
}
