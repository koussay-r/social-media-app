import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageData(null);
    setImageUrl(null);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageData(reader.result);
        console.log(reader.result)
        fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result })
        })
          .then(response => response.json())
          .then(data => setImageUrl(data.url))
          .catch(error => console.error(error));
      });
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {imageData && (
        <img src={imageData} alt="Uploaded file" width="200" height="200" />
      )}
      {imageUrl && (
        <img src={imageUrl} alt="Cloudinary file" width="200" height="200" />
      )}
    </div>
  );
}

export default App;
