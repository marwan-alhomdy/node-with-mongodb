const express = require('express');
const bodyParser = require('body-parser');
const orderRouter = require("./router/client")

const app = express();

app.use(bodyParser.json());
app.use("/api", orderRouter);

app.listen(3040, "0.0.0.0", () => {
    console.log("Server is listening on port 3030");
});
