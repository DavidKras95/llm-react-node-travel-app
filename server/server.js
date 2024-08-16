const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GEMINIs_API_KEY);




const app = express();
const corsOptions ={
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));




app.post("/testApi", async (req, res) => {
    try {
        async function run() {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = "How to travle in Israel in three days, "
            const result = model.generateContent(prompt);
            return result;
        }
        const result = await run();
        return res.status(200).json({ message: result.response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

  

app.get("/api", (req,res) =>{
    res.json({test: ["test1", "test2", "test3"]});
});


app.listen(8080, () => {
    console.log("Server started on port 8080");
})

