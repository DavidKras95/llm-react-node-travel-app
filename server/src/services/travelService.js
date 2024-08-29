const { json } = require("express");
const fs = require("fs");
const travelModel = require("../models/travel")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINIs_API_KEY);


// exports.createTravel = async (countryName, transpontationType) => {
//     let prompt = "";
//     if(transpontationType == "car"){
//         prompt = `Plan a route of three consecutive and continuous days (city to city) car trip, within the limits of a minimum of 80 km per day up to 300 km per day at ${countryName}`
//     }
//     else{
//         prompt = `Plan a route of three consecutive and continuous days (city to city) car trip, within the limits of a maximum route of 80 km per day at ${countryName}`
//     }

//     const tripDescription = await generateLlm(prompt);
//     return dbResult = await updateTravel(countryName, transpontationType, tripDescription)
// }

exports.createTravel = async (countryName, transpontationType) => {
    let prompt = "";
    let llmInstuctions = `Each day's start and end destinations should include latitude and longitude coordinates the description will include information about points of interest along the way
    and include trip if any, with the details provided in an array of objects (JSON) formatted like this:
    {"day": 1,"start": {"lat": number,"lng": number,"name": "string"},"stop": {"lat": number,"lng": number,"name": "string"},"description": "string","distance": number,"duration": number}`
    if(transpontationType == "car"){
        prompt = `Plan a itinerary of three consecutive and continuous days (city to city) car trip, within the limits of a minimum of 80 km per day up to 300 km per day at ${countryName}` + llmInstuctions
    }
    else{
        prompt = `Plan a itinerary of three consecutive and continuous days (city to city) bicycle trip, within the limits of a maximum route of 80 km per day at ${countryName}`+ llmInstuctions
    }

    const tripDescription = await generateLlm(prompt);
    // console.log(tripDescription)
    const extractJsonFromResponse2 = await extractJsonFromResponse(tripDescription);
    console.log(extractJsonFromResponse2)
    return extractJsonFromResponse2;
}

// parseGenerateLlmResponse = async(llmResponse) => {
//   // Regular expression to match the entire JSON array, including the surrounding square brackets
//   const jsonArrayRegex = /(\[[\s\S]*?\])/;

//   // Find the JSON array in the response
//   const jsonArrayMatch = llmResponse.match(jsonArrayRegex);

//   if (!jsonArrayMatch) {
//     console.warn("No valid JSON array found in the response");
//     return [];
//   }

//   try {
//     // Parse the extracted JSON array
//     const tripArray = JSON.parse(jsonArrayMatch[1]);

//     // Validate each trip object in the array
//     const validatedTrips = tripArray.map((trip, index) => {
//       const requiredFields = ['day', 'start', 'stop', 'description', 'distance', 'duration'];
//       const missingFields = requiredFields.filter(field => !trip.hasOwnProperty(field));

//       if (missingFields.length > 0) {
//         console.warn(`Warning: Missing fields in trip object ${index + 1}: ${missingFields.join(', ')}`);
//       }

//       // Ensure all fields are present, use placeholders if missing
//       requiredFields.forEach(field => {
//         if (!trip.hasOwnProperty(field)) {
//           trip[field] = field === 'start' || field === 'stop' ? 
//             { lat: 0, lng: 0, name: "Unknown" } : 
//             (field === 'day' || field === 'distance' || field === 'duration' ? 0 : "N/A");
//         }
//       });

//       return trip;
//     });

//     return validatedTrips;
//   } catch (error) {
//     console.error("Error parsing JSON array:", error.message);
//     return [];
//   }
// };


extractJsonFromResponse = async (response) => {
    const itinerary = [];
    const dayPattern = /"day":\s*(\d+)/g;
    const startLatPattern = /"start":\s*{[^}]*"lat":\s*([\d.-]+)/g;
    const startLngPattern = /"start":\s*{[^}]*"lng":\s*([\d.-]+)/g;
    const startNamePattern = /"start":\s*{[^}]*"name":\s*"([^"]+)"/g;
    const stopLatPattern = /"stop":\s*{[^}]*"lat":\s*([\d.-]+)/g;
    const stopLngPattern = /"stop":\s*{[^}]*"lng":\s*([\d.-]+)/g;
    const stopNamePattern = /"stop":\s*{[^}]*"name":\s*"([^"]+)"/g;
    const descriptionPattern = /"description":\s*"([^"]+)"/g;
    const distancePattern = /"distance":\s*([\d.]+)/g; // 
    const durationPattern = /"duration":\s*([\d.]+)/g;
  
    const textWithoutExtraChars = response.replace(/[`*]+/g, '');
  
    let dayMatch, startLatMatch, startLngMatch, startNameMatch, stopLatMatch, stopLngMatch, stopNameMatch, descriptionMatch, durationMatch;
  
    while ((dayMatch = dayPattern.exec(textWithoutExtraChars)) &&
           (startLatMatch = startLatPattern.exec(textWithoutExtraChars)) &&
           (startLngMatch = startLngPattern.exec(textWithoutExtraChars)) &&
           (startNameMatch = startNamePattern.exec(textWithoutExtraChars)) &&
           (stopLatMatch = stopLatPattern.exec(textWithoutExtraChars)) &&
           (stopLngMatch = stopLngPattern.exec(textWithoutExtraChars)) &&
           (stopNameMatch = stopNamePattern.exec(textWithoutExtraChars)) &&
           (descriptionMatch = descriptionPattern.exec(textWithoutExtraChars)) &&
           (distanceMatch = distancePattern.exec(textWithoutExtraChars)) &&
           (durationMatch = durationPattern.exec(textWithoutExtraChars))) {
  
      itinerary.push({
        day: parseInt(dayMatch[1]),
        start: {
          lat: parseFloat(startLatMatch[1]),
          lng: parseFloat(startLngMatch[1]),
          name: startNameMatch[1],
        },
        stop: {
          lat: parseFloat(stopLatMatch[1]),
          lng: parseFloat(stopLngMatch[1]),
          name: stopNameMatch[1],
        },
        description: descriptionMatch[1],
        distance: parseFloat(distanceMatch[1]),
        duration: parseFloat(durationMatch[1]),
      });
    }
  
    return itinerary;
  };


// updateTravel = async (countryName, transportationType, tripDescription) => {
//     try {
//         const travel = await travelModel.findOne({ country: countryName });
//         const newTransportationType = {
//             type: transportationType,
//             description: tripDescription
//         };
        
//         if (!travel) {
//             console.log("Creating new document");
//             const newTravel = await travelModel.create({
//                 country: countryName,
//                 transportationType: [newTransportationType]
//             });
//             console.log('Created new travel document with transportation type:', transportationType);
//             return newTravel;
//         } else {
//             console.log("Updating existing document");
//             travel.transportationType.push(newTransportationType);
//             const updatedTravel = await travel.save();
//             console.log('Added new transportation type:', transportationType);
//             return updatedTravel;
//         }
//     } catch (error) {
//         console.error('Error updating travel entity:', error);
//         throw error; 
//     }
// };


generateLlm = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const modelResult = await model.generateContent(prompt);
    return modelResult.response.text();
} 

// getImage = async (countryName) => {
//     const prompt = `Image that describes travel at ${countryName}`
//     const url = 'https://stablehorde.net/api/v2/generate/async';
//     const payload = {
//         prompt: prompt,
//         params: {
//             n: 1,
//             width: 512,
//             height: 512,
//             seed: Math.floor(Math.random() * 10000).toString()
//         }
//     };
  
//     try {
//         const response = await axios.post(url, payload, {
//             headers: {
//                 'apikey': process.env.stablehorde_API_KEY
//             }
//         });

//         const jobId = response.data.id;
//         console.log(`Job ID: ${jobId}`);

//         let waitTimeResponse;
//         let waitTime;
//         let maxRetries = 20;
//         let retries = 0;
//         do {
//             await new Promise(resolve => setTimeout(resolve, 10000)); 

//             const statusUrl = `https://stablehorde.net/api/v2/generate/status/${jobId}`;
//             waitTimeResponse = await axios.get(statusUrl);

//             waitTime = waitTimeResponse.data.wait_time;
//             console.log(`Estimated wait time: ${waitTime} seconds`);

//             retries++;
//         } while (waitTimeResponse.data.done !== true && retries < maxRetries);

//         if (waitTimeResponse.data.done) {
//             const imageUrl = waitTimeResponse.data.generations[0].img;
//             return imageUrl;
//         } else {
//             return false;
//         }

//     } catch (error) {
//         console.error('Error generating image:', error.response ? error.response.data : error.message);
//         return false;
//     }
// };