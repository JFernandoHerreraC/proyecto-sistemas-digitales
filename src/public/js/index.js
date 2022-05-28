/* let labels = ["30","31","32"];
let date = ["Fri May 27 2022","Fri May 27 2022","Fri May 27 2022"] */
let labels_minute = [];
let date_minute = [];
let labels_hour = [];
let date_hour = [];
let labels_day = [];
let date_day = [];
 const getTemps = async () => {
    const response = await fetch('/data');
    const temp = await response.json();
    
    temp.temperaturePerMinute.forEach(element => {
        labels_minute.push(element.temperatureMedium.toString());
        date_minute.push(element.Time)
    });

    temp.hourlyTemperature.forEach( element => {
        labels_hour.push(element.temperatureMedium.toString());
      date_hour.push(element.Time);
    });
    const data_minute = {
        labels: date_minute,
        datasets: [{
            label: 'temperature per Minute',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: labels_minute,
        }]
    };
    const data_hour = {
        labels: date_hour,
        datasets: [{
            label: 'temperature per hour',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: labels_hour,
        }]
    };
    const data_day = {
        labels: date_day,
        datasets: [{
            label: 'temperature per day',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: labels_day,
        }]
    };
    
    const config_minute = {
        type: 'line',
        data: data_minute,
        options: {}
    };
    const config_hour = {
        type: 'line',
        data: data_hour,
        options: {}
    };
    const config_day = {
        type: 'line',
        data: data_day,
        options: {}
    };
    
    const myChart_minute = new Chart(
        document.getElementById('graphics_minute'),
        config_minute
    );
    const myChart_hour = new Chart(
        document.getElementById('graphics_hour'),
        config_hour
    );
    const myChart_day = new Chart(
        document.getElementById('graphics_day'),
        config_day
    );
}
getTemps();  
//const labels = ['30', '30', '32', '31', '33', '40'];
