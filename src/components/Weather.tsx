'use client'

import useSWR from 'swr'
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Cloudy } from 'lucide-react'

type WeatherData = {
  temp: string
  location: string
  icon: string
}

type WeatherAPIResponse = {
  main: {
    temp: number
  }
  weather: Array<{
    icon: string
  }>
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

// Fetcher function for SWR
const fetcher = async (): Promise<WeatherData> => {
  // Mumbai coordinates
  const lat = 19.0760
  const lon = 72.8777

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Weather data fetch failed')
  }

  const data: WeatherAPIResponse = await response.json()

  return {
    temp: `${Math.round(data.main.temp)}°C`,
    location: 'Mumbai',
    icon: data.weather[0].icon
  }
}

export function Weather() {
  // Use SWR for automatic deduplication, caching, and revalidation
  const { data: weather } = useSWR<WeatherData>(
    'weather-mumbai',
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000, // Revalidate every 10 minutes
      revalidateOnFocus: false, // Don't refetch on window focus
      dedupingInterval: 5 * 60 * 1000, // Dedupe requests within 5 minutes
      fallbackData: {
        temp: '28°C',
        location: 'Mumbai',
        icon: '01d'
      }
    }
  )

  const WeatherIcon = WEATHER_ICONS[weather!.icon as keyof typeof WEATHER_ICONS] || Sun

  return (
    <div className="flex items-center gap-2 text-gray-400">
      <span>{weather!.location}<span className="hidden md:inline">, IN</span></span>
      <WeatherIcon className="h-4 w-4" />
      <span>{weather!.temp}</span>
    </div>
  )
} 