let weaherApi = {
  apiKey: "63d6e411d15aae45286cf8e8e4304ef3",
  fetchWeather: async function (city) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    );
    if (!res.ok) {
      throw new Error("Weather not found");
    }
    const data = await res.json();
    console.log(data);
    this.displayWeather(data);
  },
  displayWeather: (data) => {
    const { name } = data;
    const { temp, temp_max, temp_min, humidity } = data.main;
    const { description } = data.weather[0];

    document.querySelector(".city").innerText = name;
    document.querySelector(".temp-current").innerText = Math.floor(temp);
    document.querySelector(".cond-current").innerText = description;
    document.querySelector(".temp-max").innerText = Math.floor(temp_max);
    document.querySelector(".temp-min").innerText = Math.floor(temp_min);
    document.querySelector(".humidity-data").innerText = humidity;
    document.querySelector(".load-card").classList.remove("loading");
    document.querySelector(".card").classList.remove("loading");
  },
};

const geocode = {
  reverseGeocode: async function (latitude, longitude) {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await res.json();
    console.log(data);
  },
  getLocation: () => {
    let success = (data) => {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
      console.log(
        "getLocation | lat: " +
          data.coords.latitude +
          " lon: " +
          data.coords.longitude
      );
    };
    navigator.geolocation.getCurrentPosition(success, console.error);
  },
};

geocode.getLocation();
