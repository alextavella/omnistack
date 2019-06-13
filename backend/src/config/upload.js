const path = require('path')
const multer = require('multer')

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            callback(null, file.originalname)
        }
    })
}