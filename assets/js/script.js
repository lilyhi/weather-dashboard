var apiKey = "dd98f93c3707d9643b7e6f0e1035f266";

var cityNameEl = document.getElementById("city"); 

var cityInfo = function() {
    // grap weather info from url query string
    var cityName = cityNameEl.value;
   
    if (cityName) {
        // display city name on the page
        // document.getElementById("city-name").innerHTML=cityName;        
        getCoordinates(cityName);
    }   else {
        // if no city was given, give error message
        
    }
};

var weatherInfo = function(lat,lon) {
    // format the weather api url
    // var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';  
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly&appid='+apiKey+ '&units=imperial';  
    // make a get request to url
    console.log(apiUrl)
    fetch(apiUrl).then(function(response) {
        // request was successful
        
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var cityName = cityNameEl.value;
                var output = "";
                output+="<h1>"+ cityName+ "</h1>";
                output+="<p>Current Temperature: " + data.current.temp+"&deg;F</p>";
                output+="<p>Wind Speed: " + data.current.speed+" MPH</p>";
                output+="<p>Humidity: " + data.current.humidity+"</p>";
                output+="<p>UV Index: " + data.current.uvi +"</p>";
                document.getElementById("current").innerHTML=output;
                //forcast 
                if( data.daily.length > 0 ){
                    for(var i =0; i < 5; i++){
                        //Create a card 
                        //add allthe information to it 
                        //then append the div forecast 
                        console.log("forecast value ", data.daily[i]); 
                    }
                }
                
            })
        }
    })
};


var getCoordinates = function(city) {
    console.log(city);
    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+apiKey; 
    // make a get request to url

    fetch(apiURL).then(function(response) {
        // request was successful

        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                weatherInfo(data[0].lat, data[0].lon)
            })
        }
    })
}


document.getElementById("search-btn").addEventListener("click", cityInfo);
