var express = require('express')
var cors = require('cors')
require('dotenv').config()

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  upload.single('upfile')(req, res, function (err) {
    if (err) {
      return res.status(400).send({ error: 'File upload failed' });
    }
    
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }

    const fileInfo = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    };

    res.json(fileInfo);
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
