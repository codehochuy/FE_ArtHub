import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateArtwork from './CreateArtwork';
import GetArtwork from './GetArtwork';
import HistoryOrder from './HistoryOrder';
import PaymentWallet from './PaymentWallet';
import ManageUser from './ManageUser';
import { IoIosCreate } from "react-icons/io";
import "./manageArtwork.css";
import { GrUserManager } from "react-icons/gr";
import { GiWallet } from "react-icons/gi";
import { AiFillPicture } from "react-icons/ai";
import { BiSolidShoppingBagAlt } from "react-icons/bi";

const ManageArtwork = () => {
    const userRole = localStorage.getItem("userRole");

    const [showCreateArtwork, setShowCreateArtwork] = useState(false); 
    const [showGetArtwork, setShowGetArtwork] = useState(false); 
    const [showPaymentWallet, setShowPaymentWallet] = useState(false); 
    const [showUser, setShowUser] = useState(false); 
    const [showHistory, setShowHistory] = useState(false); 
    const [isUserManagerExpanded, setIsUserManagerExpanded] = useState(true); 

    
   
    const handleCreateArtworkClick = () => {
        setShowCreateArtwork(true); 
        setShowGetArtwork(false); 
        setShowPaymentWallet(false);
        setShowUser(false);
        setShowHistory(false); 
    };
    
    const handleGetArtworkClick = () => {
        setShowGetArtwork(true); 
        setShowCreateArtwork(false); 
        setShowPaymentWallet(false);
        setShowUser(false);
        setShowHistory(false); 
    };

    const handleGetPaymentWalletClick = () => {
        setShowPaymentWallet(true); 
        setShowCreateArtwork(false); 
        setShowGetArtwork(false); 
        setShowUser(false);
        setShowHistory(false); 
    };
    
    const handleUserClick = () => {
        setShowUser(true); 
        setShowCreateArtwork(false); 
        setShowGetArtwork(false); 
        setShowPaymentWallet(false);
        setShowHistory(false); 
    };
    const handleGetHistoryClick = () => {
        setShowHistory(true); 
        setShowCreateArtwork(false); 
        setShowGetArtwork(false); 
        setShowPaymentWallet(false);
        setShowUser(false); 
        
        
    };

    return (
       

        <div className="grid-container">
            <div className="left-half">
                <br/>
                {userRole == "AUDIENCE" && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <GiWallet/><Link to="#" onClick={handleGetPaymentWalletClick} style={{ marginLeft: '5px' }}>Ví thanh toán</Link>
                        </div>
                       
                    </>
                )}
               
                {userRole == "CREATOR" && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IoIosCreate/><Link to="#" onClick={handleCreateArtworkClick} style={{ marginLeft: '5px' }}>Tạo tác phẩm</Link>
                        </div>
                        <br/>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AiFillPicture/><Link to="#" onClick={handleGetArtworkClick} style={{ marginLeft: '5px' }}>Quản lí tác phẩm</Link>
                        </div>
                        <br/>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <BiSolidShoppingBagAlt/><Link to="#" onClick={handleGetHistoryClick} style={{ marginLeft: '5px' }}>Tác phẩm đã bán</Link>
                        </div>
                        <br/>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <GiWallet/><Link to="#" onClick={handleGetPaymentWalletClick} style={{ marginLeft: '5px' }}>Ví thanh toán</Link>
                        </div>
                     
                        
                    </>
                )}
            </div>
            <div className="right-half">
            {userRole == "ADMIN" && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <GrUserManager/><Link to="#" onClick={handleUserClick} style={{ marginLeft: '5px' }}>Quản lí user</Link>
                        </div>
                    </>
                )}
                <div>
                    {showCreateArtwork && <CreateArtwork />} 
                    {showGetArtwork && <GetArtwork />} 
                    {showPaymentWallet && <PaymentWallet/>}
                    {showUser && <ManageUser/>}
                    {showHistory && <HistoryOrder/>}
                </div>
            </div>
        </div>
       
    );    
};

export default ManageArtwork;
