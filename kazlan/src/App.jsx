import React, { useState } from 'react';
import ImageSelect from "./ImageSelect";
import logo from './logo/userProfile.png'


function App() {
  const [image_url, setImage_Url] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [url, setUrl] = useState('');
  const [size, setSize] = useState()


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
      setUrl(data?.image_url);
      setSize(data?.size_kb)
    } catch (error) {
      alert('Error uploading image:', error);
    }
  }

  return (
    <div className='py-5 flex justify-center items-center'>
      <div>
        <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} image_url={image_url} reset={() => { setImageFile(null); setImage_Url(null) }} />
        <div className='p-5'>
          <button onClick={handleUpload} className='border rounded px-5 py-2'>Upload</button>
        </div>
        <div>
          <div >
            {url && <img src={url} alt={url} className='w-56 h-56 object-cover rounded-lg border border-red-500 p-1' />}
          </div>
          {size && <h1 className="py-2">After Compresed your file size is {size} KB </h1>}
        </div>
      </div>
    </div>
  );
}

export default App;


