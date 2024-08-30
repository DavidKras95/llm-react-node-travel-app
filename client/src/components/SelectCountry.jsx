import { Select } from '@chakra-ui/react'
import countries from 'world-countries'
import PropTypes from 'prop-types'

const SelectCountry = ({ onCountryChange }) => {
  const handleChange = (event) => {
    const selectedCountryCode = event.target.value
    const selectedCountry = countries.find(country => country.cca2 === selectedCountryCode)
    const newCountryName = selectedCountry ? selectedCountry.name.common : ''
    onCountryChange(newCountryName)
  }

  return (
    <Select placeholder='Select a country' width='250px' onChange={handleChange}>
      {countries.map((country, index) => (
        <option key={index} value={country.cca2}>
          {country.name.common}
        </option>
      ))}
    </Select>
  )
}

SelectCountry.propTypes = {
  onCountryChange: PropTypes.func.isRequired,
}

export default SelectCountry