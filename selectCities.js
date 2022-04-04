const select = document.getElementById('selectCities');
const url = 'https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json';

export default function getSelectCities() {
    let citiesList = [];
    try {
        fetch(url)
            .then(response => response.json())
            .then(result => result.forEach(element => {
                element.regions.forEach(region => {
                    region.cities.forEach(city => {
                        citiesList.push(city);
                    })
                })
                citiesList.map(city => city.name).sort().forEach(name => {
                    const opt = document.createElement('option');
                    select.appendChild(opt);
                    opt.innerHTML = name;
                })
            }));
        return citiesList;
    } catch (error) {
        console.error('Ошибка:', error);
    }

}
