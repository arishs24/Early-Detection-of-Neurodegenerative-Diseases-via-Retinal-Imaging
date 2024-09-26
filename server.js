const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    const image = req.file.path;

    // Forward the image to the Python Flask API
    axios({
        method: 'post',
        url: 'http://localhost:5000/predict',  // Flask API URL
        headers: { 'Content-Type': 'multipart/form-data' },
        data: {
            image: fs.createReadStream(image)
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Prediction failed' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
