import { useState } from 'react';
import axios from 'axios';
import SelectCountry from './SelectCountry';
import RadioTransportationType from './RadioTransportationType';
import SubmitButton from './SubmitButton';
import PropTypes from 'prop-types';

const MainSelection = ({ onHandleGetTravel, onHandleGetImage, onHandleImageLoading }) => {
  const [countryName, setCountryName] = useState('');
  const [transportationType, setTransportationType] = useState('Car');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCountryChange = (newCountryName) => {
    setCountryName(newCountryName);
  };

  const handleTransportationChange = (newTransportationType) => {
    setTransportationType(newTransportationType);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    onHandleImageLoading(true);

    const getTravelApiBody = {
      country: countryName,
      transpontationType: transportationType,
    };

    const generateImageApiBody = {
      country: countryName,
    };


    try {
      const response = await axios.post('http://localhost:8080/getTravel', getTravelApiBody);
      console.log('API Response:', response.data);
      onHandleGetTravel(response.data);

      const imageResponse = await axios.post('http://localhost:8080/getImage', generateImageApiBody);
      console.log('Image Response:', imageResponse.data);
      const imageBase64 = imageResponse.data.image;
      const imageUrl = `data:image/png;base64,${imageBase64}`;
      onHandleGetImage(imageUrl);

    } catch (err) {
      console.error('Error submitting data:', err);
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
  );
};

MainSelection.propTypes = {
  onHandleGetTravel: PropTypes.func.isRequired,
  onHandleGetImage: PropTypes.func.isRequired,
  onHandleImageLoading: PropTypes.func.isRequired,
};

export default MainSelection;
