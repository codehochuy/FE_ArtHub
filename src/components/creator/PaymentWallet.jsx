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
    const [reloadComponent, setReloadComponent] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (money < 10000) {
            toast.error("Số tiền ít nhất phải là 10000", {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }else{

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
                    setReloadComponent(true);
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
        if (reloadComponent) {
            setReloadComponent(false);
        }
    }, [userId, reloadComponent]); // Chạy effect mỗi khi userId hoặc reloadComponent thay đổi





    
    const formattotalPrice = (orderPrice) => {
        let formattedPrice = orderPrice.toString();
        let result = '';
        for (let i = formattedPrice.length - 1, j = 1; i >= 0; i--, j++) {
          result = formattedPrice[i] + result;
          if (j % 3 === 0 && i !== 0) {
            result = '.' + result;
          }
        }
        return result + ' VND';
      };

  



    return (
        <div className= "container">
           
           
           


<div style={{ display: 'flex', alignItems: 'center' , marginLeft: "0px"}}>
    <FaWallet style={{ marginRight: '5px' }} />
    <label style={{ marginRight: '10px' }}>Số dư:</label>
    <span style={{ fontWeight: 'bold' }}>{formattotalPrice(balance)}</span>
</div>
        


            
            
            <form onSubmit={handleSubmit}>

        


<div className="input-wrapper">
            <label htmlFor="artworkName">Nạp thêm:</label>

<div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
<input value={money} onChange={(e) => setMoney(e.target.value)}
className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
type="number"
placeholder="Ít nhất 10.000 vnd"
/>
</div>

</div>




<label htmlFor="">Phương thức thanh toán</label>
<div className="relative" style={{ width: '600px', marginBottom:'50px' }}>


              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >


                <img
                  className="w-14 object-contain"
                  src="https://kalite.vn/wp-content/uploads/2021/09/maqrkalite.jpg"
                  alt=""
                />



                
              <div className="ml-5 mt-2">
    <span className="font-semibold">Cổng thanh toán VNPAY</span><br></br>
    Đang hoàn thiện
</div></label>
</div>

<br></br>

<button
    type="submit"
    style={{
        width: '150px', // Thiết lập chiều rộng là 150px
        height: '45px', // Thiết lập chiều cao là 40px
        padding: '10px 20px', // Thiết lập padding là 10px trên/dưới và 20px trái/phải
        fontSize: '16px', // Kích thước chữ
        color: 'white', // Màu chữ
        borderRadius: '5px', // Bo góc
        border: 'none', // Không viền
        cursor: 'pointer', // Con trỏ chuột
        marginBottom: '50px',
        marginLeft: '200px',
    }}
>
    Xác nhận
</button>




                
                </form>
                </div>



        
       
       
       
      
    );
};

export default PaymentWallet;
