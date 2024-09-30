const form = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const notesInput = document.getElementById("notes");
const notesList = document.getElementById("list");

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => {
        addNoteToList(note.title, note.content);
    });
}

function addNoteToList(noteTitle, noteContent) {
    const listItem = document.createElement("li");
    const titleElement = document.createElement("h3");
    const contentElement = document.createElement("p");
    const deleteButton = document.createElement("button");

    titleElement.textContent = noteTitle;
    contentElement.textContent = noteContent;
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", function() {
        notesList.removeChild(listItem);
        removeNoteFromLocalStorage(noteTitle);
    });

    listItem.appendChild(titleElement);
    listItem.appendChild(contentElement);
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
}

function saveNoteToLocalStorage(noteTitle, noteContent) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title: noteTitle, content: noteContent });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function removeNoteFromLocalStorage(noteTitle) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.title !== noteTitle);
    localStorage.setItem("notes", JSON.stringify(notes));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const noteTitle = titleInput.value.trim();
    const noteContent = notesInput.value.trim();

    if (noteTitle && noteContent) {
        addNoteToList(noteTitle, noteContent);
        saveNoteToLocalStorage(noteTitle, noteContent);

        titleInput.value = "";
        notesInput.value = "";
    }
});

loadNotes();