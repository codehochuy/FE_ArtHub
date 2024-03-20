import { useEffect, useState } from "react";
import Image from "../../components/designLayouts/Image";
import userService from "../../api/user.service";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
const Checkout = () => {



  // const [listCart, setListCart] = useState([]);
  // const [load, setLoad] = useState(null);
  const orderPrice = localStorage.getItem("totalPrice");
  const [carts, setCarts] = useState([]);
  const userId = localStorage.getItem("usersID");

  
  // useEffect(() => {
  //   userService.getCart().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setListCart(data.data);
  //     }
  //   });
  // }, [load]);

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






    
        {/* <div className="px-4 pt-8">
          <p className="text-xl font-medium">Chưa biết ghi gì ở đây</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {listCart?.products &&
              listCart?.products.map((item, index) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={index}
                >
                  <Image
                    imgSrc={item.product.images}
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.product.title}</span>
                    <span className="float-right text-gray-400">
                      count: {item.count}
                    </span>
                    <p className="text-lg font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div> */}
        
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <div style={{ marginLeft: '50px' , marginRight: '50px'}}>
      <section className="pt-9 pb-9">
        <Container className="pl-8 pr-8">
          <Row className="d-flex">
            <Col lg="9">
              {carts && carts.length > 0 ? (
                <table className="table bordered">
                  <thead>
                    <tr>
                    <th>STT</th>
                      <th>Tên tác phẩm</th>
                      <th>Ảnh tác phẩm</th>
                      {/* <th>Ngày tạo</th> */}
                      <th>Giá</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((cart, index) => (
                      <tr key={cart.cartId}>
                         <td>{index +1}</td>
                         <td>{cart.artwork.artworkName}</td>
                         <img src={cart.artwork.artworkUrl} alt="" style={{ maxWidth: '250px' }} />
                         {/* <td>{formatDate(cart.artwork.postedAt)}</td> */}
                         <td>{formatPrice(cart.artwork.price)}</td>
                         {/* <td>
                         <button onClick={() => handleRemoveFromCart(cart.cartId)}>Delete</button>
</td> */}
                      </tr>
                    ))}
                  </tbody>
             
                </table>
              ) : (
                <h2 className="fs-4 text-center" style={{marginLeft:"350px", marginBottom:"300px"}}>Không có gì trong giỏ hàng</h2>

              )}
            </Col>
            {carts.length > 0 && (
               <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                {/* Tổng tiền hàng: <span className="fs-4 fw-bold">{TotalPrice()}</span> */}
                </h6>
              </div>
              <p className="fs-5 mt-2">
              </p>
              
                
             
            </Col>
             )}
          </Row>
        </Container>
      </section>
    </div>
  );
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">
Tổng thanh toán: {formattotalPrice(orderPrice)}
</p>
          <p className="mt-8 text-lg font-medium">Phương thức thanh toán</p>
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
                  src="https://kalite.vn/wp-content/uploads/2021/09/maqrkalite.jpg"
                  alt=""
                />
              <div className="ml-5">
  <span className="mt-2 font-semibold">VNPAY</span>

</div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
           
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











 {/*  <p className="text-xl font-medium">
            Địa chỉ giao hàng
          </p>
           <p className="mt-8 text-lg font-medium">Payment Methods</p>
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
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">VNPAY Wallet</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    Cash on delivery (COD)
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={() => createOrder(orderPrice)}
          >
            Đặt hàng
          </button> */}



           