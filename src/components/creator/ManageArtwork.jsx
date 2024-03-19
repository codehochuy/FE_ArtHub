import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateArtwork from './CreateArtwork';
import GetArtwork from './GetArtwork';
import "./manageArtwork.css";

const ManageArtwork = () => {
    const [showCreateArtwork, setShowCreateArtwork] = useState(false); 
    const [showGetArtwork, setShowGetArtwork] = useState(false); 

    const handleCreateArtworkClick = () => {
        setShowCreateArtwork(true); 
        setShowGetArtwork(false); // Ẩn GetArtwork khi hiển thị CreateArtwork
    };
    const handleGetArtworkClick = () => {
        setShowGetArtwork(true); 
        setShowCreateArtwork(false); // Ẩn CreateArtwork khi hiển thị GetArtwork
    };


    return (
        <div className="manage-artwork-container">  
        <h2>Manage Artwork</h2>
        <Link to="#" onClick={handleCreateArtworkClick}>Tạo artwork</Link> 
        <Link to="#" onClick={handleGetArtworkClick}>Get artwork</Link>
        
        {showCreateArtwork && <CreateArtwork />} 
            {showGetArtwork && <GetArtwork />} 
        </div>
   
        
    );
};

export default ManageArtwork;
