const imageService = require("../services/imageService")
const travelModel = require("../models/travel")



exports.getImage = async (req, res) => {
    try {
        const countryName = req.body.country.toLowerCase();
        console.log(countryName)
        let dbTravel = await travelModel.findOne({
            country: countryName,
        });

        if (dbTravel) {
            return res.status(200).json({ image: dbTravel.image });
        } else {
            console.log("Generate Image");
            const image = await imageService.generateImage(countryName);

            dbTravel = await travelModel.findOneAndUpdate(
                { country: countryName },
                { $set: { image: image } },
                { new: true, upsert: true }
            );

            return res.status(200).json({ image: dbTravel.image });
        }
    } catch (error) {
        console.error("Error in getImage:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};





    