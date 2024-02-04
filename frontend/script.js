const inputSearch = document.getElementById('inputSearch');
const searchForm = document.getElementById('searchForm');
const temperature = document.getElementById('temperature');
const cityElement = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const imgWeather = document.getElementById('imgWeather');
// const time = document.getElementById('hours');


searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  fetchWeather(inputSearch.value);
});

const weatherImages = {
  'Clouds': './images/nuageux.png',
  'Clear': './images/soleil.png',
  'Rain': './images/pluvieux.png',
  'Snow': './images/neigeux.png',
  'Thunderstorm': './images/tempete.png',
  'Mist': './images/brumeux.png',
  'default': './images/nuageux.png',
};

async function fetchWeather(city) {
  const input = inputSearch.value;
  try {
    const response = await fetch('https://weather-app-ezo-api.vercel.app/api/weather/recherche', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city: input })
    });
    const weatherData = await response.json();
    console.log(weatherData);
    temperature.innerHTML = Math.round(weatherData.main.temp) + '°C';
    cityElement.innerHTML = weatherData.name;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${weatherData.wind.speed} km/h`;

    const localisation = weatherData.coord;
    fetchGetTimeZone(localisation.lat, localisation.lon);
    imgWeather.src = weatherImages[weatherData.weather[0].main] || weatherImages.default;
    document.getElementById('weather').classList.remove('hidden');
  } catch (error) {
    throw new Error(error);
  }
}

function changeBackground(hours) {
  const main = document.getElementById('main');
  const newClass = (hours >= 6 && hours < 18) ? 'day' : 'night';
  const oldClass = (newClass === 'day') ? 'night' : 'day';
  main.classList.replace(oldClass, newClass);
}

async function fetchGetTimeZone(lat, lon) {
  const response = await fetch(`https://weather-app-ezo-api.vercel.app/api/weather/timezone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lat: lat, lon: lon })
  });

  const data = await response.json();
  console.log(data);
  const hours = data.formatted.slice(11, 13);
  changeBackground(hours);
}