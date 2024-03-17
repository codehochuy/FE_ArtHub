// // eslint-disable-next-line no-unused-vars
// import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
// import Image from "../../designLayouts/Image";
import Badge from "./Badge";


// import { useDispatch } from "react-redux";

import { addToCart } from "../../../redux/slice/productSlice";
import { cartActions } from "../../../redux/slice/cartSlice";
import { toast, ToastContainer } from 'react-toastify'
// import authService from "../../../api/user.service";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../api/user.service";
import artworkService from "../../../api/artwork.service";
// import Cart from "../pages/cart/Cart";
import "./ArtWork.css"; // Import CSS styles for NewArrivals component
// import NewArrivals from "../newArrivals/NewArrivals";
// import NewArrivals from "../newArrivals/NewArrivals";




// const Product = (props) => {
//   console.log(props);
//   const dispatch = useDispatch();
//   const id = props.productName;
//   const idString = (id) => {
//     return String(id).toLowerCase().split(" ").join("");
//   };
//   const rootId = idString(id);

//   const navigate = useNavigate();

//   const handleProductDetails = () => {
//     navigate(`/product/${rootId}`, {
//       state: {
//         item: productItem,
//       },
//     });
//   };
const ArtWorkPage = (props) => {
  // const { artworkId, artworkName, img, price, color, badge } = props;
  // console.log(props);
  const artworkItem = props;
  const id = props.artworkName;
    const idString = (id) => {
    return String(id).toLowerCase().split(" ").join("");
  };
    const rootId = idString(id);
  const [artWorks, setArtWorks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("usersID");
  // const [userId, setUserId] = useState(localStorage.getItem("usersID"));

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
    console.log("Adding artwork to cart. Artwork ID:", artworkId);
    // console.log("Adding artwork to cart. userId:", userId);
    userService.addToCart(
       { 
          // productName: props.productName,
          // price: props.price,
          quantity: 1,
          userId: userId,
          // discount: props.discount,
          artworkId: String(artworkId),
          // console.log(artworkId);
          
  
         }  
      )
      
      .then((data) => {
        console.log(data.data);
        if (data.error) {
          console.log(data.error);
        } else {
          toast.success("Artwork added successfully", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
  
          // Lấy danh sách sản phẩm từ local storage
          const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  
          // Thêm sản phẩm mới vào danh sách
          const updatedCart = [...existingCart, props];
  
          // Chuyển đổi danh sách sản phẩm thành chuỗi JSON và lưu vào local storage
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      });
  };



    return (
    <div>
    <h1>Artwork List</h1>
    {artWorks.map(artwork => (
    
      <div 
      key={artwork.artworkId} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
        <h2>{artwork.artworkName}</h2>
        <img src={atob(artwork.artworkUrl)} alt={artwork.artworkName} style={{ maxWidth: '200px' }} />
        <p>Posted At: {new Date(artwork.postedAt).toLocaleDateString()}</p>
        <p>Price: {artwork.price}</p>
        <p>Likes: {artwork.likeCount}</p>
        <p>Comments: {artwork.commentCount}</p>
         <li
              // onClick={() => addToCart()}
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
    </div>
);
};
export default ArtWorkPage;







  

//   const addToWishlist = () => {
//     authService
//       .addToWishlist({
//         prodId: props._id,
//       })
//       .then((data) => {
//         if (data.error) {
//           console.log(data.error);
//         } else {
//           toast.success("Wishlist added successfully", {
//             // position: "bottom-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });
//         }
//       });
//   };


//   return (
//     <div className="w-full relative group">
//       <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
//         <div>
//           <Image className="w-full h-full" imgSrc={props.img} />
//         </div>
//         <div className="absolute top-6 left-8">
//           {props.badge && <Badge text="New" />}
//         </div>
//         <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
//           <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
//             <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
//               Compare
//               <span>
//                 <GiReturnArrow />
//               </span>
//             </li>
//             <li
//               onClick={() => addToCart()}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               Add to Cart
//               <span>
//                 <FaShoppingCart />
//               </span>
//             </li>
//             <li
//               onClick={handleProductDetails}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               View Details
//               <span className="text-lg">
//                 <MdOutlineLabelImportant />
//               </span>
//             </li>
//             <li
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//               onClick={() => addToWishlist()}
//             >
//               Add to Wish List
//               <span>
//                 <BsSuitHeartFill />
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
//         <div className="flex items-center justify-between font-titleFont">
//           <h2 className="text-lg text-primeColor font-bold">
//             {props.productName}
//           </h2>
//           <p className="text-[#767676] text-[14px]">${props.price}</p>
//         </div>
//         <div>
//           <p className="text-[#767676] text-[14px]">{props.color}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;




    



    // <div>
    //   <h1>Art Works</h1>
    //   <ul>
    //     {/* {artWorks.map((artWork) => (
    //       <li key={artWork.artworkId}>
    //         <div>Artwork Name: {artWork.artworkName}</div>
    //         <div>Artwork URL: {artWork.artworkUrl}</div>
    //         <div>Posted At: {artWork.postedAt}</div>
    //         <div>Price: {artWork.price}</div>
    //         <div>Like Count: {artWork.likeCount}</div>
    //         <div>Comment Count: {artWork.commentCount}</div>
    //       </li>
    //     ))}
    //      */}
    //       <div>
    //     {artworks.map(artwork => (
    //       <NewArrivals key={artwork.artworkId} artwork={artwork} />
    //     ))}
    //   </div>
    //   </ul>
    // </div>
    


  //   <div className="new-artworks-container">
  //   <Heading heading="ArtWork" />
  //   <Slider {...settings}>
  //     {listArtWorks.map((artwork, index) => (
  //       <div className="new-artworks-item" key={index}>
  //         <Artwork
  //           _id={artwork.artworkId}
  //           artworkName={artwork.artworkName}
  //           artworkUrl={artwork.artworkUrl}
  //           postedAt={artwork.postedAt}
  //           likeCount={artwork.likeCount}
  //           commentCount={artwork.commentCount}
  //         />
  //         <div className="artwork-details">
  //           <h3 className="artwork-name">{artwork.artworkName}</h3>
  //           <p className="artwork-price">${artwork.price}</p>
  //         </div>
  //       </div>
  //     ))}
  //   </Slider>
  // </div>

