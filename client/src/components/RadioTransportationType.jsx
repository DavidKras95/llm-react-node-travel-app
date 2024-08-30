import React from 'react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const RadioTransportationType = ({ onTransportationChange }) => {
  const [transportationType, setTransportationType] = React.useState('Car')

  const handleChange = (newValue) => {
    setTransportationType(newValue)
    onTransportationChange(newValue)
  }
    
  return (
    <RadioGroup onChange={handleChange} value={transportationType}>
      <Stack direction='row'>
        <Radio value='Car'>Car</Radio>
        <Radio value='Bicycle'>Bicycle</Radio>
      </Stack>
    </RadioGroup>
  )
}

RadioTransportationType.propTypes = {
  onTransportationChange: PropTypes.func.isRequired,
}

export default RadioTransportationType