function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    
   icon.innerHTML = `<img class="weather-app-icon" src="${response.data.condition.icon_url}">`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    speedElement.innerHTML = `${response.data.wind.speed} mph`;

    temperatureElement.innerHTML = Math.round(temperature)
    
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday", "Sunday"];
    let day = days[date.getDay()];
if (minutes < 10) {
    minutes = `0${minutes}`;
}

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
let apiKey = "b34d09956e750a0813ab300t7o728b4f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
searchCity(searchInput.value)
}

function displayForecast() {
let forecastElement = document.querySelector("#forecast");
let days = ["Tues", "Wed", "Thu", "Fri", "Sat",];
let forecastHtml = "";

days.forEach(function(day){
forecastHtml = forecastHtml + `
            <div class="weather-forecast-day">
                <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-icon">⛅</div>
               <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                <strong>18°</strong>
                </div>
               <div class = "weather-forecast-temperature">12°</div>
                </div>
            </div>
     `;
});
forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Seattle");
displayForecast();
