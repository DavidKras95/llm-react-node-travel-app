import PropTypes from 'prop-types';
import TravelDescriotionCard from './TravelDescriotionCard';
import MapComponent from './MapComponent';
import { Grid, GridItem, Stack, Image, Spinner } from '@chakra-ui/react';

const FullTravel = ({ travelDescription, imageUrl, imageLoading }) => {
  return (
    <Grid
      h='auto'
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={6}
      padding={4}
    >
      <GridItem rowSpan={2} colSpan={1} padding={4}>
        <MapComponent travelDays={travelDescription} />
        {/* {imageUrl && (
        <GridItem colSpan={2} padding={4}>
          <Image src={imageUrl} alt="Generated" />
        </GridItem>
      )} */}
            {imageLoading ? (
        <GridItem colSpan={2} padding={4}>
          <Spinner size="lg" />
        </GridItem>
      ) : imageUrl ? (
        <GridItem colSpan={2} padding={4}>
          <Image src={imageUrl} alt="Generated" />
        </GridItem>
      ) : null}
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
};

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
  imageUrl: PropTypes.string,
  imageLoading: PropTypes.bool.isRequired,
};

export default FullTravel;
