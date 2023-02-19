const axios = require("axios");
const userModel = require("../models/user.model");
const { fetchUserData } = require("../utils/fetchUserData");

// FETCH USER DATA FROM EXTERNAL API AND POST IT ON MONGODB.

// fetching 100 user data from function fetchUserData()
// using insertMany method to insert many number of data
// .count method to count the total number of document we have after inserting new data
// sending success message and document count on success
// sending failure message in case of failure 

const userinfo = async (req, res) => {
  try {
    fetchUserData("https://randomuser.me/api/?results=100")
      .then((data) => userModel.insertMany(data))
      .then((data) => userModel.count())
      .then((data) => res.status(200).json({ status: "success", document_count: data }));
   } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// DELETE FULL USER DATA

// deleting all user from MongoDB collection with deleteMany query
// sending message in case of failure

const deleteUsers = async (req, res) => {
  try {
    const removeuser = await userModel.deleteMany();
    res.status(200).json({ status: "success", removeuser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
};





// GET COUNT OF DATA
const getUserCount = async (req, res) => {
  try {
   const count = await userModel.count()
   res.status(200).json({status:"success",count})
  }catch(err){
    res.status(500).json({status:"error",message:err.message})
  }
}


// FILTER USER DATA 
// CAN BE USED TO GET WHOLE DATA OR FILTERED DATA

const filterUsers = async (req, res) => {
  let query = {};
   if(req.body.type == "female") query = {gender:"female"}; 
   if(req.body.type == "male") query = {gender:"male"};
   if(req.body.type == "age<50") query= {"dob.age":{$lt:50}};
   if(req.body.type == "age>49") query={"dob.age":{$gt:49}};
   if(req.body.type == "India") query={"location.country":"India"};
   if(req.body.type == "ma<50") query = {gender:"male","dob.age":{$lt:50}};
   if(req.body.type == "ma>49") query = {gender:"male","dob.age":{$gt:49}};
   if(req.body.type == "fa<50") query = {gender:"female", "dob.age":{$lt:50}};
   if(req.body.type == "fa>49") query = {gender:"female", "dob.age":{$gt:49}};
  try{
    const documentcount = await userModel.find(query).count()
    const filteredUser = await userModel.find(query).skip(req.params.page).limit(10)
    res.status(200).json({page_count: Math.floor(documentcount/10), documentcount, filteredUser})

  }catch(err){
    console.log(err.message)
    res.status(500).json({status:"error",message:err.message})
  }
}

module.exports = { userinfo, deleteUsers , getUserCount ,filterUsers };
