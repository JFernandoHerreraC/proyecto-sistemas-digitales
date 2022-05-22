const path = require('path');
const fs = require('fs');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const dir = path.join(__dirname + '/database');
let db;

const file = dir + '/db.json';

const structure = {
    "temperaturePerMinute": [],
    "hourlyTemperature": [],
    "temperaturePerDay": []
}

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
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