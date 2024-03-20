
import React, { useEffect, useState } from "react";
import "./cart.css";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../api/user.service";
import { useNavigate } from "react-router-dom";
// const [load, setLoad] = useState(null);

const Cart = () => {
  const [carts, setCarts] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);


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


    const formattotalPrice = (totalPrice) => {
      let formattedPrice = totalPrice.toString();
      let result = '';
      for (let i = formattedPrice.length - 1, j = 1; i >= 0; i--, j++) {
        result = formattedPrice[i] + result;
        if (j % 3 === 0 && i !== 0) {
          result = '.' + result;
        }
      }
      return result + ' VNĐ';
    };
    const TotalPrice = () => {
      let totalPrice = 0;
      carts.forEach(cart => {
        totalPrice += cart.artwork.price;
      });
      return formattotalPrice(totalPrice);
    };
    const returnTotalPrice = () => {
      let totalPrice = 0;
      carts.forEach(cart => {
        totalPrice += cart.artwork.price;
      });
      return totalPrice;
    };
    
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
    const formatDate = (postedAt) => {
      // Tạo đối tượng Date từ chuỗi ngày đầu vào
      const date = new Date(postedAt);
      // Lấy các thành phần ngày, tháng, năm từ đối tượng Date
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // Format lại thành chuỗi ngày/tháng/năm
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };
    const handleCheckout = () => {
      // Lưu giá trị TotalPrice vào localStorage
      localStorage.setItem("totalPrice", returnTotalPrice());
     
    };
    const handleRemoveFromCart = (cartId) => {
      userService.remove_from_cart(cartId)
          .then((response) => {
            if (response.data.status === 'Item removed from cart successfully') {
              toast.success("Thành công", {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setTimeout(() => {
                window.location.reload();
            }, 1000);
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
  };


 



    
  return (
    <div style={{ marginLeft: '0px' , marginRight: '250px'}}>
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
                         <td>
                         <button onClick={() => handleRemoveFromCart(cart.cartId)}>Delete</button>
</td>
                      </tr>
                    ))}
                  </tbody>
             
                </table>
              ) : (
                <h2 className="fs-4 text-center" style={{marginLeft:"250px", marginBottom:"300px"}}>Không có gì trong giỏ hàng</h2>

              )}
            </Col>
            {carts.length > 0 && (
               <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                Tổng tiền hàng: <span className="fs-4 fw-bold">{TotalPrice()}</span>
                </h6>
              </div>
              <p className="fs-5 mt-2">
              </p>
              
                <div style={{ marginBottom: "300px" }}>
                  <div className="relative mt-6">
                    <div className="absolute inset-y-1 right-1 flex justify-end">
                    <button className="buy_btn mt-3 w-100" onClick={handleCheckout}>
              <Link to="/checkout">Thanh toán</Link>
            </button>
                      <button className="buy_btn mt-3 w-100">
                        <Link to="/home">Trở về</Link>
                      </button>
                    </div>
                  </div>
                </div>
             
            </Col>
             )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Cart;



  // const loadCartFromLocalStorage = () => {
  //   const storedCart = JSON.parse(localStorage.getItem("cart"));
  //   // console.log("Stored cart data:", storedCart);
  //   if (Array.isArray(storedCart) && storedCart.length > 0) {
  //     const artworks = storedCart.map(item => ({
  //       artwork: {
  //           artworkUrl: item.artworkUrl,
  //           artworkName: item.artworkName,
  //           price: item.price,
  //           artworkId: item.artworkId,
  //       },
  //       quantity: 1,
      
  //     }));
  //     const total = artworks.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  //     setListCart(artworks);
  //     setCartTotal(total);
  //   } else {
  //     console.log("Invalid cart data found in local storage");
  //   }
  // };


//   const listVouchers = () => {
//     authServices
//       .getVoucher()
//       .then((data) => {
//         if (data.error) {
//           console.log(data.error);
//         } else {
//           setVouchers(data.data.payload);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching vouchers:", error);
//       });
//   };

  // const updateCart = (updatedCart) => {
  //   authService.updateCart(updatedCart).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setListCart(data.data);
  //       setCartTotal(data.data?.cartTotal);
  //       localStorage.setItem("cart", JSON.stringify(data.data));
  //     }
  //   });
  // };


  // handle delelete product API request
  //   const Tr = ({ item }) => {
  //     const deleteProduct = () => {
  //       authService.deleteCart(item.product._id).then((data) => {
  //         if (data.error) {
  //           console.log(data.error);
  //         } else {
  //           setLoad(data.data);
  //         }
  //       });
  // };

//   const deleteProductFromLocalStorage = (productId) => {
//     const storedCart = JSON.parse(localStorage.getItem("cart"));
//     if (Array.isArray(storedCart) && storedCart.length > 0 && productId) {
//       // Lọc ra các mục khác mục cần xóa
//       const updatedCart = storedCart.filter(item => item.productId !== productId);
//       // Xóa luôn trường price khỏi mỗi mục trong mảng đã lọc
//       const updatedCartWithoutPrice = updatedCart.map(({price, ...rest}) => rest);
//       // Tính toán lại tổng tiền
//       const total = updatedCartWithoutPrice.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
//       // Cập nhật state và lưu vào local storage
//       setCartTotal(total);
//       setListCart(updatedCartWithoutPrice);
//       localStorage.setItem("cart", JSON.stringify(updatedCartWithoutPrice));
//     } else {
//       console.log("Dữ liệu giỏ hàng không hợp lệ hoặc productId không tồn tại");
//     }
//   };
  
  // const Tr = ({ item }) => {
  //   // const deleteProduct = () => {
  //   //   if (item.productId) {
  //   //     deleteProductFromLocalStorage(item.productId);
  //   //   } else {
  //   //     console.log("ProductID is undefined");
  //   //   }
  //   // };
  

  //   const increaseQuantity = (productId) => {
  //     const updatedCart = listCart.map((cartItem) => {
  //       if (cartItem.artwork.artworkId === artworkId) {
  //         return { ...cartItem, count: cartItem.count + 1 };
  //       }
  //       return cartItem;
  //     });
  //     updateCart(updatedCart);
  //   };

  //   const decreaseQuantity = (productId) => {
  //     const updatedCart = listCart.map((cartItem) => {
  //       if (cartItem.artwork.artworkId === artworkId && cartItem.count > 1) {
  //         return { ...cartItem, count: cartItem.count - 1 };
  //       }
  //       return cartItem;
  //     });
  //     updateCart(updatedCart);
  //   };

  //   return (
  //     <tr>
  //       <td>
  //         {/* <img src={item.product.img} alt="" /> */}
  //         {item.artwork && item.artwork.artworkUrl && <img src={item.artwork.artworkUrl} alt="" />}
  //       </td>
  //       {/* <td>{item.product.productName}</td> */}
  //       <td>{item.artwork && item.artwork.artworkName}</td>
  //       <td>{item.artwork.price}</td>
  //       <td>
  //         {/* <button
  //           onClick={() => decreaseQuantity(item.product._id)}
  //           className="small-btn text-white font-bold py-1 px-2 rounded-md text-sm"
  //         >
  //           -
  //         </button> */}
  //         {item.quantity}
  //         {/* <button
  //           onClick={() => increaseQuantity(item.product._id)}
  //           className="small-btn text-white font-bold py-1 px-2 rounded-md text-sm"
  //         >
  //           +
  //         </button> */}
  //       </td>
  //       {/* <td>
  //         <button onClick={deleteArtwork}>Delete</button>
  //       </td> */}
  //     </tr>
  //   );
  // };

  

//   const addVoucher = () => {
//     if (!searchQuery) {
//       toast.error("Please enter a voucher code", { theme: "dark" });
//     } else if (usedVouchers.includes(searchQuery)) {
//       toast.error("Voucher has already been used", { theme: "dark" });
//     } else if (usedVouchers.length > 0) {
//       toast.error("Only one voucher can be applied at a time", { theme: "dark" });
//     } else {
//       authService
//         .applyCoupon({
//           coupon: searchQuery,
//         })
//         .then((data) => {
//           if (data.error) {
//             console.log(data.error);
//             toast.error("Error applying voucher", { theme: "dark" });
//           } else if (!data.data) {
//             toast.error("Invalid voucher code", { theme: "dark" });
//           } else {
//             setCartTotal(data.data);
//             setUsedVouchers([...usedVouchers, searchQuery]);
//             toast.success("Voucher applied successfully", { theme: "dark" });
//           }
//         });
//     }
//   };

//   return (
//     <div>
//       <section className="pt-9 pb-9">
//         <Container className="pl-8 pr-8">
//           <Row className="d-flex ">
//             <Col lg="9">
//               {listCart?.length > 0 ? (
//                 <table className="table bordered">
//                   <thead>
//                     <tr>
//                       <th>Image</th>
//                       <th>Name</th>
//                       <th>Price</th>
//                       <th>Quantity</th>
//                       <th>Delete</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {listCart.map((item, index) => (
//                       <Tr item={item} key={index}></Tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <h2 className="fs-4 text-center">No item added to the cart</h2>
//               )}
//             </Col>

//             <Col lg="3">
//               <div>
//                 <h6 className="d-flex align-items-center justify-content-between">
//                   Subtotal: <span className="fs-4 fw-bold">${cartTotal}</span>
//                 </h6>
//               </div>
//               <p className="fs-5 mt-2">
//                 Taxes and shipping will calculate in checkout
//               </p>
//               <div>
//                 <div className="relative mt-6">
//                   {/* <input
//                     type="text"
//                     placeholder="add coupon"
//                     className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-2 pl-4 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
//                     onChange={handleSearch}
//                     value={searchQuery}
//                   /> */}
//                   <div className="absolute inset-y-1 right-1 flex justify-end">
//                     {/* <button
//                       onClick={() => addVoucher()}
//                       type="submit"
//                       aria-label="Submit"
//                       style={{ marginTop: "0px" }}
//                       className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
//                     > */}
//                       {/* <svg
//                         viewBox="0 0 16 6"
//                         aria-hidden="true"
//                         className="w-4"
//                       >
//                         <path
//                           fill="currentColor"
//                           fillRule="evenodd"
//                           clipRule="evenodd"
//                           d="M16 3 10 .5v2H0v1h10v2L16 3Z"
//                         />
//                       </svg>
//                     </button> */}
//                   </div>
//                 </div>
//                 {/* {vouchers && vouchers.length > 0 && (
//                   <div className="mt-6">
//                     <h6 className="d-flex align-items-center justify-content-between">
//                       Available Vouchers:
//                     </h6>
//                     {vouchers.map((voucher, index) => (
//                       <div key={index} className="mb-2">
//                         <li key={index}>
//                           {voucher.voucherCode} - {voucher.discountPercentage}%
//                           off
//                         </li>
//                       </div>
//                     ))}
//                   </div>
//                 )} */}
//                 <button className="buy_btn mt-3 w-100">
//                   <Link to="/checkout">Check out</Link>
//                 </button>
//                 <button className="buy_btn mt-3 w-100">
//                   <Link to="/home">Continue Shopping</Link>
//                 </button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// };

// export default Cart;

