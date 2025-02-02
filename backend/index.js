const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const Transaction = require('./models/transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors({origin:process.env.CORS_URL}));
app.use(express.json());

app.get("/api/test",(req,res)=>{
    res.json("test");
});

app.post("/api/transaction", async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
        const {name,price,description,datetime} = req.body;
        const transaction = await Transaction.create({
        name,price,description,datetime
    });
    res.json(transaction);
});

app.get("/api/transactions", async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(4000, ()=>{
    console.log("app is listening on port 4000");
});