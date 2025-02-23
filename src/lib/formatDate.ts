export function formatDate(dateStr: string) {
  // Handle DD.MM.YY format
  if (dateStr.includes('.')) {
    const [day, month, year] = dateStr.split('.')
    // Convert YY to YYYY
    const fullYear = `20${year}`
    dateStr = `${fullYear}-${month}-${day}`
  }
  
  const date = new Date(dateStr)
  
  // Get day with ordinal suffix (1st, 2nd, 3rd, etc)
  const day = date.getDate()
  
  // Handle special cases for 11th, 12th, 13th
  const specialCases = [11, 12, 13]
  const suffix = specialCases.includes(day) ? 'th' 
    : ['th', 'st', 'nd', 'rd'][day % 10] || 'th'
  
  // Get month and year
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  
  // Combine in the desired format
  return `${day}${suffix} ${month} ${year}`
} 