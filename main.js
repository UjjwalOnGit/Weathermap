// temprature
const APIKey = "d9e2f08a5cbb73d08a34ce3d5739a56b";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const inputBox = document.querySelector(".form__group input");
const inputBtn = document.getElementById("btn");
const weatherIcon = document.getElementById("weatherImage");

// map
const getLocation = document.getElementById("getLocation");


async function checkweather(city) {
    const response = await fetch(APIurl + city + `&appid=${APIKey}`);
    var output = await response.json();


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

// btn click work
inputBtn.addEventListener("click", ()=>{
    checkweather(inputBox.value);
})

// enter key fix
inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        inputBtn.click(); 
    }
});



getLocation.addEventListener("click", evt=>{
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position=>{
         let lon = position.coords.longitude;   
         let lat = position.coords.latitude;   

        let googleMapUrl = `https://maps.googleapis.com/maps/api/staticmap?${lat},${lon}&zoom=11&size=400x400`;

        const mapIamge = document.getElementById("mapIamge");
        mapIamge.src = googleMapUrl;
        
         console.log(lat,lon);
        },error=>{
            console.log("error code")
        });
    }
    else{
        console.log("Not supported")
    }
})