const yargs = require('yargs');
const notes = require('./notes');

/**
 * Adding new notes
 */
yargs.command({
    command: 'add',
    descrribe: 'Add a new note',
    builder: {
        title: {
            descrribe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            descrribe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

/**
 * Removing existing notes
 */
yargs.command({
    command: 'remove',
    descrribe: 'Remove a new note',
    builder: {
        title: {
            descrribe: "Note title to remove",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
});

/**
 * Read a specific notes
 */
yargs.command({
    command: 'read',
    descrribe: 'Read a note',
    builder: {
        title: {
            descrribe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.getNote(argv.title);
    }
});

/**
 * Read all notes list
 */
yargs.command({
    command: 'list',
    descrribe: 'Notes list',
    handler() {
        notes.getNotesList();
    }
});

yargs.parse();