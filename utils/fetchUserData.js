const axios = require("axios");

// function for fetching userInfo from "randomuser" API
const fetchUserData = async (URL) => {
  const response = await axios.get(URL);
  //   cloneing data without the key id in the array objects
  let dataClone = response.data.results.map((user) => {
    // using rest operator to exclude id as it is creating problem in MongoDB
    const { id, ...rest } = user;
    return rest;
  });

  return dataClone;
};

module.exports = { fetchUserData };
