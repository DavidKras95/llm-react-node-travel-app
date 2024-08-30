import PropTypes from 'prop-types';
import { Card, CardBody, Heading, Text, Box, Divider } from '@chakra-ui/react';

const TravelDescriotionCard = ({ travelDay }) => {
  return (
    <Card boxShadow="lg" borderRadius="md" p={4}>
      <CardBody>
        <Heading fontSize="xl" mb={4}>
          Day {travelDay.day}
        </Heading>
        <Box mb={4}>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">Start: </Text>
            <Text as="span">{travelDay.start.name}</Text>
          </Text>
          <Text mb={4}>
            <Text as="span" fontWeight="bold">End: </Text>
            <Text as="span">{travelDay.stop.name}</Text>
          </Text>
        </Box>
        <Divider mb={4} />
        <Text>
          {travelDay.description}
        </Text>
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
