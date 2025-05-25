const input = document.querySelector('.input-box');
const button = document.getElementById('searchbtn');
const image = document.querySelector('.weather-img');
const tempreture = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');

const locationError = document.querySelector('.location');
const weather = document.querySelector('.weather-body');

async function weatherCheck(city) {
    const api_key = '5f248cd20181793df39664f521190bb6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const response = await fetch(`${url}`).then(res => res.json());
    let data = response;
    if (data.cod === `404`) {
        locationError.style.display = "flex";
        weather.style.display = "none";
        alert('City not found');
        return;
    }
    
     console.log(data);
     
    locationError.style.display = "none";
    weather.style.display = "flex";

    tempreture.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed} km/h`;

    switch (data.weather[0].main) {
        case 'Clouds':
            image.src = 'assets/clouds.png';
            break;
        case 'Clear':
            image.src = 'assets/clear.png';
            break;
        case 'Rain':
            image.src = 'assets/rain.png';
            break;
        case 'Mist':
            image.src = 'assets/mist.png';
            break;
        case 'Snow':
            image.src = 'assets/snow.png';
            break;
        default:
            image.src = '';
    }


}

button.addEventListener('click', () => {
    weatherCheck(input.value);
});
