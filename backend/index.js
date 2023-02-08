require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser=require('body-parser');
const axios = require('axios');

const connect = require("./config/db");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

mongoose.set("strictQuery", false);


app.get("/", (req, res) => {
	res.send("hello world!");
});

app.get("/fetch",async(req,res)=>{
    try{
        const data = await axios.get("https://randomuser.me/api/?results=50")
        const users = data.data.results
        const userdata = users.map(({ gender, name, email,location:{country},registered:{age} }) => ({ gender, name, email,country,age}));
        res.send(userdata)
    }catch(e){
        res.send({message:"error occur"})
    }
})

app.listen(PORT, async () => {
	connect()
	console.log(`Listening at http://localhost:${PORT}`);
});
