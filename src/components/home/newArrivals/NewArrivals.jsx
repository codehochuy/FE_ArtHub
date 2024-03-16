// // // eslint-disable-next-line no-unused-vars
// // import React, { useEffect, useState } from "react";
// // import Slider from "react-slick";
// // import Heading from "../ArtWork/Heading";
// // import Artwork from "../ArtWork/ArtWork";
// // // import {
// // //   newArrOne,
// // //   newArrTwo,
// // //   newArrThree,
// // //   newArrFour,
// // // } from "../../../assets/images/index";
// // import SampleNextArrow from "../SampleNextArrow";
// // import SamplePrevArrow from "../SamplePrevArrow";
// // import artworkService from "../../../api/artwork.service";
// // const NewArrivals = () => {
// //   const settings = {
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 4,
// //     slidesToScroll: 1,
// //     nextArrow: <SampleNextArrow />,
// //     prevArrow: <SamplePrevArrow />,
// //     responsive: [
// //       {
// //         breakpoint: 1025,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 1,
// //           infinite: true,
// //         },
// //       },
// //       {
// //         breakpoint: 769,
// //         settings: {
// //           slidesToShow: 2,
// //           slidesToScroll: 2,
// //           infinite: true,
// //         },
// //       },
// //       {
// //         breakpoint: 480,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //           infinite: true,
// //         },
// //       },
// //     ],
// //   };
// //   const [listArtWorks, setListArtWorks] = useState([]);
// //   // useEffect(() => {
// //   //   authService.getArtWork()
// //   //     .then((response) => {
// //   //       // console.log("Respone API", response);
// //   //       if (Array.isArray(response.data.data)) {
// //   //         setListArtWorks(response.data.data);
// //   //       } else {
// //   //         console.error("Data received is not an array:", response);
// //   //       }
// //   //     }).catch(error => {
// //   //       console.error("Error fetching data:", error);
// //   //     });
// //   //   }, []);
// //   useEffect(() => {
// //     artworkService.getArtWork()
// //       .then((response) => {
// //         console.log("API response:", response);
// //         // Kiểm tra dữ liệu nhận được từ API có phải là một mảng không
// //         if (Array.isArray(response.data)) {
// //           setListArtWorks(response.data);
// //         } else {
// //           console.error("Data received is not an array:", response);
// //         }
// //       }).catch(error => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);
  
// //   return (
// //     <div className="w-full pb-16">
// //       <Heading heading="New Arrivals" />
// //       <Slider {...settings}>
// //         {listArtWorks.map((artwork, index) => (
// //           <div className="px-2" key={index}>
// //           <Artwork
// //               _id={artwork.artworkId}
// //               artworkName={artwork.artworkName}
// //               artworkUrl={artwork.artworkUrl}
// //               postedAt={artwork.postedAt}
// //               likeCount={artwork.likeCount}
// //               commentCount={artwork.commentCount}
// //               // badge={true}
// //               // des={artwork.description}
// //             />
// //              </div>
// //         ))}
// //       </Slider>
// //     </div>
// //   );
// // };

// // export default NewArrivals;

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import Heading from "../ArtWork/Heading";
// import Artwork from "../ArtWork/ArtWork";
// import SampleNextArrow from "../SampleNextArrow";
// import SamplePrevArrow from "../SamplePrevArrow";
// import artworkService from "../../../api/artwork.service";
// import "./NewArrivals.css"; // Import CSS styles for NewArrivals component

// const NewArrivals = () => {
//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1025,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };

//   const [listArtWorks, setListArtWorks] = useState([]);

//   useEffect(() => {
//     artworkService.getArtWork()
//       .then((response) => {
//         console.log("API response:", response);
//         // Kiểm tra dữ liệu nhận được từ API có phải là một mảng không
//         if (Array.isArray(response.data)) {
//           setListArtWorks(response.data);
//         } else {
//           console.error("Data received is not an array:", response);
//         }
//       }).catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div className="new-arrivals-container">
//       <Heading heading="New Arrivals" />
//       <Slider {...settings}>
//         {listArtWorks.map((artwork, index) => (
//           <div className="new-arrivals-item" key={index}>
//             <Artwork
//               _id={artwork.artworkId}
//               artworkName={artwork.artworkName}
//               artworkUrl={artwork.artworkUrl}
//               postedAt={artwork.postedAt}
//               likeCount={artwork.likeCount}
//               commentCount={artwork.commentCount}
//             />
//             <div className="artwork-details">
//               <h3 className="artwork-name">{artwork.artworkName}</h3>
//               <p className="artwork-price">${artwork.price}</p>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default NewArrivals;
