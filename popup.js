// chrome.storage.sync used, it syncs across all devices, but data limit exist
// chrome.storage.local also take consideration, stores data on user's divices, it can store more data than above

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('create-note').addEventListener('click', function() {
        createNote();
    });

    document.getElementById('back-button').addEventListener('click', function() {
        showMainPage();
    });

    loadNotes();
});


function createNote() {
    showNotePage();

    const noteContentElement = document.getElementById('note-content');
    noteContentElement.innerHTML = `
        <textarea id="new-note-text"></textarea>
        <button id="save-note">Save Note</button>
    `;

    document.getElementById('save-note').addEventListener('click', saveNote);
}


function saveNote() {
    const noteText = document.getElementById('new-note-text').value;
    if (!noteText.trim()) {
        alert('Note content cannot be empty');
        return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getDate().toString().padStart(2, '0')}`;
  
    const note = {
        id: Date.now(), // Unique ID for the note
        content: noteText,
        date_origin: currentDate.toLocaleString(),
        date: formattedDate
    };
  
    // Save note to storage
    chrome.storage.sync.get({notes: []}, function(data) {
        const notes = data.notes;
        notes.push(note);
        chrome.storage.sync.set({notes: notes}, function() {
            showMainPage();
            loadNotes();
        });
    });
}


function loadNotes() {
    chrome.storage.sync.get({notes: []}, function(data) {
        const notesListElement = document.getElementById('notes-list');
        notesListElement.innerHTML = ''; // Clear the list
    
        data.notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <div class="note-container">
                    <div class="note-box">
                        <div class="note-content-preview">${note.content.substring(0, 1)}</div>
                    </div>
                    <div class="note-date">${note.date}</div>
                    <button class="view-note" data-id="${note.id}">View</button>
                </div>
            `;
            notesListElement.appendChild(noteElement);
    
            noteElement.querySelector('.view-note').addEventListener('click', function() {
                showNoteContent(note.id);
            });
        });
    });
}


function showNoteContent(noteId) {
    // Find the note with the given id
    chrome.storage.sync.get({notes: []}, function(data) {
        const note = data.notes.find(n => n.id === noteId);
        if (!note) return;
    
        // Switch to note page
        showNotePage();
    
        // Show note content with delete button
        const noteContentElement = document.getElementById('note-content');
        noteContentElement.innerHTML = `
            <div class="note-date">${note.date_origin}</div>
            <textarea id="note-text">${note.content}</textarea>
            <button id="save-note">Save Changes</button>
            <button id="delete-note">Delete Note</button>
        `;
    
        // Save changes event
        document.getElementById('save-note').addEventListener('click', function() {
            updateNote(noteId, document.getElementById('note-text').value);
        });
    
        // Delete note event
        document.getElementById('delete-note').addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this note?')) {
                deleteNote(noteId);
            }
        });
    });
}


function updateNote(noteId, newText) {
    chrome.storage.sync.get({notes: []}, function(data) {
        const notes = data.notes;
        const noteIndex = notes.findIndex(n => n.id === noteId);

        if (noteIndex !== -1) {
            notes[noteIndex].content = newText;
            chrome.storage.sync.set({notes: notes}, function() {
                alert('Note updated successfully!');
                showMainPage();
                loadNotes();
            });
        }
    });
}


function showMainPage() {
    document.getElementById('main-page').style.display = 'block';
    document.getElementById('note-page').style.display = 'none';
}

function showNotePage() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('note-page').style.display = 'block';
}


function deleteNote(noteId) {
    chrome.storage.sync.get({notes: []}, function(data) {
        const newNotes = data.notes.filter(note => note.id !== noteId);
        chrome.storage.sync.set({notes: newNotes}, function() {
            showMainPage(); // Return to the main page
            loadNotes(); // Reload the notes to update the list
        });
    });
}