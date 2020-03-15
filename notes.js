const fs = require('fs');
const chalk = require('chalk');

const log = console.log;

const addNotes = (title, body) => {
    let notes = loadNotes();
    const noteIndex = notes.findIndex(v => v.title.toLowerCase() === title.toLowerCase());
    if (noteIndex != -1) { log(chalk.red.inverse(`Notes with title: ${title} already exist`)); return; }
    notes.push({
        title,
        body
    });
    saveNotes(notes);
    log(chalk.green.inverse(`Notes saved`));
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const noteIndex = notes.findIndex(v => v.title.toLowerCase() === title.toLowerCase());
    if (noteIndex != -1) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        log(chalk.green.inverse(`Notes with title: ${title} removed`));
    } else {
        log(chalk.red.inverse(`Notes with title: ${title} not found`));
    }
}

const getNote = (title) => {
    const note = loadNotes().find(v => v.title === title);
    note ? log(chalk.inverse(`Title: ${note.title}, Body: ${note.body}`)) : log(chalk.red.inverse(`Notes with title: ${title} not found`));
}

const getNotesList = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        log(chalk.inverse(`Title: ${note.title}, Body: ${note.body}`));
    });
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON);
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    getNotesList: getNotesList,
    getNote: getNote
};