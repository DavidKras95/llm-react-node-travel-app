import PropTypes from 'prop-types';
import TravelDescriotionCard from './TravelDescriotionCard';
import MapComponent from './MapComponent';
import { Grid, GridItem, Stack } from '@chakra-ui/react';

const FullTravel = ({ travelDescription }) => {
  return (
    <Grid
      h='auto'
      templateRows='repeat(3, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={6} 
      padding={4} 
    >
      <GridItem rowSpan={2} colSpan={1} padding={4}>
        <MapComponent travelDays={travelDescription} />
      </GridItem>
      <GridItem rowSpan={2} colSpan={1} padding={4}> 
        <Stack spacing={4}> 
          {travelDescription.map((day) => (
            <TravelDescriotionCard key={day.day} travelDay={day} />
          ))}
        </Stack>
      </GridItem>  
    </Grid>
  );
}

FullTravel.propTypes = {
  travelDescription: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      start: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      stop: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      description: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FullTravel;
