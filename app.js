const weatherApi = {
  key: "78def919aef811568d5de158d4f34a7a",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("Input-box");

// event Listener function on keywords
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getweatherReport(searchInputBox.value);
	document.querySelector('.weather-body').style.display = "block";	
  }
});

// Get Weather Reports
function getweatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

// show weather Report
function showWeatherReport(weather) {
  console.log(weather);

  const city = document.getElementById("city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  const temp = document.getElementById("temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  const minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.round(
    weather.main.temp_max
  )}&deg;C (max)/ ${Math.round(weather.main.temp_min)}&deg;C (min)`;

  const date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  // Show the Weather Type on interface and change background as per type
  const weathertype = document.getElementById("weather");
  weathertype.innerText = `${weather.weather[0].main}`;

  if (weathertype.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  } else if (weathertype.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  } else if (weathertype.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rain.jpg')";
  } else if (weathertype.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  }
}

// date manage function
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "saturday",
  ];
  let months = [
    "January",
    "Fabuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} ${day} ${year}`;
}
