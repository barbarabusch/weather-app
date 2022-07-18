// date & time
function todaysDate() {
  let now = new Date()
  let date = now.getDate()
  let year = now.getFullYear()
  let hour = now.getHours()
  let min = now.getMinutes()

  if (hour < 10) {
    let hour = `0${hour}`
  }

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
  let day = days[now.getDay()]

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
  let month = months[now.getMonth()]

  let today = `${day} ${date}th ${month} ${year}    ${hour}:${min}`
  return today
}

let h2 = document.querySelector('h2')
h2.innerHTML = todaysDate()

//search function

function handleCity(event) {
  event.preventDefault()
  let input = document.querySelector('#city')
  let h1 = document.querySelector('h1')
  h1.innerHTML = input.value
}
let entercitybutton = document.querySelector('#city-input')
entercitybutton.addEventListener('submit', handleCity)

function showTemperature(response) {
  console.log(response.data)
  document.querySelector('h1').innerHTML = response.data.name

  let strongElement = document.querySelector('#temperature')
  strongElement.innerHTML = Math.round(response.data.main.temp)

  let spanElement = document.querySelector('#condition')
  spanElement.innerHTML = response.data.weather[0].description

  let pressureElement = document.querySelector('#pressure')
  pressureElement.innerHTML = response.data.main.pressure

  let windElement = document.querySelector('#windspeed')
  windElement.innerHTML = response.data.wind.speed

  let humidityElement = document.querySelector('#humidity')
  humidityElement.innerHTML = response.data.main.humidity
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
  let temperature = temperatureElement.innerHTML
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32)
}
let fahrenheit = document.querySelector('#fahrenheit-link')
fahrenheit.addEventListener('click', changeTemp)

function changeBack(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector('strong')
  let temperature = temperatureElement.innerHTML
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9)
}

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
