const httpsHelper = require('../helpers/https');

async function getAllRawMakes() {
  const body = await httpsHelper.sendGetRequest('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
  const results = JSON.parse(body).Results;
  return results;
}

async function getAllRawModels(make, year) {
  const body = await httpsHelper.sendGetRequest(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${year}?format=json`);  
  const results = JSON.parse(body).Results;
  return results;
}

async function getRawDataByVin(vin) {
  const body = await httpsHelper.sendGetRequest(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
  const result = JSON.parse(body).Results;
  return result;
}

module.exports = {
  getAllRawMakes,
  getAllRawModels,
  getRawDataByVin
}