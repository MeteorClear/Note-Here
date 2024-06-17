# Note Here Chrome Extension

## Overview
The Note Here Chrome Extension is a simple tool designed to create, view, and manage notes directly within the browser. This extension is perfect for users who need a quick and easy way to jot down and organize notes while browsing.

## Features
- **Note Creation**: Create new notes directly from the extension popup.
- **Note Viewing**: View a list of existing notes and access their details.
- **Note Editing**: Edit the content of existing notes.
- **Note Deletion**: Delete notes that are no longer needed.

## How It Works
- **Main Page**: Displays a list of all created notes with the option to create a new note.
- **Note Page**: Provides a detailed view of a selected note, with options to edit or delete the note.
- **Note Storage**: Notes are stored using Chrome's chrome.storage.sync API, ensuring they are available across all devices where the user is logged into Chrome.

## Installation
- **Installation using the Chrome Web Store**
  1. Open the Webstore link to this extension 
    [https://chromewebstore.google.com/detail/note-here/fpnjeoefigaffdbodpcigklkifbfjala](https://chromewebstore.google.com/detail/note-here/fpnjeoefigaffdbodpcigklkifbfjala)
  2. Click "Add to Chrome"

- **Manual Installation**
  1. Clone this repository or download the extension package.
  2. Open Chrome and navigate to `chrome://extensions/`.
  3. Enable "Developer mode" at the top right corner.
  4. Click "Load unpacked" and select the folder containing the extension files.
  5. The Note Here extension icon will now appear in your toolbar for easy access.

## Usage
- **Creating Notes**: Click on the extension icon to open the popup, then click the "+" button to create a new note. Enter the note content and click "Save Note".
- **Viewing Notes**: In the main popup window, you will see a list of all notes. Click on a note to view its details.
- **Editing Notes**: While viewing a note, make any changes to the content and click "Save Changes".
- **Deleting Notes**: Click the "Delete Note" button to remove a note permanently.