const travelModel = require("../models/travel")
const travelService = require("../services/travelService")

exports.getTravel = async (req, res) => {
    try {
        const country = req.body.country.toLowerCase();
        const transportationType = req.body.transpontationType.toLowerCase();
        console.log("Country:", country);
        console.log("Transportation Type:", transportationType);

        console.log("Enter entity")
        const travel = await travelService.createTravel(country, transportationType);
        return res.status(200).json({ travel });
    } catch (error) {
        console.error('Error in getTravel:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



