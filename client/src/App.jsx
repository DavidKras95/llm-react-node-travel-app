import { useState, useEffect } from 'react';
import { Grid, Heading } from '@chakra-ui/react';
import './App.css';
import MainSelection from './components/MainSelection';
import FullTravel from './components/FullTravel';

function App() {
  const [travel, setTravel] = useState([]);

  const handleGetTravel = (apiTravel) => {
    if (apiTravel?.data?.travel && Array.isArray(apiTravel.data.travel)) {
      setTravel(apiTravel.data.travel);
    }
    console.log("apiTravel:", apiTravel.data.travel);
  }

  useEffect(() => {
    console.log("Updated travel state:", travel);
  }, [travel]);

  return (
    <Grid paddingY={15} justifyContent="center">
      <Heading mb={100}>Plan your trip</Heading>
      {travel.length > 0 ? (
        <FullTravel travelDescription={travel} />
      ) : (
        <MainSelection onHandleGetTravel={handleGetTravel} />
      )}
    </Grid>
  );
}

export default App;
