// ----- Static data (used before API call) -----
const weatherData = {
  location: { name: "Mississauga", country: "Canada" },
  current: {
    temperature: 8,
    feelslike: 4,
    humidity: 91,
    weather_descriptions: ["Moderate or heavy rain shower"],
    weather_icons: [
      "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0010_heavy_rain_showers.png"
    ]
  }
};

// ----- Function to update DOM -----
function displayWeather(data) {
  document.getElementById("cityName").textContent = data.location.name;
  document.getElementById("temperature").textContent = data.current.temperature + "°C";
  document.getElementById("feelslike").textContent = data.current.feelslike + "°C";
  document.getElementById("humidity").textContent = `${data.current.humidity}%`;
  document.getElementById("weatherDesc").textContent = data.current.weather_descriptions[0];
  document.getElementById("weatherIcon").src = data.current.weather_icons[0];
}


// ----- Modern way: Fetch API -----
async function getWeather() {
  const city = document.getElementById("cityInput").value || "Montreal";
  const errorMsg = document.getElementById("errorMsg");
  try {
    fetch(`https://api.weatherstack.com/current?access_key=e92f54a560182c8252ea90569a1b4bc1& query=${city}`)
    .then(response => response.json()) // Parse JSON response
    .then(data => displayWeather(data)) // Use the data
    .catch(error => console.log(error));

  } catch (error) {
    console.error(error);
    errorMsg.classList.remove("hidden");
  }
}

// ----- (Old way) XMLHttpRequest Example -----
function getWeatherXMLHTTP(city) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.weatherapi.com/...&q=${city}`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayWeather(data);
    } else {
      console.error("Error fetching weather data");
    }
  };
  xhr.send();
}
// NOTE: We won’t call this. It’s just to show the old AJAX technique.