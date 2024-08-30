import { useState } from 'react'
import axios from 'axios'
import SelectCountry from './SelectCountry'
import RadioTransportationType from './RadioTransportationType'
import SubmitButton from './SubmitButton'
import PropTypes from 'prop-types'

const MainSelection = ( { onHandleGetTravel } ) => {
  const [countryName, setCountryName] = useState('')
  const [transportationType, setTransportationType] = useState('Car')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCountryChange = (newCountryName) => {
    setCountryName(newCountryName)
  }

  const handleTransportationChange = (newTransportationType) => {
    setTransportationType(newTransportationType)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    const apiBody = {
      country: countryName,
      transpontationType: transportationType
    }

    console.log(apiBody)

    try {
      const response = await axios.post("http://localhost:8080/getTravel", apiBody)
      console.log('API Response:', response.data)
      onHandleGetTravel(response);
    } catch (err) {
      console.error('Error submitting data:', err)
      setError('An error occurred while fetching travel data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <SelectCountry onCountryChange={handleCountryChange} />
        <RadioTransportationType onTransportationChange={handleTransportationChange} />
      </div>
      <div style={{ marginTop: '40px' }}>
        <SubmitButton onClick={handleSubmit} isLoading={isLoading} />
      </div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  )
}

MainSelection.propTypes = {
    onHandleGetTravel: PropTypes.func.isRequired,
  }

export default MainSelection