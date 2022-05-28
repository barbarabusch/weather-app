function todaysDate() {
  let now = new Date()
  let date = now.getDate()
  let year = now.getFullYear()
  let hour = now.getHours()
  let min = now.getMinutes()

  let days = [
    'Sunday',
    'Monday',
    'Tueday',
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
//I know the homework did not ask for month and year
// but I didn't want to deviate too much from the design of my weather app

function handleCity(event) {
  event.preventDefault()
  let input = document.querySelector('#city')
  let h1 = document.querySelector('h1')
  h1.innerHTML = input.value
}
let entercitybutton = document.querySelector('#city-input')
entercitybutton.addEventListener('submit', handleCity)

//bonus

function changeTemp() {
  let strong = document.querySelector('strong')
  strong.innerHTML = 66
}
let fahrenheit = document.querySelector('#fahrenheit-link')
fahrenheit.addEventListener('click', changeTemp)

function changeBack() {
  let strong = document.querySelector('strong')
  strong.innerHTML = 19
}

let celsius = document.querySelector('#celsius-link')
celsius.addEventListener('click', changeBack)
