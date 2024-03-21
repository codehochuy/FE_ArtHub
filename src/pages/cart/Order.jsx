import { useEffect, useState } from "react";
import "./order.css";
import { Col, Container, Row } from "reactstrap";
import userService from "../../api/user.service";
import React from 'react';
import { format } from "date-fns";
const usersID = localStorage.getItem('usersID');


const Order = () => {
const [orders, setOrders] = useState([]);
const [orderdetails, setOrderdetails] = useState([]);
const [orderDetailsMap, setOrderDetailsMap] = useState({});
const [zoomedImage, setZoomedImage] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.viewOrder(usersID);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    fetchData();
  }, []);

  

  const viewOrderDetail = async (orderId) => {
    try {
      const response = await userService.viewOrderDetail(orderId);
      setOrderDetailsMap({ ...orderDetailsMap, [orderId]: response.data });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl);
  };
  const handleZoomedImageOverlayClick = () => {
    setZoomedImage(null);
  };
  function formatPrice(price) {
    price = parseFloat(price).toFixed(0).toString();
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  }
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedDateTime = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  
    return formattedDateTime;
  };
  



  return (
    <div className="" style={{ marginLeft: '50px' , marginRight: '250px'}}>
      <section className="pt-9 pb-9">
        <Container className="pl-8 pr-8">
          <Row className="d-flex">
            <Col lg="11">
            {orders && orders.length > 0 ? (
                <table className="table bordered">
                  <thead>
                    <tr>
                    <th>STT</th>
                      <th>Thời gian đặt hàng</th>
                      <th>Giá trị đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {orders.map((order, index) => (
                    <React.Fragment key={index}>
      <tr>
        <td>{order.orderId}</td>
        <td>{formatDate(order.orderDate)}</td>
        <td>{formatPrice(order.orderPrice)}</td>
        <td>
          <button onClick={() => viewOrderDetail(order.orderId)}>Xem chi tiết</button>
        </td>
      </tr>
      {orderDetailsMap[order.orderId] && orderDetailsMap[order.orderId].length > 0 && orderDetailsMap[order.orderId][0].order.orderId === order.orderId && (
  <tr>
    <td colSpan="4">
      <div>
        <table className="table bordered">
          <tbody>
            {orderDetailsMap[order.orderId].map((detail, index) => (
              <tr key={index}>
                <td>{detail.artwork.artworkName}</td>


                {/* <img 
          src={detail.artwork.artworkUrl}  
          className="order-image"
          onClick={() => handleImageClick(detail.artwork.artworkUrl)}
        /> */}

<img
  src={detail.artwork.artworkUrl}
  className="order-image"
  onClick={() => handleImageClick(detail.artwork.artworkUrl)}
  onContextMenu={(e) => e.preventDefault()} // Ngăn chặn click chuột phải trên ảnh
/>



                <td>{formatPrice(detail.orderDetailPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </td>
  </tr>
)}
    </React.Fragment>
                     ))} 
                  </tbody>
                </table>
              ) : (
                <h2 className="fs-4 text-center" style={{marginLeft:"250px", marginBottom:"150px", marginRight:"300px"}}>Chưa có đơn hàng</h2>
              )}
            </Col>
  </Row>
        </Container>
      </section>
      {/* {zoomedImage && (
      <div className="zoomed-image-overlay" onClick={handleZoomedImageOverlayClick}>
        <img src={zoomedImage} alt="Zoomed Image" className="zoomed-image" />
      </div>
    )} */}
    {zoomedImage && (
  <div className="zoomed-image-overlay" onClick={handleZoomedImageOverlayClick}>
    <img
      src={zoomedImage}
      alt="Zoomed Image"
      className="zoomed-image"
      onContextMenu={(e) => e.preventDefault()} // Ngăn chặn click chuột phải trên ảnh đã zoom
    />
  </div>
)}


    </div>
  );
  };
  export default Order;
  



