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
                output+="<p>Wind Speed: " + data.current.wind_speed+" MPH</p>";
                output+="<p>Humidity: " + data.current.humidity+"%</p>";
                output+="<p>UV Index: <span id='uvi'>" + data.current.uvi +"</span></p>";
                //ADDS TO INDEX.HTML 
                document.getElementById("current").innerHTML=output;

                //uvi index background color 
                if (data.current.uvi < 3) {
                    //green 
                    document.getElementById("uvi").className="btn-success";
                }else if (data.current.uvi > 3 && data.current.uvi < 6 ) {
                    //yellow 
                    document.getElementById("uvi").className="btn-warning";
                }else {
                    //red 
                    document.getElementById("uvi").className="btn-danger";
                }
            
                //forecast 
                var forceastDivEle = document.getElementById("forecast");
                //clear exisiting data 
                forceastDivEle.innerHTML="";

                if( data.daily.length > 0 ){
                    for(var i =0; i < 5; i++){
                        //Create a card div 
                        var cardDiv = document.createElement("div");
                        //adding css to the div 
                        cardDiv.setAttribute('class','card col-2 m-1 p-1'); 
                        
                        //date 
                        var cardTitleEle = document.createElement("h5");
                        cardTitleEle.setAttribute('class', 'card-title'); 
                        //converting UNIX timestamo to DATE 
                        var forecastDate = new Date(data.daily[i].dt  * 1000).toLocaleDateString("en-US");
                        console.log(forecastDate)
                        cardTitleEle.textContent=forecastDate;

                        //temperature 
                        var cardBodyEle = document.createElement("p");
                        cardBodyEle.setAttribute('class', 'card-text'); 
                        cardBodyEle.textContent=" Temp: " + data.daily[i].temp.max+"°F";

                         //wind
                        var windEle = document.createElement("p");
                        windEle.setAttribute('class', 'card-text'); 
                        windEle.textContent=" Wind: " + data.daily[i].wind_speed+" MPH";

                        //humidity
                        var humidityEle = document.createElement("p");
                        humidityEle.setAttribute('class', 'card-text'); 
                        humidityEle.textContent=" Humidity: " + data.daily[i].humidity+"%"; 


                        console.log(cardDiv);
                        console.log(cardTitleEle);
                        //Appending all information to my DIV CARD 
                        cardDiv.append(cardTitleEle,cardBodyEle,windEle,humidityEle); 
                        console.log("updated card", cardDiv);
                        //add allthe information to it 
                        //then append the div forecast 
                        console.log("forecast value ", data.daily[i]); 

                        //display on the HTML Page 
                        forceastDivEle.append(cardDiv)
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
