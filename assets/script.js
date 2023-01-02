const apiKey = "8bf039e4e649d291e56dce63139febd4";

//localStorage.setItem("data",JSON.stringify(response))

//geolocate http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//weather https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

let inputCity = document.querySelector(".inputCity");
let button = document.querySelector(".btn");
let mainCard = document.querySelector(".mainCard");
let divTemp = document.createElement("div");

button.addEventListener("click", () => getTheWeather());

/////////////////////////////////////////
///////////GET THE LOCATION//////////////
/////////////////////////////////////////

async function callLocateApi() {
  let city = inputCity.value;
  let response = await fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=" +
      apiKey
  );
  let data = await response.json();
  localStorage.setItem(data, JSON.stringify(response));
  let lat = data[0].lat;
  let lon = data[0].lon;
  return { lat, lon };
}

//////////////////////////////////////////////
/////////////GET THE TEMPERATURE//////////////
//////////////////////////////////////////////

async function callTempApi(lat, lon) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  return await response.json();
}

async function convertTemp(data) {
  const temperatureK = data["list"][0]["main"].temp;
  const temperatureC = temperatureK - 273.15;
  return temperatureC.toFixed(2);
}

async function getTemp(lat, lon) {
  try {
    const data = await callTempApi(lat, lon);
    return await convertTemp(data);
  } catch (error) {
    console.error(error);
  }
}

/////////////////////////////////////////
////////////GET THE WEATHER//////////////
/////////////////////////////////////////

async function getTheWeather() {
  try {
    const { lat, lon } = await callLocateApi();
    const temp = await getTemp(lat, lon);
    console.log(lon);
    console.log(lat);
    await getTemp(lat, lon);
    divTemp.innerHTML = temp;
    divTemp.classList.add("temp");
    mainCard.appendChild(divTemp);
  } catch (error) {
    console.error(error);
  }
}
