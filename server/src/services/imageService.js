const axios = require('axios');
// const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');


exports.generateImage = async (countryName) =>{
    const prompt = `Generate me an image of ${countryName} country`
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
            console.log(imageUrl)
            const imageBase64 = await getImageBase64(imageUrl);
            return imageBase64;
        } else {
            console.log("Image generation took too long or failed");
            return false;
        }

    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
};

getImageBase64 = async(imageUrl) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        console.log(response.data)
        const buffer = Buffer.from(response.data, 'binary');
        const base64Image = buffer.toString('base64');
        return base64Image;
    }
 catch (error) {
    console.error('Failed to convert image to base64');
    res.status(500).json({ error: error.message });
    }
};

