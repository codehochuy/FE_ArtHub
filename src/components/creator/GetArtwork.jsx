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
      }, []);
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
              // console.log(response);
              if (response.data && response.data.status === 'Deleted ArtWork Successfully') {
                toast.success("Xoá thành công", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                window.location.reload();
              } else {
                toast.error("Xoá thất bại", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                window.location.reload();
              }
            })
            .catch((error) => {
                console.error("Error deleting cart item:", error);
            });
    };
    //handle open input update
    const handleUpdate = (artworkId) => {
      const artwork = artworks.find(artwork => artwork.artworkId === artworkId);
      setSelectedArtwork(artwork);
  };
//handle update artwork
const handleUpdateArtwork = (artworkId) => {
  const updatedArtwork = {
    artworkName: updatedArtworkName || selectedArtwork.artworkName,
    price: updatedPrice || selectedArtwork.price
  };

  userService.updateArtWork(artworkId, updatedArtwork)
      .then(response => {
        console.log(response)
        if (response.data && response.data.status === 'Update ArtWork Successfully') {
          toast.success("Cập nhật thành công", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // window.location.reload();
        } else {
          toast.error("Cập nhật thất bại", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // window.location.reload();
        }
      })
      .catch((error) => {
          console.error("Error deleting cart item:", error);
      });
};
  return (
    <div className="create-artwork-container">
        <section className="pt-9 pb-9">
            <Container className="pl-8 pr-8">
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
                                        <th>Giá</th>
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
                                                <td>{artwork.postedAt}</td>
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
            <button onClick={() => handleUpdateArtwork(selectedArtwork.artworkId)}>Xác nhận</button>
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
