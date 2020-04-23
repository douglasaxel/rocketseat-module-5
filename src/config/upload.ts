import path from 'path';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileName = `${Date.now()} - ${file.originalname}`;

      return callback(null, fileName);
    },
  }),
});

export default upload;
