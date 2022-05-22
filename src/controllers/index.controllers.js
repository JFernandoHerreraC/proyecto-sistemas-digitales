const { getConnection } = require('../database');
const { v4 } = require('uuid');
let arrayTemperature = [];
let arrayGases = [];

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
            "notPresenceOfGases": notPresenceOfGases
        }
        await getConnection().get('temperaturePerMinute').push(temperaturePerMinute).write();
        arrayTemperature = [];
        arrayGases = [];
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
        response =  {
            "id": 0,
            "temperatureMedium": 0,
            "presenceOfGases": 0,
            "notPresenceOfGases": 0
          }
    }

    res.json(response.pop());
}

const receivedTemp = (req, res) => {
    const { temperature, gases } = req.query;
    arrayTemperature.push(parseFloat(temperature));
    arrayGases.push(gases);
    calculetorMediumTemperatureAndGases();
    res.send('received the data');
}

const notFound = (req, res) => {
    res.send('Route not found!')
}

module.exports = {
    home,
    receivedTemp,
    notFound
}