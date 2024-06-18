const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    id: Date.now().toString(),
    title,
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.white.bgGreen(' Note added '));
}

async function editNote(noteId, newTitle) {
  const notes = await getNotes();
  const pos = notes.findIndex(({ id }) => noteId === id);

  notes[pos].title = newTitle;

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.white.bgBlue(' Note edited '));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  if (!notes.length) console.log(chalk.yellow('List is empty'));
  else {
    console.log(chalk.bold.black.bgBlue(' Notes list: '));
    notes.forEach(note => {
      console.log(chalk.cyan(note.id), chalk.greenBright(note.title));
    });
  }
}

async function removeNote(noteId) {
  let notes = await getNotes();

  notes = notes.filter(({ id }) => noteId !== id);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.black.bgYellow(' Note removed '));
}

module.exports = {
  addNote,
  removeNote,
  editNote,
  printNotes,
};
