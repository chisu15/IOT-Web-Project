const SensorRepository = require("../repositories/sensor.repository");

class SensorService {
    static async findAll(page = 1, size = 10) {
        try {
            const offset = (page - 1) * size;
  
            const data = await SensorRepository.findAll(offset, size);
            const totalRecords = await SensorRepository.countAll();
            const totalPages = Math.ceil(totalRecords / size);
  
            return { data, pagination: { currentPage: page, pageSize: size, totalRecords, totalPages } };
        } catch (error) {
            throw new Error(error.message);
        }
    }
  }
  
  module.exports = SensorService;