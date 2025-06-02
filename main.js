const APIKey = "d9e2f08a5cbb73d08a34ce3d5739a56b";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const inputBox = document.querySelector(".form__group input");
const inputBtn = document.getElementById("btn");
const weatherIcon = document.getElementById("weatherImage");



async function checkweather(city) {
    const response = await fetch(APIurl + city + `&appid=${APIKey}`);
    var output = await response.json();

    console.log(output);

    document.getElementById("location").innerHTML = output.name; 
    document.getElementById("temp").innerHTML = Math.floor(output.main.feels_like)+"°"; 
    document.getElementById("highTemp").innerHTML = "High:  " + Math.round(output.main.temp_max)+"°"; 
    document.getElementById("lowTemp").innerHTML = "Low:  " + Math.round(output.main.temp_min)+"°"; 
    document.getElementById("weatherCondetion").innerHTML = (output.weather[0].description); 


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


inputBtn.addEventListener("click", ()=>{
    checkweather(inputBox.value);
})
