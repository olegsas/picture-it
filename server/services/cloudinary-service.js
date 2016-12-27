const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');

cloudinary.config({
    cloud_name: 'da14clfqg',
    api_key: '544232953924527',
    api_secret: 'lmxcf5a2o2cEqIcRqiHdtsy0gQo'
});

module.exports = {

    uploadImage: function (req, res, next) {
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, function (result) {
                if (result.url) {
                    // req.imageLink = result.url;
                    let image = new Image();
                    image.url = result.url;
                    image._owner = req.session._id;
                    image.save((err, response) => {
                        res.status(201).json(result.url)
                    })
                } else {
                    res.json(error);
                }
            });
        } else {
            next();
        }
    }
};