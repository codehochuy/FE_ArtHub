import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateArtwork from './CreateArtwork';
import GetArtwork from './GetArtwork';
import PaymentWallet from './PaymentWallet';
import ManageUser from './ManageUser';
import { IoIosCreate } from "react-icons/io";

import "./manageArtwork.css";
import { left } from '@cloudinary/url-gen/qualifiers/textAlignment';
import { GrUserManager } from "react-icons/gr";
import { GiWallet } from "react-icons/gi";
import { AiFillPicture } from "react-icons/ai";


const ManageArtwork = () => {
    const userId = localStorage.getItem("usersID");


    const [showCreateArtwork, setShowCreateArtwork] = useState(false); 
    const [showGetArtwork, setShowGetArtwork] = useState(false); 
    const [showPaymentWallet, setShowPaymentWallet] = useState(false); 
    const [showUser, setShowUser] = useState(false); 
   

    const handleCreateArtworkClick = () => {
        setShowCreateArtwork(true); 
        setShowGetArtwork(false); 
        setShowPaymentWallet(false);
        setShowUser(false);
    };
    const handleGetArtworkClick = () => {
        setShowGetArtwork(true); 
        setShowCreateArtwork(false); 
        setShowPaymentWallet(false);
        setShowUser(false);
    };

    const handleGetPaymentWalletClick = () => {
        setShowPaymentWallet(true); 
        setShowCreateArtwork(false); 
        setShowGetArtwork(false); 
        setShowUser(false);
    };
    const handleUserClick = () => {
        setShowUser (true); 
        setShowCreateArtwork(false); 
        setShowGetArtwork(false); 
        setShowPaymentWallet(false);
    };


    return (
        <div className="grid-container">
            <div className="left-half">
                <h2>User</h2><br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IoIosCreate/><Link to="#" onClick={handleCreateArtworkClick} style={{ marginLeft: '5px' }}>Tạo tác phẩm</Link>
                </div>
                <br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AiFillPicture/><Link to="#" onClick={handleGetArtworkClick} style={{ marginLeft: '5px' }}>Quản lí tác phẩm</Link>
                </div>
                <br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GiWallet/><Link to="#" onClick={handleGetPaymentWalletClick} style={{ marginLeft: '5px' }}>Ví thanh toán</Link>
                </div>
                <br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GrUserManager/><Link to="#" onClick={handleUserClick} style={{ marginLeft: '5px' }}>Quản lí user</Link>
                </div>
            </div>
            <div className="right-half">
                <div>
                    {showCreateArtwork && <CreateArtwork />} 
                    {showGetArtwork && <GetArtwork />} 
                    {showPaymentWallet && <PaymentWallet/>}
                    {showUser && <ManageUser/>}
                </div>
            </div>
        </div>
    );
    
};

export default ManageArtwork;
