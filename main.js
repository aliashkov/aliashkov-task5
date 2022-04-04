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
    document.getElementById("weather-forecast").hidden = false;

    document.querySelectorAll('#dayWeek').forEach((elem, index) => {
        const currentDay = (day + index) > 6 ? (day + index - 7) : (day + index);
        elem.innerHTML = `${days[currentDay]}`;
    })
    document.querySelectorAll('#temperatureDay').forEach((elem, index) => {
        elem.innerHTML = `Температура воздуха : ${Math.ceil(result.daily[index].temp.day - temperatureKelvin)} °С`
    })
    document.querySelectorAll('#humidityDay').forEach((elem, index) => {
        elem.innerHTML = `Влажность : ${result.daily[index].humidity} %`;
    })
    document.querySelectorAll('#windDay').forEach((elem, index) => {
        elem.innerHTML = `Скорость ветра : ${Math.ceil(result.daily[index].wind_speed)} м/с`;
    })
    document.querySelectorAll('imgWeatherDay').forEach((elem, index) => {
        setAttribute('src', `http://openweathermap.org/img/wn/${elem.result.daily[index].weather[0].icon}@2x.png`);
    })
}

const day = new Date().getDay();
let citiesList = getSelectCities();
getWeather();
