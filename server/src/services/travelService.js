const { json } = require("express");
const fs = require("fs");
const travelModel = require("../models/travel")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINIs_API_KEY);


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
    const extractJsonFromResponse2 = await extractJsonFromResponse(tripDescription);
    console.log(extractJsonFromResponse2)
    return extractJsonFromResponse2;
}

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


generateLlm = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const modelResult = await model.generateContent(prompt);
    return modelResult.response.text();
} 
