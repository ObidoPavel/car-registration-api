const nhtsa = require('./nhtsa');

async function getAllMakes() {
  const rawMakes = await nhtsa.getAllRawMakes();
  const data = rawMakes.map(make => make.Make_Name);
  
  return {
    data
  }
}

async function getAllModels(make, year) {
  if (!make || !year) {
    return { message : 'No year or make is present in request' };
  }
  const rawModels = await nhtsa.getAllRawModels(make, year);
  const data = rawModels.map(model => model.Model_Name);
  
  return {
    data
  }
}

async function getInfoByVin(vin) {
  if (!vin) {
    return { message : 'No VIN is present in request' };
  }
  const rawInfo = await nhtsa.getRawDataByVin(vin);
  const year = rawInfo.find(info => info.Variable === "Model Year").Value;
  const make = rawInfo.find(info => info.Variable === "Make").Value;
  const model = rawInfo.find(info => info.Variable === "Model").Value;
  const data = `${year} ${make} ${model}`;
  
  return {
    data
  }
}

module.exports = {
    getAllMakes,
    getAllModels,
    getInfoByVin
}