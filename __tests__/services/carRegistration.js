const nhtsa = require('../../services/nhtsa');
const service = require('../../services/carRegistration');

jest.mock('../../services/nhtsa');

describe('car-registration-api tests', () => {

  afterEach(() => jest.resetAllMocks());

  test('getAllMakes test', () => {
    nhtsa.getAllRawMakes.mockResolvedValue(
      [
        { Make_Name: "Make1" },
        { Make_Name: "Make2" }
      ]
    );

    return service.getAllMakes().then(actual => {
      expect(actual.data.length).toBe(2);
      expect(nhtsa.getAllRawMakes).toHaveBeenCalled();
    });
  });

  test('getAllModels test', () => {
    nhtsa.getAllRawModels.mockResolvedValue(
      [
        { Model_Name: "Model1" },
        { Model_Name: "Model2" }
      ]
    );

    return service.getAllModels('test', 'test').then(actual => {
      expect(actual.data.length).toBe(2);
      expect(nhtsa.getAllRawModels).toHaveBeenCalled();
    });
  });

  test('getAllModels test no parameters', () => {
    return service.getAllModels().then(actual => {
      expect(actual.message).toBe('No year or make is present in request');
      expect(nhtsa.getAllRawModels).toHaveBeenCalledTimes(0);
    });
  });

  test('getInfoByVin test', () => {
    nhtsa.getRawDataByVin.mockResolvedValue(
      [
        {
          Variable: "Model Year",
          Value: "year"
        },
        {
          Variable: "Make",
          Value: "make"
        },
        {
          Variable: "Model",
          Value: "model"
        },
      ]
    );

    return service.getInfoByVin('test').then(actual => {
      expect(actual.data).toBe('year make model');
      expect(nhtsa.getRawDataByVin).toHaveBeenCalled();
    });
  });

  test('getInfoByVin test no parameter', () => {    
    return service.getInfoByVin().then(actual => {
      expect(actual.message).toBe('No VIN is present in request');      
      expect(nhtsa.getRawDataByVin).toHaveBeenCalledTimes(0);
    });
  });

  test('getInfoByVin test no info', () => {
    nhtsa.getRawDataByVin.mockResolvedValue(null);
    return service.getInfoByVin('test').then(actual => {
      expect(actual.message).toBe('No info is present for this VIN');
      expect(nhtsa.getRawDataByVin).toHaveBeenCalled();
    });
  });

});
