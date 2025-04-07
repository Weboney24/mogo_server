const NodeGeocoder = require("node-geocoder");
const axios = require("axios");
const geolib = require("geolib");

// Create an Axios instance with custom settings
const axiosInstance = axios.create({
  timeout: 5000, // Set timeout to 5 seconds
});

const options = {
  provider: "openstreetmap",
  httpAdapter: "axios",
  axiosInstance,
  language: "en",
  countrycodes: "us",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

const getCoordinatesFromPinCode = async (pinCode) => {
  try {
    const res = await geocoder.geocode(pinCode);

    if (res.length > 0) {
      return res;
    } else {
      throw new Error("No results found for the specified pin code.");
    }
  } catch (err) {
    console.error("Error getting coordinates:", err.message);
    throw err;
  }
};

const getZipCodeAddress = async (req, res) => {
  try {
    const result1 = await getCoordinatesFromPinCode("639003");
    return res.status(200).send({ data: result1 });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getZipCodeAddress };
