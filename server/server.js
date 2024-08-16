const express = require("express");

const app = express();

app.get("/api", (req,res) =>{
    res.json({test: ["test2", "test2", "test3"]});
});


app.listen(8080, () => {
    console.log("Server started on port 8080");
})

