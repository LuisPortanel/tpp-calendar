
export const countryNameByCode = countryCode => {
  let country = countryCode
  switch (countryCode) {
    case 'us':
      country = 'United States'
      break
    case 'ar':
      country = 'Argentina'
      break
    case 'ca':
      country = 'Canada'
      break
    default:
      break
  }
  return country
}
