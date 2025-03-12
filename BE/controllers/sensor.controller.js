const SensorService = require("../services/sensor.service");
const { DEFAULT_PAGE, DEFAULT_SIZE } = require('../const/common.const')

class SensorController {
  static async getAllSensors(req, res) {
      try {
          let { page, size } = req.query;
          page = parseInt(page) || DEFAULT_PAGE;
          size = parseInt(size) || DEFAULT_SIZE;

          const result = await SensorService.findAll(page, size);

          res.json({
              success: true,
              data: result.data,
              pagination: result.pagination
          });
      } catch (error) {
          res.status(500).json({ success: false, message: error.message });
      }
  }
}

module.exports = SensorController;


// module.exports.detail = async (req, res) => {
//   try {
//     const { id } = req.params
//     const tour = await Tour.findById(id)
//     if (!tour) {
//       return res.json({
//         code: 204,
//         message: 'No tour found',
//       })
//     }
//     res.json({
//       code: 200,
//       message: 'Get data success',
//       data: tour,
//     })
//   } catch (error) {
//     res.json({
//       code: 400,
//       error: error.message,
//     })
//   }
// }

// module.exports.create = async (req, res) => {
//   try {
//     const tourCreate = new Tour({
//       ...req.body,
//     })
//     await tourCreate.save()
//     res.json({
//       code: 200,
//       message: 'Create success',
//     })
//   } catch (error) {
//     res.json({
//       code: 400,
//       error: error.message,
//     })
//   }
// }

// module.exports.edit = async (req, res) => {
//   try {
//     const { id } = req.params
//     const body = req.body
//     const tour = await Tour.findById(id)
//     if (!tour) {
//       return res.json({
//         code: 204,
//         message: 'No tour found',
//       })
//     }
//     const updated = await Tour.findByIdAndUpdate(id, body)
//     if (updated.modifiedCount === 0) {
//       return res.json({
//         code: 400,
//         message: 'Updated fail',
//       })
//     }
//     res.json({
//       code: 200,
//       message: 'Update success',
//       data: body,
//     })
//   } catch (error) {
//     res.json({
//       code: 400,
//       error: error.message,
//     })
//   }
// }

// module.exports.deleteOne = async (req, res) => {
//   try {
//     const { id } = req.params
//     const tour = await Tour.findById(id)
//     if (!tour) {
//       return res.json({
//         code: 204,
//         message: 'No tour found',
//       })
//     }
//     const filesToDelete = []

//     if (tour.path.main) filesToDelete.push(tour.path.main)
//     if (tour.path.video.length > 0) filesToDelete.push(...tour.path.video)
//     if (tour.path.image.length > 0) filesToDelete.push(...tour.path.image)

//     for (const filePath of filesToDelete) {
//       const absolutePath = path.join(__dirname, '..', filePath)
//       if (await fs.pathExists(absolutePath)) {
//         await fs.remove(absolutePath)
//       }
//     }
//     await tour.deleteOne()
//     res.json({
//       code: 200,
//       message: 'Delete success',
//     })
//   } catch (error) {
//     res.json({
//       code: 400,
//       error: error.message,
//     })
//   }
// }
