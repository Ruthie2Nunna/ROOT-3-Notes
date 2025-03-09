document.addEventListener("DOMContentLoaded", function () {
    loadNotes();

    document.getElementById("addNoteBtn").addEventListener("click", addNote);
});

function addNote() {
    let title = document.getElementById("noteTitle").value.trim();
    let description = document.getElementById("noteDescription").value.trim();
    let tag = document.getElementById("noteTag").value;

    if (title === "" || description === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, description, tag });
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteDescription").value = "";
    loadNotes();
}

function loadNotes() {
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let categories = {};

    notes.forEach((note, index) => {
        if (!categories[note.tag]) {
            categories[note.tag] = document.createElement("div");
            categories[note.tag].classList.add("tag-box");
            categories[note.tag].innerHTML = `<h3>${note.tag}</h3>`;
            notesContainer.appendChild(categories[note.tag]);
        }

        let noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `<strong>${note.title}</strong><br>${note.description} 
        <button class="edit" onclick="editNote(${index})">✏️</button>
        <button class="delete" onclick="deleteNote(${index})">🗑️</button>`;
        categories[note.tag].appendChild(noteElement);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let note = notes[index];

    document.getElementById("noteTitle").value = note.title;
    document.getElementById("noteDescription").value = note.description;
    document.getElementById("noteTag").value = note.tag;

    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}
