import { useEffect, useState } from "react";
import userService from "../../api/user.service";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { Link } from 'react-router-dom';




const CheckoutDone = () => {
  const orderPrice = localStorage.getItem("totalPrice");
  const [carts, setCarts] = useState([]);
  const userId = localStorage.getItem("usersID");
  


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getCart();
        setCarts(response.data);
      } 
      catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    fetchData();
  }, []);
  const formatPrice = (price) => {
    let formattedPrice = price.toString();
    let result = '';
    for (let i = formattedPrice.length - 1, j = 1; i >= 0; i--, j++) {
      result = formattedPrice[i] + result;
      if (j % 3 === 0 && i !== 0) {
        result = '.' + result;
      }
    }
    return result;
  };


  
  const createOrder = () => {
    userService
      .createOrder({
        orderPrice: orderPrice,
        audience: userId
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Your balance is not enough") {
          toast.error("Tài khoản không đủ số dư", {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else{
          
          const orderId = response.data.order.orderId;
          createOrderDetail(orderId);
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };
  
  const createOrderDetail = (orderId) => {
    userService
      .createOrderDetail({
        orderId: orderId,
        audience: userId
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.status === "Create order detail successful") {
          toast.success("Thành công", {
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
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };
  


      const formattotalPrice = (orderPrice) => {
        let formattedPrice = orderPrice.toString();
        let result = '';
        for (let i = formattedPrice.length - 1, j = 1; i >= 0; i--, j++) {
          result = formattedPrice[i] + result;
          if (j % 3 === 0 && i !== 0) {
            result = '.' + result;
          }
        }
        return result + ' VNĐ';
      };



  return (
    <>
    
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          {/* Trang thanh toán */}
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Giỏ hàng</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Thanh toán</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-900">Hoàn thành</span>
              </li>
            </ul>
          </div>
        </div>
      </div>


          <div className="grid sm:px-10 lg:grid-cols-1 lg:px-20 xl:px-32" style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginTop: '25px',
            marginLeft: '300px',
            marginRight: '300px',
            marginBottom: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}>
        

        <div className="mt-10 bg-gray-40 px-0 pt-8 lg:mt-0">


        <p className="text-xl font-medium"  style={{
            marginLeft: '260px',
            marginRight: '250px',
          }}>
Đặt hàng thành công, hãy kiểm tra mail!
        </p>
        
        <div className="flex" style={{ marginLeft: '280px' }}>
  <Link to="/order" className="block text-center mt-4 bg-black bg-opacity-70 hover:bg-opacity-80 text-white font py-2 px-4 rounded">
    Xem đơn hàng
  </Link>
  <Link to="/home" className="block text-center mt-4 ml-4 bg-black bg-opacity-70 hover:bg-opacity-80 text-white font py-2 px-4 rounded">
    Về trang chính
  </Link>
</div>







        
        
        </div>
      </div>
    
    </> 
  );
};

export default CheckoutDone;









           