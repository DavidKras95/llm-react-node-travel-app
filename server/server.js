const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./src/routes/routes");

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
};


app.use(express.json());
app.use(cors(corsOptions));
app.use("/", userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "An internal server error occurred" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
