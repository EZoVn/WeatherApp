const keyAPI = process.env.API_KEY_WEATHER;
const apiKeyTimeZone = process.env.API_KEY_TIMEZONE;


exports.getWeather = async (req, res) => {
  try {
    const city = req.body.city;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}&units=metric&lang=fr`)
    const weatherData = await response.json();
    res.json(weatherData);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.timezone = async (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;
  const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKeyTimeZone}&format=json&by=position&lat=${lat}&lng=${lon}`)
  const data = await response.json();
  res.json(data);
};