import React, { useState } from 'react';
import ImageSelect from "./ImageSelect";
import logo from './logo/userProfile.png'


function App() {
  const [image_url, setImage_Url] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [url, setUrl] = useState('')
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage_Url(file);
      setImageFile(URL.createObjectURL(file));
    }
  };


  const handleUpload = async () => {

    const formData = new FormData();
    if (image_url) {
      formData.append('image_url', image_url);
    }
    try {
      const response = await fetch(`http://localhost:8050/api/upload/image`, {
        method: 'POST',
        headers: {
          'authorization': "",
        },
        body: formData,
      });

      const data = await response.json();
      setUrl(data?.image_url)
    } catch (error) {
      alert('Error uploading image:', error);
    }
  }

  return (
    <div className='py-5'>
      <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
      <div className='p-5'>
        <button onClick={handleUpload} className='border rounded px-5 py-2'>Upload</button>
      </div>
      {url && <img src={url} alt={url} className='h-[350px] w-[350px] rounded' />}
    </div>
  );
}

export default App;


