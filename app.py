from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import io

# Load pre-trained model (Replace with your model)
model = tf.keras.models.load_model('path_to_your_model.h5')

app = Flask(__name__)

def preprocess_image(image):
    """ Preprocess the uploaded image for model input """
    image = image.resize((224, 224))  # Resize to match model input size
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    """ Handle image prediction requests """
    if 'image' not in request.files:
        return jsonify({'error': 'No image file uploaded'}), 400
    
    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))
    processed_image = preprocess_image(image)
    
    # Predict using the loaded model
    prediction = model.predict(processed_image)
    
    # Example prediction result processing (depends on your model)
    result = {'prediction': prediction.tolist()}
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
