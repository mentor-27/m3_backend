const yargs = require('yargs');
const { version } = require('./package.json');
const { addNote, printNotes, removeNote } = require('./notes.controller');

yargs.version(version);

yargs.command({
  command: 'add',
  describe: 'Add new note',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  handler({ title }) {
    addNote(title);
  }
});

yargs.command({
  command: 'list',
  describe: 'Show all notes',
  async handler() {
    console.log(await printNotes());
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true
    }
  },
  async handler({ id }) {
    await removeNote(id);
  }
});

yargs.parse();
