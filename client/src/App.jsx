import { useState, useEffect } from 'react';
import { Grid, Heading } from '@chakra-ui/react';
import './App.css';
import MainSelection from './components/MainSelection';
import FullTravel from './components/FullTravel';

function App() {
  const [travel, setTravel] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const handleGetTravel = (data) => {
    if (data?.travel && Array.isArray(data.travel)) {
      setTravel(data.travel);
    }
    console.log("apiTravel:", data);
  };

  const handleGetImage = (url) => {
    setImageUrl(url);
    setImageLoading(false);
  };

  const handleImageLoading = (loading) => {
    setImageLoading(loading);
  };

  useEffect(() => {
    console.log("Updated travel state:", travel);
  }, [travel]);

  return (
    <Grid paddingY={15} justifyContent="center">
      <Heading mb={100}>Plan your trip</Heading>
      {travel.length > 0 ? (
        <FullTravel travelDescription={travel} imageUrl={imageUrl} imageLoading={imageLoading} />
      ) : (
        <MainSelection 
          onHandleGetTravel={handleGetTravel} 
          onHandleGetImage={handleGetImage}
          onHandleImageLoading={handleImageLoading}
        />
      )}
    </Grid>
  );
}

export default App;
