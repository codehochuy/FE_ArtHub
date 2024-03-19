import React, { useState } from 'react';
import userService from '../../api/user.service';
import './createArtwork.css'; 

const CreateArtWork = () => {
    const [artworkName, setArtworkName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [base64String, setBase64String] = useState('');
    const userId = localStorage.getItem("usersID");


    const handleSubmit = (e) => {
        e.preventDefault();
        const requestData = {
            artworkName: artworkName,
            price: price,
            creator: userId,
            url: base64String
        };
        createArtWork(requestData);
    };

    const createArtWork = (requestData) => {
        userService.createArtWork(requestData)
        .then((response) => {
            console.log(response.data); 
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64String(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div className="create-artwork-container">
            <h2>Create Artwork</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên tác phẩm</label>
                    <input type="text" value={artworkName} onChange={(e) => setArtworkName(e.target.value)} />
                </div>
                <div>
                    <label>Giá</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Ảnh tác phẩm</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateArtWork;
