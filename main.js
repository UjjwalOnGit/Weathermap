const APIKey = "d9e2f08a5cbb73d08a34ce3d5739a56b";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const inputBox = document.querySelector(".form__group input");
const inputBtn = document.getElementById("btn");
const weatherIcon = document.getElementById("weatherImage");
const getLocation = document.getElementById("getLocation");

// Weather by city
async function checkweather(city) {
    const response = await fetch(APIurl + city + `&appid=${APIKey}`);
    const output = await response.json();
    
    if (document.getElementById("location")) {
        document.getElementById("location").innerHTML = output.name;
        document.getElementById("temp").innerHTML = Math.floor(output.main.feels_like) + "°";
        document.getElementById("highTemp").innerHTML = "High: " + Math.round(output.main.temp_max) + "°";
        document.getElementById("lowTemp").innerHTML = "Low: " + Math.round(output.main.temp_min) + "°";
        document.getElementById("weatherCondetion").innerHTML = output.weather[0].description;
    }
    
    if (output.weather[0].main == "Clouds") {
        weatherIcon.src = "svg/clouds.png";
        
    } else if(output.weather[0].main == "Clear"){
        weatherIcon.src = "svg/clear.png";
        
    }else if(output.weather[0].main == "Drizzle"){
        weatherIcon.src = "svg/drizzle.png";
        
    }else if(output.weather[0].main == "Rain"){
        weatherIcon.src = "svg/rain.png";
        
    }else if(output.weather[0].main == "Mist"){
        weatherIcon.src = "svg/mist.png";
    }
}

// Event: Search button
if (inputBtn && inputBox) {
    inputBtn.addEventListener("click", () => {
        checkweather(inputBox.value);
    });
    
    inputBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            inputBtn.click();
        }
    });
}



// Auto-detect map page
if (document.getElementById("map")) {
    const map = L.map('map').setView([20.5937, 78.9629], 5);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}


  // Handle "Get Location" button
  const getLocationBtn = document.getElementById("getLocation");
  if (getLocationBtn) {
    getLocationBtn.addEventListener("click", () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          map.setView([lat, lon], 11);
          if (marker) map.removeLayer(marker);
          marker = L.marker([lat, lon]).addTo(map);

          fetchWeatherByCoords(lat, lon);
        }, () => {
          alert("Unable to access location.");
        });
      } else {
        alert("Geolocation is not supported.");
      }
    });
  }