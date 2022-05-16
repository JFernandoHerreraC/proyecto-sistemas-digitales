let arrayTemperature = [];
let arrayGases = [];

function calculetorMediumTemperatureAndGases() {
    let calculationTemperature = 0;
    let presenceOfGases = 0;
    let notPresenceOfGases = 0;
    if (arrayTemperature.length >= 5) {
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
        console.log(calculationTemperature);
        console.log(presenceOfGases);
        console.log(notPresenceOfGases);
        /*Aquí ya se guarda en la base de datos */
    }
}

const home = (req, res) => {
    res.send('Hello world!!!');
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