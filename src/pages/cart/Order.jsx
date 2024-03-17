import { useEffect, useState } from "react";
import "./order.css";
import { Col, Container, Row } from "reactstrap";
import userService from "../../api/user.service";
import { format } from "date-fns";

const Order = () => {
  const [ordes, setOrders] = useState([]);
  const [load, setLoad] = useState(null);
  // useEffect(() => {
  //   authService.getOrder().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       console.log(data.data);
  //       setListCart(data.data);
  //     }
  //   });
  // }, [load]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getCart();
        setOrders(response.data);
        // console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
   

    };
    fetchData();
  }, []);





  // const Tr = ({ item }) => {
  //   // const dispatch = useDispatch();
  //   // const deleteProduct = () => {
  //   //   // dispatch(cartActions.deleteItem(item.id));
  //   //   authService.deleteCart(item.product._id).then((data) => {
  //   //     if (data.error) {
  //   //       console.log(data.error);
  //   //     } else {
  //   //       setLoad(data.data);
  //   //     }
  //   //   });
  //   // };
  //   return (
  //     <tr>
  //       <td>{item.orderby.email}</td>
  //       <td>{format(new Date(item.createdAt), "dd/MM/yyyy")}</td>
  //       <td>{item.products.length}</td>
  //       <td>${item.paymentIntent.amount}</td>
  //       <td>{item.paymentIntent.currency}</td>
  //       <td>{item.orderStatus}</td>
  //       <td>
  //         {item.products.map((product, index) => (
  //           <img
  //             key={index}
  //             src={product.image} // Assuming 'image' is the property containing the image URL
  //             alt={`Product ${index + 1}`}
  //             style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust dimensions as needed
  //           />
  //         ))}
  //       </td>
  //     </tr>
  //   );
  // };


//   return (
//     <div>
//       <section className="pt-9 pb-9">
//         <Container className="pl-8 pr-8">
//           <Row className="d-flex ">
//             <Col lg="12">
//               {listCart && listCart?.length > 0 ? (
//                 <table className="table bordered">
//                   <thead>
//                     <tr>
//                       <th>orderby</th>
//                       <th>createdAt</th>
//                       <th>count products</th>
//                       <th>Price</th>
//                       <th>currency</th>
//                       <th>orderStatus</th>
//                       <th>Image</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {listCart.map((item, index) => (
//                       <Tr item={item} key={index}></Tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <h2 className="fs-4 text-center">No item added to the order</h2>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// };
return (
  <div style={{ marginLeft: '50px' , marginRight: '50px'}}>
    <section className="pt-9 pb-9">
      <Container className="pl-8 pr-8">
        <Row className="d-flex">
          <Col lg="9">
            {ordes && ordes.length > 0 ? (
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
              <h2 className="fs-4 text-center" style={{marginLeft:"350px", marginBottom:"300px"}}>Không có gì trong giỏ hàng</h2>

            )}
          </Col>
          {ordes.length > 0 && (
             <Col lg="3">
            <div>
              <h6 className="d-flex align-items-center justify-content-between">
              Tổng: <span className="fs-4 fw-bold">{TotalPrice()}</span>
              </h6>
            </div>
            <p className="fs-5 mt-2">
            </p>
            
              <div style={{ marginBottom: "300px" }}>
                <div className="relative mt-6">
                  <div className="absolute inset-y-1 right-1 flex justify-end">
                    <button className="buy_btn mt-3 w-100">
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

export default Order;
