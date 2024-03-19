import React, { useState, useEffect } from 'react';
import userService from '../../api/user.service'; 
import './createArtwork.css'; 
import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";

const PaymentWallet = () => {
    const [money, setMoney] = useState('');
    const userId = localStorage.getItem("usersID");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (money >= 10000) {
            const data = {
                money: money, 
            };
            userService.top_up(userId, data)
            .then((response) => {
                if (response.data.status === 'Update Account balance successful') {
                    toast.success("Thành công", {
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error("Thất bại", {
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
            .catch(() => {
                toast.error("Thất bại", {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
        } else {
            toast.error("Số tiền ít nhất phải là 10000", {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    return (
        <div>
            <label>Số tiền hiện có </label>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nạp thêm</label>
                    <input 
                        value={money} 
                        onChange={(e) => setMoney(e.target.value)}
                        className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                        type="number"
                        placeholder="Ít nhất 10.000"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PaymentWallet;
