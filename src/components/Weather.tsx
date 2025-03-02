'use client'

import { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Cloudy } from 'lucide-react'

type WeatherData = {
  temp: string
  location: string
  icon: string
}

const WEATHER_ICONS = {
  '01d': Sun,
  '01n': Sun,
  '02d': Cloud,
  '02n': Cloud,
  '03d': Cloudy,
  '03n': Cloudy,
  '04d': Cloudy,
  '04n': Cloudy,
  '09d': CloudRain,
  '09n': CloudRain,
  '10d': CloudRain,
  '10n': CloudRain,
  '11d': CloudLightning,
  '11n': CloudLightning,
  '13d': CloudSnow,
  '13n': CloudSnow,
} as const

export function Weather() {
  const [weather, setWeather] = useState<WeatherData>({ 
    temp: '', 
    location: 'Mumbai',
    icon: '01d'
  })

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Mumbai coordinates
        const lat = 19.0760
        const lon = 72.8777
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        )

        if (!response.ok) {
          throw new Error('Weather data fetch failed')
        }

        const data = await response.json()
        
        setWeather({
          temp: `${Math.round(data.main.temp)}°C`,
          location: 'Mumbai',
          icon: data.weather[0].icon
        })
      } catch (error) {
        console.error('Error fetching weather:', error)
        // Fallback to default values on error
        setWeather({
          temp: '28°C',
          location: 'Mumbai',
          icon: '01d'
        })
      }
    }

    // Fetch immediately
    fetchWeather()

    // Then fetch every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const WeatherIcon = WEATHER_ICONS[weather.icon as keyof typeof WEATHER_ICONS] || Sun

  return (
    <div className="flex items-center gap-2 text-gray-400">
      <span>{weather.location}<span className="hidden md:inline">, IN</span></span>
      <WeatherIcon className="h-4 w-4" />
      <span>{weather.temp}</span>
    </div>
  )
} 