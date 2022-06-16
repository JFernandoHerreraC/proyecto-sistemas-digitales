const { getConnection } = require('../database');
const { v4 } = require('uuid');
require('../webpush');
let arrayTemperature = [];
let arrayGases = [];

function getTime() {
    const tiempoTrans = Date.now();
    const day = new Date (tiempoTrans)
    return day.toDateString();
}

async function calculetorMediumTemperatureAndGases() {
    let calculationTemperature = 0;
    let presenceOfGases = 0;
    let notPresenceOfGases = 0;
    if (arrayTemperature.length >= 60) {
        arrayTemperature.forEach((temp) => {
            calculationTemperature = calculationTemperature + temp;
        });
        arrayGases.forEach((gas) => {
            if (gas === 'Sin_Presencia_Gases') {
                notPresenceOfGases++;
            } else {
                presenceOfGases++;
            }
        });
        calculationTemperature = calculationTemperature / arrayTemperature.length;
        /*Aquí ya se guarda en la base de datos */
        const temperaturePerMinute = {
            "id": v4(),
            "temperatureMedium": calculationTemperature,
            "presenceOfGases": presenceOfGases,
            "notPresenceOfGases": notPresenceOfGases,
            "Time": getTime()
        }
        await getConnection().get('temperaturePerMinute').push(temperaturePerMinute).write();
        arrayTemperature = [];
        arrayGases = [];
    }
    if (getConnection().get('temperaturePerMinute').value().length >= 60) {
        const temps = await getConnection().get('temperaturePerMinute').value();
        temps.forEach((temp) => {
            calculationTemperature = calculationTemperature + temp.temperatureMedium;
            presenceOfGases = presenceOfGases + temp.presenceOfGases;
            notPresenceOfGases = notPresenceOfGases + temp.notPresenceOfGases;
        });
        calculationTemperature = calculationTemperature / temps.length;
        presenceOfGases = presenceOfGases / temps.length;
        notPresenceOfGases = notPresenceOfGases / temps.length;
        const hourlyTemperature = {
            "id": v4(),
            "temperatureMedium": calculationTemperature,
            "presenceOfGases": presenceOfGases,
            "notPresenceOfGases": notPresenceOfGases,
            "Time": getTime()
        }
        await getConnection().get('hourlyTemperature').push(hourlyTemperature).write();
        await getConnection().set('temperaturePerMinute', []).write();
    }
    if (getConnection().get('hourlyTemperature').value().length >= 24) {
        const temps = await getConnection().get('hourlyTemperature').value();
        temps.forEach((temp) => {
            calculationTemperature = calculationTemperature + temp.temperatureMedium;
            presenceOfGases = presenceOfGases + temp.presenceOfGases;
            notPresenceOfGases = notPresenceOfGases + temp.notPresenceOfGases;
        });
        calculationTemperature = calculationTemperature / temps.length;
        presenceOfGases = presenceOfGases / temps.length;
        notPresenceOfGases = notPresenceOfGases / temps.length;
        const temperaturePerDay = {
            "id": v4(),
            "temperatureMedium": calculationTemperature,
            "presenceOfGases": presenceOfGases,
            "notPresenceOfGases": notPresenceOfGases,
            "Time": getTime()
        }
        await getConnection().get('temperaturePerDay').push(temperaturePerDay).write();
        await getConnection().set('hourlyTemperature', []).write();
    }
}

const home = async (req, res) => {
    let response;

    const minute = await getConnection().get('temperaturePerMinute');
    const hour = await getConnection().get('hourlyTemperature');
    const day = await getConnection().get('temperaturePerDay');

    if (minute.value().length !== 0) {
        response = minute;
    } else if (hour.value().length !== 0) {
        response = hour;
    } else if (day.value().length !== 0) {
        response = day;
    } else {
        response = {
            "id": 0,
            "temperatureMedium": 0,
            "presenceOfGases": 0,
            "notPresenceOfGases": 0
        }
    }
    res.render('index', { response: response.value() });
}

const receivedTemp = (req, res) => {
    const { temperature, gases } = req.query;
    arrayTemperature.push(parseFloat(temperature));
    arrayGases.push(gases);
    calculetorMediumTemperatureAndGases();
    res.send('received the data');
}

const data = async (req, res) => {
    const minute = await getConnection().get('temperaturePerMinute').value();
    const hour = await getConnection().get('hourlyTemperature').value();
    const day = await getConnection().get('temperaturePerDay').value();
    const response = {
        temperaturePerMinute: minute,
        hourlyTemperature:hour,
        temperaturePerDay: day
    }
    res.json(response);
}

const graphics = async (req, res) => {
    res.render('graphics');
}

const subscription = (req, res) => {
    console.log(req.body);
    res.status(201).json();
}

const worker = (req, res) => {
    res.writeHead(201, {
        'Content-Type': 'application/javascript'
    });
}

const notFound = (req, res) => {
    res.send('Route not found!')
}

module.exports = {
    home,
    graphics,
    receivedTemp,
    data,
    worker,
    subscription,
    notFound
}