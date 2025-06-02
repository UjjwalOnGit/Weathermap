const APIKey = "d9e2f08a5cbb73d08a34ce3d5739a56b";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const inputBox = document.querySelector("form__group input");
const inputBtn = document.getElementById("btn");

async function checkweather(city) {
    const response = await fetch(APIurl + city + `&appid=${APIKey}`);
    var output = await response.json();

    console.log(output);

    document.getElementById("location").innerHTML = output.name; 
    document.getElementById("temp").innerHTML = Math.round(output.main.temp)+"°"; 
    document.getElementById("highTemp").innerHTML = "High:  " + Math.round(output.main.temp_max)+"°"; 
    document.getElementById("lowTemp").innerHTML = "Low:  " + Math.round(output.main.temp_min)+"°"; 
}


inputBtn.addEventListener("click", ()=>{
    checkweather(inputBox.value);
})
