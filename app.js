const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const schoolsRoutes = require("./routes/schoolsRoutes");

app.use(express.json());
app.use("/", schoolsRoutes);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
