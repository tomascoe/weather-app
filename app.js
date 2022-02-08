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
  },
};

const geocode = {
  reverseGeocode: (latitude, longitude) => {
    var api_key = "fd84533b87dd4e7f9341e370188d1f1b";

    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =
      api_url +
      "?" +
      "key=" +
      api_key +
      "&q=" +
      encodeURIComponent(latitude + "," + longitude) +
      "&pretty=1" +
      "&no_annotations=1";

    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function () {
      if (request.status === 200) {
        // SUCCESS
        var data = JSON.parse(request.responseText);
        console.log("reverseGeocode | " + data.results[0].components.suburb); // PRINT LOCATION SUBURB
        weaherApi.fetchWeather(data.results[0].components.suburb);
      } else if (request.status <= 500) {
        //ERROR
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      // CONNECTION ERROR
      console.log("unable to connect to server");
    };

    request.send(); // MAKE REQUEST
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
