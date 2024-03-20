import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Badge from "./Badge";
import { toast, ToastContainer } from 'react-toastify'
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import userService from "../../../api/user.service";
import artworkService from "../../../api/artwork.service";
import "./ArtWork.css";
import { FaHeart } from 'react-icons/fa';
import Comment from "./Comment/Comment";
import { Link } from 'react-router-dom';


const ArtWorkPage = () => {
  const [artWorks, setArtWorks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("usersID");
  const [zoomedImage, setZoomedImage] = useState(null);

  const [liked, setLiked] = useState(false);


  const [comments, setComments] = useState([]);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const commentRef = useRef(null);
  const [showComment, setShowComment] = useState(false);

  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await artworkService.getArtWork();
        setArtWorks(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    fetchData();
  }, [isLoggedIn, navigate]);

  const addToCart = (artworkId) => {
    userService.addToCart(
      {
        userId: userId,
        artworkId: String(artworkId),
      }
    )
      .then((response) => {
        console.log(response.data)
        if (response.data.status === 'This artwork is already in the cart.') {
          toast.error("Tác phẩm đã có trong giỏ hàng", {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (response.data.status === 'Add to cart successfully') {
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
        else if (response.data.status === 'You can not buy your artwork') {
          toast.error("Bạn không thể mua hàng của chính mình", {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        else {
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

  const handleLikeClick = (artworkId) => {
    createLike(userId, artworkId);
    setLiked(!liked);
  };

  const createLike = (userId, artworkId) => {
    userService.createLike({ userId: userId, artworkId: artworkId })
      .then((response) => {
        console.log(response.data)
        if (response.data.status === 'Like successful') {
          setArtWorks(prevArtWorks =>
            prevArtWorks.map(artwork => {
              if (artwork.artworkId === artworkId) {
                return { ...artwork, likeCount: artwork.likeCount + 1 };
              }
              return artwork;
            })
          );
        }
        else if (response.data.status === 'UnLike successful') {
          setArtWorks(prevArtWorks =>
            prevArtWorks.map(artwork => {
              if (artwork.artworkId === artworkId && artwork.likeCount > 0) {
                return { ...artwork, likeCount: artwork.likeCount - 1 };
              }
              return artwork;
            })
          );
        }
      })
  };
  const toggleComment = () => {
    setShowComment(!showComment); // Đảo ngược giá trị của showComment khi click
  };
  const closeComment = () => {
    setShowComment(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        closeComment();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [commentRef]);





  return (
    <div>
      {artWorks.map(artwork => (
        <div
          key={artwork.artworkId}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginTop: '25px',
            marginLeft: '300px',
            marginRight: '300px',
            marginBottom: '25px',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}>
          <p className="artwork-name">{artwork.artworkName}</p>
          <p className="artwork-postat">{new Date(artwork.postedAt).toLocaleDateString()} by {artwork.user.accountName}</p>
          <img
            src={artwork.artworkUrl}
            className="artwork-image"
            onClick={() => handleImageClick(artwork.artworkUrl)}
          />
          <div className="artwork-info-container">
            <div className="artwork-like" onClick={() => handleLikeClick(artwork.artworkId)}>
              <button> <FaHeart className="heart-icon" /></button>
              {/* <button onClick={handleLikeClick}>
        <FaHeart className={`heart-icon ${liked ? 'heart-icon-active' : ''}`} />
      </button> */}
              <span className="like-count">{artwork.likeCount}</span>
            </div>

            <div className="artwork-comment">
   <button onClick={toggleComment}>{artwork.commentCount} Bình luận</button>
 
   {showComment && (
        <div className="comment-overlay" ref={commentRef}>
          <div className="comment-container">
            <button onClick={closeComment}>Đóng</button>
            <Comment />
          </div>
        </div>
      )}
    </div>




           
            {/* <div className="artwork-comment">
              <button onClick={() => getComment(artwork.artworkId)}>Xem bình luận</button>
              {selectedArtworkId === artwork.artworkId && comments.length > 0 && (
                <div className="comments-section">
                  <h3>Comments:</h3>
                  <ul>
                    {comments.map((comment) => (
                      <li key={comment.commentId}>
                        <p>{comment.commentText}</p>
                        <p>{comment.commentedAt}</p>
                        <p>{comment.user.accountName}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div> */}
{/* 
<div className="artwork-comment">
              <button onClick={() => getComment(artwork.artworkId)}>Xem bình luận</button>
              <Link to="/comment">Bình luận</Link>
              {comments.length > 0 && <Comment comments={comments} />}
            </div> */}



            <div className="artwork-price">{formatPrice(artwork.price)}</div>
          </div>
          <li
            onClick={() => addToCart(artwork.artworkId)}
            className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
          >
            Add to Cart
            <span>
              <FaShoppingCart />
            </span>
          </li>
        </div>
      ))}
      {zoomedImage && (
        <div className="zoomed-image-overlay" onClick={handleZoomedImageOverlayClick}>
          <img src={zoomedImage} alt="Zoomed Image" className="zoomed-image" />
        </div>
      )}
       {showComment && <Comment />}
    </div>
  );
};
export default ArtWorkPage;