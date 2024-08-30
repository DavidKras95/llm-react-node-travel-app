import { Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const SubmitButton = ({ onClick, isLoading }) => {
  return (
    <Button colorScheme='blue' onClick={onClick} isLoading={isLoading} loadingText="Generating...">
      Generate Trip
    </Button>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

SubmitButton.defaultProps = {
  isLoading: false,
}

export default SubmitButton