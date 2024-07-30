const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/accounts"); // Ensure this path is correct

app.use(cors());
app.use(express.json());
app.use("/", router); // Ensure the router is correctly set

const PORT = 8000;
app.listen(PORT, () => console.log(`${PORT} is listening`));
