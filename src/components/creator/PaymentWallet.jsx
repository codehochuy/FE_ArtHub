import React, { useState, useEffect } from 'react';
import userService from '../../api/user.service'; 
import './createArtwork.css'; 
import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { FaWallet } from "react-icons/fa6";

const PaymentWallet = () => {
    const [money, setMoney] = useState('');
    const userId = localStorage.getItem("usersID");
    const [balance, setBalance] = useState(0);
    

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

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await userService.getBalance(userId);
                console.log(response.data)
                setBalance(response.data.money);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
        fetchBalance();
    }, []); // Chạy effect mỗi khi userId thay đổi

  




    return (
        <div className= "container">
           <FaWallet /> 
         <label>Số dư: {balance}</label> {/* Hiển thị số tiền hiện có */}
        
            <form onSubmit={handleSubmit}>

        


                {/* <div>
                    <label>Nạp thêm</label>
                    <input 
                        value={money} 
                        onChange={(e) => setMoney(e.target.value)}
                        className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                        type="number"
                        placeholder="Ít nhất 10.000"
                    />
                </div> */}



<div className="input-wrapper">
            <label htmlFor="artworkName">Nạp thêm</label>
{/* <div className="input-wrapper"> */}
<div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
<input value={money} onChange={(e) => setMoney(e.target.value)}
className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
type="number"
placeholder="Ít nhất 10.000 vnd"
/>
</div>
{/* </div> */}
</div>






                <button type="submit">Submit</button>
                </form>
        </div>
       
       
      
    );
};

export default PaymentWallet;
