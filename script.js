const inputSearch = document.getElementById('inputSearch');
const searchBtn = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');
const temperature = document.getElementById('temperature');
const cityElement = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const imgWeather = document.getElementById('imgWeather');
const keyAPI = '';
const keyAPITimeZone = ''

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchWeather(inputSearch.value);
});

const weatherImages = {
  'Clouds': './images/nuageux.png',
  'Clear': './images/soleil.png',
  'Rain': './images/pluvieux.png',
  'Snow': './images/neigeux.png',
  'Thunderstorm': './images/tempete.png',
  'default': './images/nuageux.png'
};

async function fetchWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}&units=metric&lang=fr`)
  const weatherData = await response.json();
  console.log(weatherData);

  temperature.innerHTML = Math.round(weatherData.main.temp) + '°C';
  cityElement.innerHTML = weatherData.name;
  humidity.innerHTML = `${weatherData.main.humidity}%`;
  wind.innerHTML = `${weatherData.wind.speed} km/h`;

  const localisation = weatherData.coord;
  getTimeZone(localisation.lat, localisation.lon);


  imgWeather.src = weatherImages[weatherData.weather[0].main] || weatherImages.default;
  document.getElementById('weather').classList.remove('hidden');
};

// change background depending on the weather and the time of day
function changeBackground(hours) {
  const main = document.getElementById('main');
  const newClass = (hours >= 6 && hours < 18) ? 'day' : 'night';
  const oldClass = (newClass === 'day') ? 'night' : 'day';
  main.classList.replace(oldClass, newClass);
}



async function getTimeZone(lat, lon) {
  const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${keyAPITimeZone}&format=json&by=position&lat=${lat}&lng=${lon}`)
  const data = await response.json();
  const hours = data.formatted.slice(11, 13);
  changeBackground(hours);
}