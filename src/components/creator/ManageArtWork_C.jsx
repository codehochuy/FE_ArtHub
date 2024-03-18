import React, { useState } from 'react';
import axios from 'axios';

function ManageArtWork_C() {
  const [artworkName, setArtworkName] = useState('');
  const [creator, setCreator] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('artworkName', artworkName);
    formData.append('creator', creator);
    formData.append('price', price);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/v1/creator/create2', formData, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZEBnbWFpbC5jb20iLCJpYXQiOjE3MTA3ODQ0MzEsImV4cCI6MTcxMDc5ODgzMX0.IEaet6_s2RPSWCpfesTLalKoQP7N65LwOjb_soF_LuE', 
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Handle success response here
    } catch (error) {
      console.error('Error creating artwork:', error);
      // Handle error response here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Artwork Name" value={artworkName} onChange={(e) => setArtworkName(e.target.value)} />
      <input type="number" placeholder="Creator ID" value={creator} onChange={(e) => setCreator(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Create Artwork</button>
    </form>
  );
}

export default ManageArtWork_C;