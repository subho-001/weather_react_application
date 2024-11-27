import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import search from "./assets/search.png"
import clear from "./assets/clear.png"
import clearN from "./assets/01n.png"
import cloud from "./assets/cloud.png"
import cloudN from "./assets/02n.png"
import drizzle from "./assets/drizzle.png"
import drizzleN from "./assets/04n.png"
import humidity from "./assets/humidity.png"
import rain from "./assets/rain.png"
import rainN from "./assets/09n.png"
import snow from "./assets/snow.png"
import snowN from "./assets/13n.png"
import wind from "./assets/wind.png"
import thunder from "./assets/thunder.png"
import mist from "./assets/mist.png"

function App() {
  let[city, setCity] = useState('Bangalore')
  let[weatherInfo, setWeatherInfo] = useState('')

  let allIcons = {
    '01d' : clear,
    '01n' : clearN,
    '02d' : cloud,
    '02n' : cloudN,
    '03d' : cloud,
    '03n' : cloudN,
    '04d' : drizzle,
    '04n' : drizzleN,
    '09d' : rain,
    '09n' : rainN,
    '10d' : rain,
    '10n' : rainN,
    '11d' : thunder,
    '11n' : thunder,
    '13d' : snow,
    '13n' : snowN,
    '50d' : mist,
    '50n' : mist
  }

  


  let fetchApi = async()=>{
    let weatherApi = 'e10e7fb05964d219021c54c96e2e449d';
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`

    
    try{
      let data = await fetch(weatherURL)
      let finalData = await data.json()
      // console.log(finalData);
      if(finalData.cod===200) {
        let icon = allIcons[finalData.weather[0].icon] || clear;
        
        setWeatherInfo({icon,...finalData})
        console.log(finalData);
        
      } else {
        alert('city not found')
        console.log('please provide valid city name');
      }
    } catch(error) {
      console.log(error);
    }
  }

  // console.log(icon);
  return (
    <section className='container'>
      <div className='input_sec'>
        <input id='input' type="text" placeholder='enter the city name' onChange={(e)=>setCity(e.target.value)}/>
        <button id='btn' onClick={fetchApi}><img src={search} alt="no image" /></button>
      </div>
      
        {weatherInfo && (
          <div className='data'>
            <img className='weather' src={weatherInfo.icon} alt= ''/>
            <p style={{color:'white'}}>{weatherInfo.weather[0].description}</p>
            <p className='temp'>{weatherInfo.main.temp}&deg;c</p>
            <p className='temp1'>feels_like: {weatherInfo.main.feels_like}&deg;c</p>
            <p className='location'>{weatherInfo.name}</p>
            <div className='weather-data'>

              <div className='col'>
                <img src={humidity} alt="" />

                <div>
                  <p>{weatherInfo.main.humidity}%</p>
                  <span>Humidity</span>
                </div>
                
              </div>

              <div className='col'>
                <img src={wind} alt="" />

                <div>
                  <p>{weatherInfo.wind.speed}km/h</p>
                  <span>Speed</span>
                </div>

              </div>

            </div>
          </div>
        )} 
      
    </section>
  )
}

export default App
