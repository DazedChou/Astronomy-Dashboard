var weatherinfo = $('#weather');
const searchInput = $("#cityText");
const cityNameEl = $(".cityName");
const weatherIconEl = $(".weather-icon");
const temperatureEl = $(".temperature");
const cloudinessEl = $(".cloudiness");
const apiKey = "723b345acdd52204dfb9a13e95119b61";
var starchart = $('#starChart');
var meteorShower = $('#meteors');
var searchCity = $('#searchButton');

var lyrids = moment().from("2022/1/13", true);
var aquariids = moment().from("2022/5/07", true);
var sAquariids = moment().from("2022/07/30", true);
var capricornids = moment().from("2022/7/27", true);
var perseids = moment().from("2022/8/12", true);
var orionids = moment().from("2022/10/22", true);
var sTaurids = moment().from("2022/10/29", true);
var nTaurids = moment().from("2022/11/11", true);

$('#m1').text(lyrids);
$('#m2').text(aquariids);
$('#m3').text(sAquariids);
$('#m4').text(capricornids);
$('#m5').text(perseids);
$('#m6').text(orionids);
$('#m7').text(sTaurids);
$('#m8').text(nTaurids);


$('#apod').on('click', function () {
    document.location = 'apod.html';
})

//Search button event listener
$("#searchButton").on("click", function (event) {
    event.preventDefault();
    if (searchInput.val() === "") {
        alert("Please enter a city");
        return;
    }
    searchHistory.push(searchInput.val());
    localStorage.setItem("search", JSON.stringify(searchHistory));
    getWeather(searchInput.val());
});


//obtain Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        weatherinfo.text("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    weatherinfo.html("Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}

getLocation();

//Temperature conversion
function k2F(k) {
    return Math.floor((k - 273.15) * 1.8 + 32);
}

function getDate(date) {
    let currentDate = new Date(date * 1000);
    console.log(currentDate);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // +1 because month returned by `getMonth()` method starts at 0 index!
    const year = currentDate.getFullYear();
    return month + "/" + day + "/" + year;
}

function getWeather(position) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            cityNameEl.text(response.name + " (" + getDate(response.dt) + ") ");
            let weatherIcon = response.weather[0].icon;
            //Get weather icons from api request
            weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            weatherIconEl.attr("alt", response.weather[0].description);
            //Convert temp from deg K to deg F
            temperatureEl.text("Temperature: " + k2F(response.main.temp) + " °F");
            cloudinessEl.text("Cloudiness: " + response.clouds.all + "%");
        });
}

function getWeather(position) {
    let coordsQueryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey;
    fetch(coordsQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            cityNameEl.text(response.name + " (" + getDate(response.dt) + ") ");
            let weatherIcon = response.weather[0].icon;
            //Get weather icons from api request
            weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            weatherIconEl.attr("alt", response.weather[0].description);
            //Convert temp from deg K to deg F
            temperatureEl.text("Temperature: " + k2F(response.main.temp) + " °F");
            cloudinessEl.text("Cloudiness: " + response.clouds.all + "%");
        });
}

function getWeather(cityName) {
    let cityQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(cityQueryUrl)
        .then(function (cityData) {
            return cityData.json();
        })
        .then(function (cityData) {
            cityNameEl.text(cityData.name + " (" + getDate(cityData.dt) + ") ");
            let weatherIcon = cityData.weather[0].icon;
            //Get weather icons from api request
            weatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            weatherIconEl.attr("alt", cityData.weather[0].description);
            //Convert temp from deg K to deg F
            temperatureEl.text("Temperature: " + k2F(cityData.main.temp) + " °F");
            cloudinessEl.text("Cloudiness: " + cityData.clouds.all + "%");
        });
}

//User opens page 
    // execute function to check local storage location
        // get lat/long/location from local storage if present and assign to variable
            // if values are not null (values are present - location name not required) 
                // execute all functions that require lat/long with local storage data
                    // getMoonLocation()
                    // other functions requiring lat/long
                    // append location information to page
            // if values are null
                // execute prompt user location function
                    // calls on getCurrentPosition function
                       // if successful  
                            // run lines 138-141
                            // store information in local storage
                        // if unsuccessful 
                            // temporary solution 
                                //if failed - notify user that location cannot be captured and set location to predermined values
                                    // set values to local storage/execute functions requiring lat and long
                            // execute displayUserInfoCapture() ***Stretch goal - not part of MVP***
                                // identify empty div
                                // populate empty div with 
                                    // call to action for user to enter in location
                                        // need input field
                                        // need variable pointing to form/input field
                                        // need event listener for form submission
                                        // once user submits form with location
                                            //execute fetch coords
                                                // user submits valid location 
                                                    // lat long returned
                                                        // execute get moon phase with lat/long as arguments
                                                        // set lat/long in local storage as well as location name
                                                // user submits invalid location
                                                    // execute generateOptionalUserLocations function
                                                        // targets empty div
                                                            // append text content saying invalid location and asking user to select from given options
                                                            // array of string values of locations
                                                            // iterate through array, generate buttons, text content, data attribute
                                                            // append buttons to unique div on page (optional-location-buttons)
        // global variable pointing to optional-locations-buttons div (empty parent div - will have buttons if user submits invalid location) ***Also part of stretch goal***
        // add event listener to optional-locations-buttons div
            // if something inside of div is clicked,
                // create variable pointing to button that was clicked (event parameter, this)
                    //event.target(data-location) ***look up syntax
                        //once we have event from button, excute fetchCoords

function fetchCoords(search) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=5&appid=" + weatherApiKey;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (!data[0]) {
          alert('Location not found');
          //have some function that deals with no results 
          // would you like to do the following
            //
  
        } else {
          //set the lant long in local storage
          appendToHistory(lat, long);
          getMoonPhase([data[0].lat, data[0].lon]);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }
  

  // make pointer to input form
  // add event lister to it
  // grab a hold of input values when submitted
    // send input value to  fetchCoords funtion (london, san fran)
      // if all goes well - set lat/lon in location storage in addition to locaiton name (london, san fran)
      //if things do not go well 
        //append message to screen about selcting one of 7 option
          //nyc
          //london
          //sf
          // ...

getMoonPhase({lat:lat, long:long}) // it needs lat and long

function getMoonPhase(coordinates) {
    //Use lat/long to get location key
    $.getJSON("http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=0q8znAyCHgfaN2OS3I5rUKa5s2gbg4x2&q=" + coordinates.lay + "%2C" + coordinates.lon, function (data) {

        var locationKey = data.Key

        //Get moon phase at current location
        $.getJSON("http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=0q8znAyCHgfaN2OS3I5rUKa5s2gbg4x2&details=true", function (data) {

            var newMoon = "images/new-moon.png"
            var waxingCrescent = "images/waxing-crescent.png"
            var firstQuarter = "images/first-quarter.png"
            var waxingGibbous = "images/waxing-gibbous.png"
            var fullMoon = "images/full-moon.png"
            var waningGibbous = "images/waning-gibbous.png"
            var lastQuarter = "images/last-quarter.png"
            var waningCrescent = "images/waning-crescent.png"

            var moonPhase = data.DailyForecasts[0].Moon.Phase

            if (moonPhase == "NewMoon") {
                $("#moon-phase-name").html("New Moon")
                $("#moon-phase-icon").attr("src", newMoon)

            }
            if (moonPhase == "WaxingCrescent") {
                $("#moon-phase-name").html("Waxing Crescent")
                $("#moon-phase-icon").attr("src", waxingCrescent)

            }
            if (moonPhase == "FirstQuarter") {
                $("#moon-phase-name").html("First Quarter")
                $("#moon-phase-icon").attr("src", firstQuarter)

            }
            if (moonPhase == "WaxingGibbous") {
                $("#moon-phase-name").html("Waxing Gibbous")
                $("#moon-phase-icon").attr("src", waxingGibbous)
            }
            if (moonPhase == "FullMoon") {
                $("#moon-phase-name").html("Full Moon")
                $("#moon-phase-icon").attr("src", fullMoon)

            }
            if (moonPhase == "WaningGibbous") {
                $("#moon-phase-name").html("Waning Gibbous")
                $("#moon-phase-icon").attr("src", waningGibbous)

            }
            if (moonPhase == "LastQuarter") {
                $("#moon-phase-name").html("Last Quarter")
                $("#moon-phase-icon").attr("src", lastQuarter)

            }
            if (moonPhase == "WaningCrescent") {
                $("#moon-phase-name").html("Waning Crescent")
                $("#moon-phase-icon").attr("src", waningCrescent)
            }
        })

    })
}


