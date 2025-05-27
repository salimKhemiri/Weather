const serch =  document.querySelector(".search-container");
const btn =  document.querySelector(".search-btn");
const cityInput = document.querySelector(".search-box");
const card =  document.querySelector(".card-container");
const appKey = "";


serch.addEventListener("submit" , async event =>{
    event.preventDefault();


    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Enter City Name")
    }
});
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
        
    }
    return await response.json();
}
function displayWeatherInfo(data){
    const {name:city,
           main: {temp,humidity},
           weather:[{description, id}]} = data;

    card.textContent ="";
    const citydisp = document.createElement("h1");
    const tempdisp = document.createElement("p");
    const humiditydis = document.createElement("p");
    const descdisp = document.createElement("p");
    const emojidisp = document.createElement("p");
    citydisp.textContent = city;
    emojidisp.textContent = getWeatherEmoji(id);
    citydisp.classList.add("citydisp");
    emojidisp.classList.add("emojidisp");
    card.appendChild(citydisp);
    tempdisp.textContent = temp;
    tempdisp.classList.add("tempdisp");
    card.appendChild(tempdisp);
    humiditydis.textContent = humidity + "°F";
    humiditydis.classList.add("humiditydis");
    card.appendChild(humiditydis);
    descdisp.textContent = description ;
    descdisp.classList.add("descdisp");
    card.appendChild(descdisp);
    card.appendChild(emojidisp);


}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId< 300):
        return  " ⛈️";
        case(weatherId >= 300 && weatherId< 400):
        return  "🌧️";
        case(weatherId >= 500 && weatherId< 600):
        return  "🌧️";
        case(weatherId >= 600 && weatherId<= 700):
        return  "❄️";
        case(weatherId >= 700 && weatherId<= 800):
        return  "💨";
        case(weatherId === 800):
        return  "☀️";
        case(weatherId >= 801 && weatherId<= 810):
        return  "☁️";
        default:
            return "?";  
    }
}
function displayError(message){
    const msgError = document.createElement("p");
    msgError.textContent = message;
    msgError.classList.add("errordisp");
    card.textContent = "";
    card.appendChild(msgError);
}