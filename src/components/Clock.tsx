'use client'

import { useEffect, useState } from 'react'

export function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    let showColon = true

    const updateTime = () => {
      // Force the time to Asia/Kolkata (Mumbai) regardless of user timezone
      const now = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      )
      const hours = now.getHours() % 12 || 12
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const meridiem = now.getHours() >= 12 ? 'PM' : 'AM'

      // Toggle colon on each update
      showColon = !showColon
      setTime(`${hours}${showColon ? ':' : ' '}${minutes} ${meridiem}`)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, []) // No dependencies - effect runs once

  return <span>{time}</span>
} 