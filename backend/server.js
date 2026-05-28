require("dotenv").config()
const express=require("express");
const todoroutes=require("./routes/todoroutes")
const mongoose = require("mongoose")
const app=express()
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
  
app.use(express.json())
app.get("/",(req,res) =>{
    res.send("To do app is running")
})
app.use("/todos", todoroutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});