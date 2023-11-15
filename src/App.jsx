import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { WeatherCard } from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const success = position => {
    /* console.log(position); */
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
    setCoords(obj)
  }

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(coords);

  useEffect(() => {
    if (coords) {
      const APIKEY = 'a24a57d649ba295710ffe7e92eb129c0'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${APIKEY}`

      axios.get(url)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1)
          setTemp({ celsius, fahrenheit })
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [coords])


  /* console.log(weather); */


  return (
    <div>
      {
        isLoading
          ? <h2>
            <div className="container">
              <div className="cargando">
                <div className="pelotas"></div>
                <div className="pelotas"></div>
                <div className="pelotas"></div>
                <span className="texto-cargando">Cargando...</span>
              </div>
            </div>
          </h2>
          : (<div className='app'>
            <WeatherCard
              weather={weather}
              temp={temp}
            ></WeatherCard>
          </div>
          )
      }
    </div>
  )
}

export default App