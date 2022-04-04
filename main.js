import getSelectCities from './selectCities.js'

const select = document.getElementById('selectCities');

const apiKey = '8b453078a3152e2271a388adfa37a904';
const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const temperatureKelvin = 273;

function getWeather() {
    try {
        select.addEventListener('change', () => {
            citiesList.forEach(city => {
                if (city.name === select.value) {
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}`)
                        .then(response => response.json())
                        .then(result => {
                            displayWeatherOnFiveDays(result)
                        }
                        )
                }
            })
        })
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function displayWeatherOnFiveDays(result) {
    for (let index = 0; index < 5; index++) {
        document.getElementById("weather-forecast").hidden = false;
        const currentDay = (day + index) > 6 ? (day + index - 7) : (day + index);
        document.getElementById(`dayWeek${index + 1}`).innerHTML = `${days[currentDay]}`;
        document.getElementById(`temperatureDay${index + 1}`).innerHTML = `Температура воздуха : ${Math.ceil(result.daily[index].temp.day - temperatureKelvin)} °С`;
        document.getElementById(`humidityDay${index + 1}`).innerHTML = `Влажность : ${result.daily[index].humidity} %`;
        document.getElementById(`windDay${index + 1}`).innerHTML = `Скорость ветра : ${Math.ceil(result.daily[index].wind_speed)} м/с`;
        (result.daily[index].weather).forEach(elem => {
            document.getElementById(`imgWeatherDay${index + 1}`).setAttribute('src', `http://openweathermap.org/img/wn/${elem.icon}@2x.png`);
        })
    }
}

document.getElementById("weather-forecast").hidden = true;
const day = new Date().getDay();
let citiesList = getSelectCities();
getWeather();
