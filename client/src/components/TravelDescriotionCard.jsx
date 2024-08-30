import PropTypes from 'prop-types';
import { Card, CardBody, Heading, Textarea } from '@chakra-ui/react';

const TravelDescriotionCard = ({ travelDay }) => {
  return (
    <Card>
      <CardBody>
        <Heading fontSize='2xl'>Day {travelDay.day}</Heading>
        <Textarea 
          placeholder={`Start the day at ${travelDay.start.name}, End of the day at ${travelDay.stop.name}`} 
        />
        <Textarea placeholder={travelDay.description} />
      </CardBody>
    </Card>
  );
}

TravelDescriotionCard.propTypes = {
  travelDay: PropTypes.shape({
    day: PropTypes.number.isRequired,
    start: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    stop: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default TravelDescriotionCard;
