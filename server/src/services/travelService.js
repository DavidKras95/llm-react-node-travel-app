const { json } = require("express");
const fs = require("fs");
const travelModel = require("../models/travel")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINIs_API_KEY);


exports.createTravel = async (countryName, transpontationType) => {
    let prompt = "";
    if(transpontationType == "car"){
        prompt = `Plan a route of three consecutive and continuous days (city to city) car trip, within the limits of a minimum of 80 km per day up to 300 km per day at ${countryName}`
    }
    else{
        prompt = `Plan a route of three consecutive and continuous days (city to city) car trip, within the limits of a maximum route of 80 km per day at ${countryName}`
    }

    const tripDescription = await getTripDescription(prompt);
    return dbResult = await updateTravel(countryName, transpontationType, tripDescription)
}

updateTravel = async (countryName, transportationType, tripDescription) => {
    try {
        const travel = await travelModel.findOne({ country: countryName });
        const newTransportationType = {
            type: transportationType,
            description: tripDescription
        };
        
        if (!travel) {
            console.log("Creating new document");
            const newTravel = await travelModel.create({
                country: countryName,
                transportationType: [newTransportationType]
            });
            console.log('Created new travel document with transportation type:', transportationType);
            return newTravel;
        } else {
            console.log("Updating existing document");
            travel.transportationType.push(newTransportationType);
            const updatedTravel = await travel.save();
            console.log('Added new transportation type:', transportationType);
            return updatedTravel;
        }
    } catch (error) {
        console.error('Error updating travel entity:', error);
        throw error; 
    }
};


getTripDescription = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const modelResult = await model.generateContent(prompt);
    return modelResult.response.text();
} 

getImage = async (countryName) => {
    const prompt = `Image that describes travel at ${countryName}`
    const url = 'https://stablehorde.net/api/v2/generate/async';
    const payload = {
        prompt: prompt,
        params: {
            n: 1,
            width: 512,
            height: 512,
            seed: Math.floor(Math.random() * 10000).toString()
        }
    };
  
    try {
        const response = await axios.post(url, payload, {
            headers: {
                'apikey': process.env.stablehorde_API_KEY
            }
        });

        const jobId = response.data.id;
        console.log(`Job ID: ${jobId}`);

        let waitTimeResponse;
        let waitTime;
        let maxRetries = 20;
        let retries = 0;
        do {
            await new Promise(resolve => setTimeout(resolve, 10000)); 

            const statusUrl = `https://stablehorde.net/api/v2/generate/status/${jobId}`;
            waitTimeResponse = await axios.get(statusUrl);

            waitTime = waitTimeResponse.data.wait_time;
            console.log(`Estimated wait time: ${waitTime} seconds`);

            retries++;
        } while (waitTimeResponse.data.done !== true && retries < maxRetries);

        if (waitTimeResponse.data.done) {
            const imageUrl = waitTimeResponse.data.generations[0].img;
            return imageUrl;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        return false;
    }
};