const search = document.querySelector("#search");
const searchButton = document.querySelector("#search-btn");
const currentCity = document.querySelector("#current-city");
const currentDate = document.querySelector("#current-date");
const currentTemp = document.querySelector("#current-temp");
const ddlUnits = document.querySelector("#ddlUnits");
const pFeelsLike = document.querySelector("#pFeelsLike");
const pHumidity = document.querySelector("#pHumidity");
const pWind = document.querySelector("#pWind");
const pPrecipitation = document.querySelector("#pPrecipitation");
const ddlDay = document.querySelector("#ddlDay");

searchButton.addEventListener("click", () => {
  console.log(search);

  const location = search.value;
  console.log(location);

  getLocationData(location);
});

const LAT_LONG_API =
  "https://geocoding-api.open-meteo.com/v1/search?count=10&language=en&format=json";
const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=apparent_temperature,temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m";

async function getLocationData(location) {
  const result = await fetch(`${LAT_LONG_API}&name=${location}`);
  const { results } = await result.json();

  const { latitude, longitude, name, country } = results[0];
  currentCity.textContent = name + ", " + country;
  getWeather(latitude, longitude);
}

async function getWeather(latitude, longitude) {
  let temperature_unit = "celsius";
  let wind_speed_unit = "kmh";
  let precipitation_unit = "mm";

  if (ddlUnits.value === "F") {
    temperature_unit = "fahrenheit";
    wind_speed_unit = "mph";
    precipitation_unit = "inch";
  }

  const result = await fetch(
    `${WEATHER_API}&latitude=${latitude}&longitude=${longitude}&temperature_unit=${temperature_unit}&wind_speed_unit=${wind_speed_unit}&precipitation_unit=${precipitation_unit}`
  );
  const weather = await result.json();
  console.log(weather);
  getCurrentConditions(weather);

  renderDailyForecast(weather);

  renderDaysDropdown(weather);

  renderHourlyForecast(weather);
}

function getCurrentConditions(weather) {
  const dateTime = new Date(weather.current.time);
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  console.log("hello", formattedDate);

  currentDate.textContent = formattedDate;

  const temp = Math.round(weather.current.apparent_temperature) + "\u00B0";
  currentTemp.textContent = temp;

  pFeelsLike.textContent = weather.current.temperature_2m;
  pHumidity.textContent = weather.current.relative_humidity_2m;
  pWind.textContent = `${weather.current.wind_speed_10m} ${weather.current_units.wind_speed_10m}`;
  pPrecipitation.textContent = `${weather.current.precipitation} ${weather.current_units.precipitation}`;
}

const WEATHER_MAP = {
  0: { icon: "icon-sunny.webp", label: "Clear sky" },
  1: { icon: "icon-sunny.webp", label: "Mainly clear" },
  2: { icon: "icon-partly-cloudy.webp", label: "Partly cloudy" },
  3: { icon: "icon-overcast.webp", label: "Overcast" },
  45: { icon: "icon-fog.webp", label: "Fog" },
  48: { icon: "icon-fog.webp", label: "Depositing rime fog" },
  51: { icon: "icon-drizzle.webp", label: "Light drizzle" },
  53: { icon: "icon-drizzle.webp", label: "Moderate drizzle" },
  55: { icon: "icon-drizzle.webp", label: "Dense drizzle" },
  61: { icon: "icon-rain.webp", label: "Slight rain" },
  63: { icon: "icon-rain.webp", label: "Moderate rain" },
  65: { icon: "icon-rain.webp", label: "Heavy rain" },
  71: { icon: "icon-snow.webp", label: "Light snow" },
  73: { icon: "icon-snow.webp", label: "Moderate snow" },
  75: { icon: "icon-snow.webp", label: "Heavy snow" },
  95: { icon: "icon-storm.webp", label: "Thunderstorm" },
};

const getWeatherInfo = (code) =>
  WEATHER_MAP[code] || {
    icon: "icon-error.webp",
    label: "Unknown weather condition",
  };

function renderDailyForecast(weather) {
  const tempsMin = weather.daily.temperature_2m_min;
  const tempsMax = weather.daily.temperature_2m_max;
  const days = weather.daily.time;
  const weatherCodes = weather.daily.weather_code;

  for (let day = 0; day < days.length; day++) {
    const parent = document.querySelector(`#dvForecastDay${day}`);
    parent.innerHTML = "";
    const dailyTitle = document.createElement("p");
    dailyTitle.classList.add("daily__day-title");
    dailyTitle.textContent = getDayOfWeek(days[day], "short");
    parent.append(dailyTitle);

    const dailyIcon = document.createElement("img");
    dailyIcon.src = `/assets/images/${getWeatherInfo(weatherCodes[day]).icon}`;
    dailyIcon.width = 320;
    dailyIcon.height = 320;
    dailyIcon.classList.add("daily__day-icon");
    dailyIcon.alt = getWeatherInfo(weatherCodes[day]).label;
    parent.append(dailyIcon);

    const dvDailyTempContainer = document.createElement("div");
    dvDailyTempContainer.classList.add("daily__day-temps");
    parent.append(dvDailyTempContainer);

    const maxTemp = document.createElement("p");
    maxTemp.classList.add("daily__day-high");
    maxTemp.textContent = Math.round(tempsMax[day]) + "\u00B0";
    const minTemp = document.createElement("p");
    minTemp.classList.add("daily__day-low");
    minTemp.textContent = Math.round(tempsMin[day]) + "\u00B0";

    dvDailyTempContainer.append(maxTemp);
    dvDailyTempContainer.append(minTemp);
  }
}

function renderDaysDropdown(weather) {
  const days = weather.daily.time;
  ddlDay.innerHTML = "";
  for (let day = 0; day < days.length; day++) {
    const optionEl = document.createElement("option");
    optionEl.textContent = getDayOfWeek(days[day], "long");
    optionEl.value = day;
    ddlDay.append(optionEl);
  }
}

function renderHourlyForecast(weather) {
  const current24Hours = weather.hourly.time.slice(0, 24);
  const weatherCode24Hours = weather.hourly.weather_code.slice(0, 24);
  const temp24Hours = weather.hourly.temperature_2m.slice(0, 24);
  for (let hour = 0; hour < current24Hours.length; hour++) {
    const parent = document.querySelector(`#dvForecastHour${hour}`);
    parent.innerHTML = "";
    const hourIcon = document.createElement("img");
    hourIcon.classList.add("hourly__hour-icon");
    hourIcon.src = `/assets/images/${
      getWeatherInfo(weatherCode24Hours[hour]).icon
    }`;
    hourIcon.width = 40;
    hourIcon.height = 40;
    hourIcon.alt = getWeatherInfo(weatherCode24Hours[hour]).label;
    parent.append(hourIcon);

    const hourTime = document.createElement("p");
    hourTime.classList.add("hourly__hour-time");
    hourTime.textContent = getHourOfDay(current24Hours[hour]);
    parent.append(hourTime);

    const hourTemp = document.createElement("p");
    hourTemp.classList.add("hourly__hour-temp");
    hourTemp.textContent = temp24Hours[hour] + "\u00B0";
    parent.append(hourTemp);
  }
  ddlDay.addEventListener("change", function () {
    let startIndex = this.value * 24;
    const current24Hours = weather.hourly.time.slice(
      startIndex,
      startIndex + 24
    );
    const weatherCode24Hours = weather.hourly.weather_code.slice(
      startIndex,
      startIndex + 24
    );
    const temp24Hours = weather.hourly.temperature_2m.slice(
      startIndex,
      startIndex + 24
    );
    // console.log(this.value);
    for (let hour = 0; hour < current24Hours.length; hour++) {
      const parent = document.querySelector(`#dvForecastHour${hour}`);
      parent.innerHTML = "";
      const hourIcon = document.createElement("img");
      hourIcon.classList.add("hourly__hour-icon");
      hourIcon.src = `/assets/images/${
        getWeatherInfo(weatherCode24Hours[hour]).icon
      }`;
      hourIcon.width = 40;
      hourIcon.height = 40;
      hourIcon.alt = getWeatherInfo(weatherCode24Hours[hour]).label;
      parent.append(hourIcon);

      const hourTime = document.createElement("p");
      hourTime.classList.add("hourly__hour-time");
      hourTime.textContent = getHourOfDay(current24Hours[hour]);
      parent.append(hourTime);

      const hourTemp = document.createElement("p");
      hourTemp.classList.add("hourly__hour-temp");
      hourTemp.textContent = temp24Hours[hour] + "\u00B0";
      parent.append(hourTemp);
    }
  });
}

function getDayOfWeek(date, dayLength) {
  const dateTime = new Date(date);
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: dayLength,
  });
  return formattedDate;
}

function getHourOfDay(date) {
  const dateTime = new Date(date);
  const formattedDate = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  return formattedDate;
}
