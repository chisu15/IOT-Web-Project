const express = require("express");
const cors = require("cors");
const db = require("./configs/database");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
db.connect();

const route = require("./routes/index.route");
route(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
