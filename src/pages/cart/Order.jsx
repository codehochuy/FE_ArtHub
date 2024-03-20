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
        // console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData2 = async () => {
  //     try {
  //       const response2 = await userService.viewOrderDetail(order.orderId);
  //       setOrders(response2.data);
  //       console.log("Response:", response2.data);
  //     } catch (error) {
  //       console.error("Error fetching artworks:", error);
  //     }
  //   };
  //   fetchData2();
  // }, []);
  // const viewOrderDetail = async (orderId) => {
  //   try {
  //     const response2 = await userService.viewOrderDetail(orderId);
  //     setOrderdetails(response2.data);
  //     console.log("Response:", response2.data);
  //   } catch (error) {
  //     console.error("Error fetching artworks:", error);
  //   }
  // };
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
    // Chuyển giá thành chuỗi và đảm bảo đó là số
    price = parseFloat(price).toFixed(0).toString();
  
    // Sử dụng regex để thêm dấu chấm sau mỗi 3 chữ số từ cuối cùng
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  }
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Đảm bảo các số có hai chữ số bằng cách thêm số 0 nếu cần
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Định dạng lại chuỗi ngày/tháng/năm giờ:phút
    const formattedDateTime = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  
    return formattedDateTime;
  };
  



  return (
    <div className="" style={{ marginLeft: '50px' , marginRight: '250px'}}>
    {/* <div style={{ marginLeft: '50px' , marginRight: '50px'}}> */}
      <section className="pt-9 pb-9">
        <Container className="pl-8 pr-8">
          <Row className="d-flex">
            <Col lg="11">
            {orders && orders.length > 0 ? (
              //  {orders ? (
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
                    //  <tr key={index}>
                    <React.Fragment key={index}>
      <tr>
        <td>{order.orderId}</td>
        <td>{formatDate(order.orderDate)}</td>
        {/* <td>{order.orderPrice}</td> */}
        <td>{formatPrice(order.orderPrice)}</td>
        <td>
          <button onClick={() => viewOrderDetail(order.orderId)}>Xem chi tiết</button>
        </td>
      </tr>
      {/* {orderdetails && orderdetails.length > 0 && orderdetails[0].orderId === order.orderId && ( */}
      {orderDetailsMap[order.orderId] && orderDetailsMap[order.orderId].length > 0 && orderDetailsMap[order.orderId][0].order.orderId === order.orderId && (
  <tr>
    <td colSpan="4">
      <div>
        <table className="table bordered">
          {/* <thead> */}
            {/* <tr> */}
              {/* <th>STT</th> */}
           
              {/* <th>Artwork Name</th>
              <th>Artwork Url</th>
              <th>Order Detail Price</th> */}
            {/* </tr> */}
          {/* </thead> */}
          <tbody>
            {orderDetailsMap[order.orderId].map((detail, index) => (
              <tr key={index}>
                {/* <td>{index + 1}</td> */}
                
                <td>{detail.artwork.artworkName}</td>
                {/* <td>{detail.artwork.artworkUrl}</td> */}
                <img 
          src={detail.artwork.artworkUrl}  
          // style={{ maxWidth: `${zoomLevel * 600}px`, cursor: 'pointer' }} 
          className="order-image"
          onClick={() => handleImageClick(detail.artwork.artworkUrl)}
          // onMouseEnter={() => setIsImageHovered(true)}
          // onMouseLeave={() => setIsImageHovered(false)}
        />
                {/* <td>{detail.orderDetailPrice}</td> */}
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
      {zoomedImage && (
      <div className="zoomed-image-overlay" onClick={handleZoomedImageOverlayClick}>
        <img src={zoomedImage} alt="Zoomed Image" className="zoomed-image" />
      </div>
    )}

    {/* </div> */}
    </div>
  );
  };
  export default Order;
  



