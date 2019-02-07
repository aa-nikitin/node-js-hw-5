const User = require('../models/user');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

module.exports = (req, res, next) => {
  const form = new formidable.IncomingForm();
  const upload = 'upload';
  const uploadDir = path.join('./server', '/dist', upload);
  const id = req.params.id;

  form.uploadDir = path.join(process.cwd(), uploadDir);
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    }
    const fileNameDir = path.join(uploadDir, files[id].name);
    const fileName = path.join(upload, files[id].name);

    fs.rename(files[id].path, fileNameDir, err => {
      if (err) {
        return next(err);
      }

      Jimp.read(fileNameDir, (err, image) => {
        if (err) throw err;
        image
          .cover(370, 370)
          .quality(90)
          .background(0xffffffff)
          .write(fileNameDir);
      });

      User.updateOne({ id: id }, { image: fileName }, { new: true })
        .then(() => {
          return res.status(200).json({ path: fileName });
        })
        .catch(err => {
          return res.status(400).json({
            error: `Произошла ошибка: ${err.message}`
          });
        });
    });
  });
};
