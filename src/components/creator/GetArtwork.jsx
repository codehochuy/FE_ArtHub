import './createArtwork.css'; 
import userService from "../../api/user.service";
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";



const GetArtwork = () => {
    const [artworks, setArtworks] = useState([]);
    const userId = localStorage.getItem("usersID");
    //handle open input update
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    //update artwork
    const [updatedArtworkName, setUpdatedArtworkName] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [reloadComponent, setReloadComponent] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await userService.getArtWork(userId);
            setArtworks(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching artworks:", error);
          }
        };
        fetchData();
        if (reloadComponent) {
          setReloadComponent(false);
      }
      }, [userId, reloadComponent]);




      const formatPrice = (price) => {
        let formattedPrice = price.toString();
        let result = '';artworks 
        for (let i = formattedPrice.length - 1, j = 1; i >= 0; i--, j++) {
          result = formattedPrice[i] + result;
          if (j % 3 === 0 && i !== 0) {
            result = '.' + result;
          }
        }
        return result;
      };
      const handleRemove = (artworkId) => {
        userService.deleteArtWork(artworkId)
            .then((response) => {
              if (response.data.status === 'Deleted ArtWork Successfully') {
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
    };
    //handle open input update
    const handleUpdate = (artworkId) => {
      const artwork = artworks.find(artwork => artwork.artworkId === artworkId);
      setSelectedArtwork(artwork);
  };
//handle update artwork
const handleUpdateArtwork = (artworkId) => {
  if (updatedPrice < 10000) {
    toast.error("Giá ít nhất là 10.000", {
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
  }else if (updatedArtworkName.trim() === ''){
    toast.error("Tên không hợp lệ", {
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
}
  
  
else{
  const updatedArtwork = {
    artworkName: updatedArtworkName || selectedArtwork.artworkName,
    price: updatedPrice || selectedArtwork.price
  };

  userService.updateArtWork(artworkId, updatedArtwork)
      .then(response => {
        console.log(response)
        if (response.data && response.data.status === 'Update ArtWork Successfully') {
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
    <div class= "container_manageArtwork">
        <section className="pt-9 pb-9">
        <Container className="pl-2 pr-10">

                <Row className="d-flex">
                    <Col lg="9">
                        {artworks && artworks.length > 0 ? (
                            <table className="table bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên tác phẩm</th>
                                        <th>Ảnh tác phẩm</th>
                                        <th>Lượt like</th>
                                        <th>Lượt comment</th>
                                        <th>Ngày tạo</th>
                                        <th>Giá (VND)</th>
                                        <th>Lượt bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artworks.map((artwork, index) => (
                                        <React.Fragment key={artwork.artworkId}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{artwork.artworkName}</td>
                                                <td><img src={artwork.artworkUrl} alt="" style={{ maxWidth: '250px' }} /></td>
                                                <td>{artwork.likeCount}</td>
                                                <td>{artwork.commentCount}</td>
                                                <td>{formatDate(artwork.postedAt)}</td>
                                                <td>{formatPrice(artwork.price)}</td>
                                                <td>
                                                    <button onClick={() => handleRemove(artwork.artworkId)}>Delete</button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleUpdate(artwork.artworkId)}>Update</button>
                                                </td>
                                            </tr>
{selectedArtwork && selectedArtwork.artworkId === artwork.artworkId && (
    <tr>
        <td colSpan="7">
            <p><strong>Tên tác phẩm: </strong> 
                <input
                    type="text"
                    value={updatedArtworkName || (selectedArtwork && selectedArtwork.artworkName)}
                    onChange={(e) => setUpdatedArtworkName(e.target.value)}
                />
            </p>
            <p><strong>Giá: </strong> 
                <input
                    type="number"
                    value={updatedPrice || (selectedArtwork && selectedArtwork.price)}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                />
            </p>
            <button onClick={() => handleUpdateArtwork(selectedArtwork.artworkId)} style={{ width: '100px', height: '30px', padding: '0' }}>Xác nhận</button>

        </td>
    </tr>
)}                                            
                                            
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h2 className="fs-4 text-center">Không có artwork nào</h2>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    </div>
);
                        };

export default GetArtwork;
