const path = require('path');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

let db;

const file = path.join(__dirname + '/database/db.json');

const structure = {
    "temperaturePerMinute": [],
    "hourlyTemperature": [],
    "temperaturePerDay": []
}

async function createConnection() {
    const adapter = new FileAsync(file);
    db = await low(adapter);
    db.defaults(structure).write();
}

const getConnection = () => db;

module.exports = {
    createConnection,
    getConnection
}