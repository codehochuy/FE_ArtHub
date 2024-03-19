import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateArtwork from './CreateArtwork';
import GetArtwork from './GetArtwork';
import PaymentWallet from './PaymentWallet';

import "./manageArtwork.css";
import { left } from '@cloudinary/url-gen/qualifiers/textAlignment';

const ManageArtwork = () => {
    const [showCreateArtwork, setShowCreateArtwork] = useState(false); 
    const [showGetArtwork, setShowGetArtwork] = useState(false); 
    const [showPaymentWallet, setShowPaymentWallet] = useState(false); 
   

    const handleCreateArtworkClick = () => {
        setShowCreateArtwork(true); 
        setShowGetArtwork(false); 
        setShowPaymentWallet(false);
    };
    const handleGetArtworkClick = () => {
        setShowGetArtwork(true); 
        setShowCreateArtwork(false); 
        setShowPaymentWallet(false);
    };

    const handleGetPaymentWalletClick = () => {
        setShowPaymentWallet(true); 
        setShowCreateArtwork(false); 
        setShowGetArtwork(false); 
    };


    return (
        
        <div className="grid-container">
        <div className="left-half">
        <h2>User</h2><br></br>
        
        <Link to="#" onClick={handleCreateArtworkClick}>Tạo tác phẩm</Link> <br></br>
        <Link to="#" onClick={handleGetArtworkClick}>Quản lí tác phẩm</Link><br></br>
        <Link to="#" onClick={handleGetPaymentWalletClick}>Ví thanh toán</Link><br></br>
        </div>

        
        <div className="right-half">
        <div>
        {showCreateArtwork && <CreateArtwork />} 
            {showGetArtwork && <GetArtwork />} 
            {showPaymentWallet && <PaymentWallet/>}
            </div>
            </div>


            </div>
       
        
    );
};

export default ManageArtwork;
