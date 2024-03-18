// import { useEffect, useState } from "react";
// import Title from "../Title";
// import SearchInput from "../SearchInput";
// import { Link } from "react-router-dom";
// import PrimaryBtn from "../PrimaryBtn";
// import Table from "../Table";
// // import useDebounce from "../../../custom-hooks/useDebounce";
// import ShowDetail from "../ShowDetail";
// import Pagination from "../Pagination";
// import EditButton from "../EditButton";
// import DeleteBtn from "../DeleteBtn";
// import ArtWorkService from "../../../api/artwork.service";

// import { toast } from "react-toastify";
// function ListArtWorks() {
//   // const listProducts = {
//   //   data: [{ id: 1, productName: "Snack", description: "Big and nice" }],
//   //   total: 5,
//   // };
//   const [searchParam, setSearchParam] = useState();
//   const [listArtWorks, setListArtWorks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [load, setLoad] = useState(null);
//   // const debouncedSearchValue = useDebounce(searchParam, 500);

//   const fetArtwork = async () => {
//     // ArtWorkService.getArtWork().then((data) => {
//     //   console.log(data);
//     //   if (data.error) {
//     //     console.log(data.error);
//     //   } else {
//     //     setListArtWorks(data.data.data);
//     //   }
//     // });
//     try {
//       const response = await ArtWorkService.getArtWork();
//       setListArtWorks(response.data);
//     } catch (error) {
//       console.error("Error while fetching artwork:", error);
//     }
//   }
//   useEffect(() => {
//     fetArtwork();
//   }, [load]);
//   // const deleteProductFunc = (id) => {
//   //   setLoad(true);
//   //   AuthService.deleteProduct(id).then((data) => {
//   //     if (data.error) {
//   //       console.log(data.error);
//   //     } else {
//   //       toast.success("Delete product successfully", {
//   //         // position: "bottom-right",
//   //         autoClose: 3000,
//   //         hideProgressBar: false,
//   //         closeOnClick: true,
//   //         pauseOnHover: false,
//   //         draggable: true,
//   //         progress: undefined,
//   //         theme: "dark",
//   //       });
//   //       setLoad(data.data.data);
//   //     }
//   //   });
//   //   setLoad(false);
//   // };

//   const columns = [
//     {
//       Header: " ",
//       columns: [
//         {
//           Header: "artworkName",
//           accessor: (data) => <p>{data?.artworkName}</p>,
//         },
//         {
//           Header: "artworkUrl",
//           accessor: (data) => <p>{data?.artworkUrl}</p>,
//         },
//         {
//           Header: "postedAt",
//           accessor: (data) => <p>{data?.postedAt}</p>,
//         },
//         {
//           Header: "price",
//           accessor: (data) => <p>{data?.price}</p>,
//         },
//         {
//           Header: "likeCount",
//           accessor: (data) => <p>{data?.likeCount}</p>,
//         },
//         {
//           Header: "commentCount",
//           accessor: (data) => <p>{data?.commentCount}</p>,
//         },
//         {
//           Header: " ",
//           accessor: (data) => {
//             return (
//               <div className="flex justify-end gap-4">
//                 {/* <Link className="" to={`/admin/products/${data?.productId}/edit`}>
//                   <EditButton />
//                 </Link> */}
//                 {/* <DeleteBtn
//                   id={data?.artworkId}
//                   deleteFunction={deleteProductFunc}
//                   queryKey={"getListOfficialMember"}
//                 /> */}
//               </div>
//             );
//           },
//         },
//       ],
//     },
//   ];

//   return (
//     <div>
//       <Title >List ArtWorks</Title>
//       <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
//         {/* <SearchInput
//           placeholder="Search by name"
//           onChange={(e) => setSearchParam(e.target.value)}
//           value={searchParam || ""}
//         /> */}
//         {/* <Link to={`/admin/artworks/create`}>
//           <PrimaryBtn className="min-w-[180px]">+ Add Product</PrimaryBtn>
//         </Link> */}
//       </div>
//       <div className="bg-white table-style block-border">
//         <Table
//           pageSizePagination={limit}
//           columns={columns}
//           data={listArtWorks}
//         />
//       </div>

//       <Pagination
//         pageSize={limit}
//         setPageSize={setLimit}
//         currentPage={page}
//         setCurrentPage={setPage}
//         totalItems={listArtWorks.length}
//       />
//     </div>
//   );
// }

// export default ListArtWorks;
