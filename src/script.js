// date & time
function formatDate(timestamp) {
  let date = new Date(timestamp)

  let hours = date.getHours()
  if (hours < 10) {
    let hours = `0${hours}`
  }
  let min = date.getMinutes()
  if (min < 10) {
    let min = `0${min}`
  }
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]

  let today = date.getDate()

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let month = months[date.getMonth()]

  let year = date.getFullYear()
  return `${day} ${today}th ${month} ${year}   ${hours}:${min}`
}

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000)
  let day = date.getDay()
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return days[day]
}
function displayForecast(response) {
  let forecast = response.data.daily
  let forecastElement = document.querySelector('#forecast')
  let forecastHTML = `<div class="row">`
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <h5 class="forecast-date">${formatForecast(forecastDay.dt)}</h5>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              class="forecast-image"
              alt=""
              width="85"
            />
              <p class="forecast-temperature">
                <strong>${Math.round(forecastDay.temp.max)}°</strong>
                ${Math.round(forecastDay.temp.min)}°
              </p>
          </div>`
    }
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML
}

//search function

function handleCity(event) {
  event.preventDefault()
  let input = document.querySelector('#city')
  let h1 = document.querySelector('h1')
  h1.innerHTML = input.value
}
let entercitybutton = document.querySelector('#city-input')
entercitybutton.addEventListener('submit', handleCity)

function getForecast(coordinates) {
  console.log(coordinates)
  let apiKey = '8a55dc67b7be1b3bb161f3d1b6563536'
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(displayForecast)
}

function showTemperature(response) {
  document.querySelector('h1').innerHTML = response.data.name

  let dateElement = document.querySelector('#date')
  dateElement.innerHTML = formatDate(response.data.dt * 1000)

  celsiusTemperature = response.data.main.temp
  let strongElement = document.querySelector('#temperature')
  strongElement.innerHTML = Math.round(celsiusTemperature)

  let iconElement = document.querySelector('#icon')
  let icon = response.data.weather[0].icon
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${icon}@2x.png`,
  )

  let spanElement = document.querySelector('#condition')
  spanElement.innerHTML = response.data.weather[0].description

  let pressureElement = document.querySelector('#pressure')
  pressureElement.innerHTML = response.data.main.pressure

  let windElement = document.querySelector('#windspeed')
  windElement.innerHTML = response.data.wind.speed

  let humidityElement = document.querySelector('#humidity')
  humidityElement.innerHTML = response.data.main.humidity

  getForecast(response.data.coord)
}

function cityTemperature(event) {
  event.preventDefault()
  let input = document.querySelector('#city')
  let city = input.value
  let apiKey = '8a55dc67b7be1b3bb161f3d1b6563536'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature)
}

entercitybutton.addEventListener('submit', cityTemperature)

//change Fahrenheit Celsius

function changeTemp(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector('strong')
  celsius.classList.remove('active')
  fahrenheit.classList.add('active')
  let temperature = temperatureElement.innerHTML
  temperatureElement.innerHTML = Math.round(celsiusTemperature * 1.8 + 32)
}

function changeBack(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector('strong')
  celsius.classList.add('active')
  fahrenheit.classList.remove('active')
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
}

let celsiusTemperature = null

let fahrenheit = document.querySelector('#fahrenheit-link')
fahrenheit.addEventListener('click', changeTemp)

let celsius = document.querySelector('#celsius-link')
celsius.addEventListener('click', changeBack)

//Current location
function showPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiKey = '8a55dc67b7be1b3bb161f3d1b6563536'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature)
}

function getPosition(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(showPosition)
}

let currentLocationButton = document.querySelector('button')
currentLocationButton.addEventListener('click', getPosition)
