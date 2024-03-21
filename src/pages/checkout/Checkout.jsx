import { useEffect, useState } from "react";
import userService from "../../api/user.service";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';



const Checkout = () => {



  const orderPrice = localStorage.getItem("totalPrice");
  const [carts, setCarts] = useState([]);
  const userId = localStorage.getItem("usersID");
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);




  
  
  
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
          // sendMail(orderId);
          setTimeout(() => {
            sendMail(orderId);
          }, 2000);
          createOrderDetail(orderId);
          setTimeout(() => {
            navigate('/checkoutdone');
          }, 1000);
          
         
          
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        toast.error("Có lỗi xảy ra", {
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
          // Chờ 2 giây trước khi chuyển hướng
          
         
        } 
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  const sendMail = (orderId) => {
    userService.sendMail(orderId)
    .then((response) => {
      console.log("Response from sendMail:", response); // Log response hoàn chỉnh
  
      if (response.data.status === "Create order detail successful") {
        // Xử lý khi request thành công
      } 
    })
    .catch((error) => {
      console.error("Error creating order:", error); // Log lỗi nếu có
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
    <>
    
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Trang thanh toán
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
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
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
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500"></span>
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
            marginLeft: '300px',
            marginRight: '300px',
          }}>
Tổng thanh toán: {formattotalPrice(orderPrice)}
        </p>
        <p className="text-l font-medium"  style={{
            marginLeft: '300px',
            marginRight: '300px',
          }}>

        </p>


        <div className="mt-8 text-lg font-medium">
    <p className="mx-auto" style={{ width: '800px' }}>
        Phương thức thanh toán
    </p>
</div>





          <form className="mt-5 grid gap-6">
<div className="relative">
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
                  src="https://png.pngtree.com/png-vector/20230330/ourmid/pngtree-ewallet-line-icon-vector-png-image_6675389.png"
                  alt=""
                />
              <div className="ml-5">
  <span className="mt-2 font-semibold">ArtWork Payment Wallet</span><br></br>
  Số dư trong ví: {formattotalPrice(balance)}
              </div>
              </label>
</div>
            <div className="relative">
              {/* <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              /> */}
            </div>

          </form>


          
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={() => createOrder(orderPrice)}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    
    </> 
   
  );
 
};

export default Checkout;