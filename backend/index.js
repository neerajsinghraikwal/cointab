require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser=require('body-parser');

const connect = require("./config/db");
const UserModel = require("./models/users.model");
const userRouter = require("./routes/users.route");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

mongoose.set("strictQuery", false);

app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.send("hello world!");
});


app.listen(PORT, async () => {
	connect()
	console.log(`Listening at http://localhost:${PORT}`);
});
