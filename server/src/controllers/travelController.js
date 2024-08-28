const travelModel = require("../models/travel")
const travelService = require("../services/travelService")



exports.getTravel = async (req, res) => {
    try {
        const country = req.body.country.toLowerCase();
        const transportationType = req.body.transpontationType.toLowerCase();
        console.log("Country:", country);
        console.log("Transportation Type:", transportationType);
        const dbTravel = await travelModel.findOne({
            country: country,
            'transportationType.type': transportationType
        });

        if (dbTravel) {
            return res.status(200).json({ dbTravel });
        } else {
            console.log("Enter entity")
            const newDbTravel = await travelService.createTravel(country, transportationType);
            return res.status(200).json({ newDbTravel });
        }
    } catch (error) {
        console.error('Error in getTravel:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



