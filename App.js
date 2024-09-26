import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      alert("Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Retinal Imaging Neurodegenerative Disease Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {loading && <p>Loading...</p>}
      {prediction && <div>
        <h2>Prediction</h2>
        <p>{prediction}</p>
      </div>}
    </div>
  );
}

export default App;
