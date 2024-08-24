const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINIs_API_KEY);


exports.getDescription = async (req, res) => {
    try {
        const { country, transpontationType } = req.body;
        console.log("Country:", country);
        console.log("Transportation Type:", transpontationType);
        // async function run() {
        //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        //     const prompt = "How to travle in Israel in three days, "
        //     const result = model.generateContent(prompt);
        //     return result;
        // }
        // const result = await run();
        // return res.status(200).json({ message: result.response.text() });
        return res.status(200).json({ });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};