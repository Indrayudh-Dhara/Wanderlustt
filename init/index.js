const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");



main().then((res)=>{
    console.log("connection is successful");
}).catch((err)=>{{
    console.log(err);
}})


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
  }

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj , owner: "67e81c9efb9ad68f3e6d38c3"}));//map functions doesnot make changes in the actual array and instead creates a new one , thats why we saved init data into the same init data to store the changes into the prev array
  
    await Listing.insertMany(initData.data);
    console.log("data was inserted");
};

initDB();