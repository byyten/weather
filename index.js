
/*  functions that hit the API. You’re going to want functions that can take a location 
    and return the weather data for that location. For now, just console.log() the information.


Base URL: http://api.weatherapi.com/v1/?key=
API 	            API Method
Current weather 	/current.json       or /current.xml
Forecast 	        /forecast.json      or /forecast.xml
Search/Autocomplete	/search.json        or /search.xml
History 	        /history.json       or /history.xml
Marine 	            /marine.json        or /marine.xml
Future 	            /future.json        or /future.xml
Time Zone 	        /timezone.json      or /timezone.xml
Sports 	            /sports.json        or /sports.xml
Astronomy 	        /astronomy.json     or /astronomy.xml
IP Lookup 	        /ip.json            or /ip.xml
	

Query parameter based on which data is sent back. It could be following:

    Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
    city name e.g.:                     q=Paris
    US zip e.g.:                        q=10001
    UK postcode e.g:                    q=SW1
    Canada postal code e.g:             q=G2J
    metar:<metar code> e.g:             q=metar:EGLL
    iata:<3 digit airport code> e.g:    q=iata:DXB
    auto:ip IP lookup e.g:              q=auto:ip
    IP address (IPv4/v6 supported) e.g: q=100.0.0.1

*/

data = {
    "location": {
      "name": "Auckland",
      "region": "",
      "country": "New Zealand",
      "lat": -37.01,
      "lon": 174.79,
      "tz_id": "Pacific/Auckland",
      "localtime_epoch": 1690597947,
      "localtime": "2023-07-29 14:32"
    },
    "current": {
      "last_updated_epoch": 1690597800,
      "last_updated": "2023-07-29 14:30",
      "temp_c": 14,
      "temp_f": 57.2,
      "is_day": 1,
      "condition": {
        "text": "Sunny",
        "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
        "code": 1000
      },
      "wind_mph": 11.9,
      "wind_kph": 19.1,
      "wind_degree": 220,
      "wind_dir": "SW",
      "pressure_mb": 1018,
      "pressure_in": 30.06,
      "precip_mm": 0,
      "precip_in": 0,
      "humidity": 59,
      "cloud": 0,
      "feelslike_c": 12.8,
      "feelslike_f": 55,
      "vis_km": 10,
      "vis_miles": 6,
      "uv": 4,
      "gust_mph": 11.2,
      "gust_kph": 18
    }
  }

component = (type, classes, content) => {
    comp = document.createElement(type)
    comp.className = classes
    if (content !== undefined) { 
        switch (type) {
            case 'input':
                comp.value = content
                break
            case 'img':
                comp.src = content
                break;
            default:
                comp.textContent = content
        }
    }
    return comp
}

const weatherApiKey = 'key=666ee637c3cb4e6d986205554232807'
const weatherBaseURL = 'http://api.weatherapi.com/v1/'

// ?key=' + weatherApiKey + '&q='


buildURL = (method, loc) => {
    return weatherBaseURL + method + '.json?' + weatherApiKey + '&q=' + loc 
}

function getLocation(evt) {
    try {
        let qLoc = buildURL('current', inputLocation.value)
        console.log(qLoc)
        fetch(qLoc, {cors: 'no-cors'})
            .then(resp => resp.json() )
            .then(data => { setWeatherData (data) }) 
            .catch(err => console.log(err.message))
    } catch (err) {
        alert('ooops: ' + err.message)
    }
} 



setWeatherData = (data) => {
    tbl_bdy.style.visibility = 'visible'
    tbl_bdy.querySelector('.locName').textContent = `${data.location.name}, ${data.location.country}` 
    tbl_bdy.querySelector('.locLongLat').textContent = `${data.location.lon}, ${data.location.lat}`
    tbl_bdy.querySelector('.locTZ').textContent = `${data.location.tz_id}`

    tbl_bdy.querySelector('.localTime td.value').textContent = `${data.location.localtime}`

    wapi_icon = data.current.condition.icon
    wapi_src = wapi_icon.substring(wapi_icon.indexOf('weather/'))

    // tbl_bdy.querySelector('.condition td.icon').appendChild( component('img', 'imgCondition', wapi_src))
    tbl_bdy.querySelector('.condition td.icon img').src = data.current.is_day == 1 ? wapi_src : wapi_src.replace('day', 'night')
    tbl_bdy.querySelector('.condition td.value').textContent = `${data.current.condition.text}`
    tbl_bdy.querySelector('.cloud td.value').textContent = `${data.current.cloud}%`
    tbl_bdy.querySelector('.temperature td.value').textContent = `${data.current.temp_c}C [${data.current.temp_f}F]`
    tbl_bdy.querySelector('.feelslike td.value').textContent = `${data.current.feelslike_c}C [${data.current.feelslike_f}F]`
    tbl_bdy.querySelector('.wind td.value').textContent = `${(data.current.wind_kph/3600).toFixed(2)}m/s ${data.current.wind_dir}`

    tbl_bdy.querySelector('.rain td.value').textContent = `${data.current.precip_mm}mm`
    tbl_bdy.querySelector('.pressure td.value').textContent = `${data.current.pressure_mb}mb`

    tbl_bdy.querySelector('.humidity td.value').textContent = `${data.current.humidity}%`
    tbl_bdy.querySelector('.visibility td.value').textContent = `${data.current.vis_km}km ${data.current.vis_miles}miles`

}


tbl = document.querySelector('table.currentWeather')
tbl_bdy = tbl.querySelector('tbody')
tbl_bdy.style.visibility = 'hidden'
// loc = tbl_bdy.querySelector('.loc')
tr_clone = tbl_bdy.querySelector('.clone')
    tbl_bdy.removeChild(tr_clone) 

inputLocation = document.querySelector('input.location')
getWeather = document.querySelector('.getWeather')
getWeather.addEventListener('click', evt => getLocation(evt))

// setWeatherData(data)

// getLocation({ target: inputLocation })



/*

clone = tr_clone.cloneNode(true)
clone.querySelector('icon').innerHTML = component('img', 'material-something-outlined', 'device_thermostat')
clone.querySelector('key').textContent = 'Temperature' 
clone.querySelector('value').textContent = `${data.current.temp_c}C [${data.current.temp_f}F]` 




  "current": {
    "last_updated_epoch": 1690584300,
    "last_updated": "2023-07-29 10:45",
    "temp_c": 10,
    "temp_f": 50,
    "is_day": 1,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
      "code": 1003
    },
    "wind_mph": 3.8,
    "wind_kph": 6.1,
    "wind_degree": 190,
    "wind_dir": "S",
    "pressure_mb": 1021,
    "pressure_in": 30.15,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 87,
    "cloud": 75,
    "feelslike_c": 9.6,
    "feelslike_f": 49.4,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 3,
    "gust_mph": 4.5,
    "gust_kph": 7.2
  }, 
  "location": {
    "name": "Auckland",
    "region": "",
    "country": "New Zealand",
    "lat": -37.01,
    "lon": 174.79,
    "tz_id": "Pacific/Auckland",
    "localtime_epoch": 1690585264,
    "localtime": "2023-07-29 11:01"
  },

}


url = buildURL(weatherBaseURL, 'current', weatherApiKey, 'iata:akl')
json = await getLocation(url)

{
  "location": {
    "name": "Auckland",
    "region": "",
    "country": "New Zealand",
    "lat": -37.01,
    "lon": 174.79,
    "tz_id": "Pacific/Auckland",
    "localtime_epoch": 1690585264,
    "localtime": "2023-07-29 11:01"
  },
  "current": {
    "last_updated_epoch": 1690584300,
    "last_updated": "2023-07-29 10:45",
    "temp_c": 10,
    "temp_f": 50,
    "is_day": 1,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
      "code": 1003
    },
    "wind_mph": 3.8,
    "wind_kph": 6.1,
    "wind_degree": 190,
    "wind_dir": "S",
    "pressure_mb": 1021,
    "pressure_in": 30.15,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 87,
    "cloud": 75,
    "feelslike_c": 9.6,
    "feelslike_f": 49.4,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 3,
    "gust_mph": 4.5,
    "gust_kph": 7.2
  }
}

*/