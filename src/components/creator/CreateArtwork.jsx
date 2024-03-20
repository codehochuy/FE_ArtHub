import React, { useState } from 'react';
import userService from '../../api/user.service';
import './createArtwork.css'; 
import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";

const CreateArtWork = () => {
    const [artworkName, setArtworkName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [base64String, setBase64String] = useState('');
    const userId = localStorage.getItem("usersID");


    const handleSubmit = (e) => {
        e.preventDefault();
        const requestData = {
            artworkName: artworkName,
            price: price,
            creator: userId,
            url: base64String
        };
        createArtWork(requestData);
    };

    const createArtWork = (requestData) => {
        userService.createArtWork(requestData)
        .then((response) => {
            if (response.data.status === 'Create Artwork Successfully') {
              toast.success("Thành công", {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64String(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
     
    

      <div className= "container">
            <form onSubmit={handleSubmit}>



 <div className="input-wrapper">
            <label htmlFor="artworkName">Tên tác phẩm</label>

<div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
<input value={artworkName} onChange={(e) => setArtworkName(e.target.value)} 
className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
type="text"
placeholder="Nhập tên tác phẩm"
/>

</div>
</div>


               

                {/* <div>
                    <label>Giá</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)}
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="number"
              placeholder="Giá"
            />
                </div> */}


<div className="input-wrapper">
            <label htmlFor="artworkName">Giá</label>

<div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
<input value={price} onChange={(e) => setPrice(e.target.value)}
className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
type="text"
placeholder="Ít nhất 10.000 vnd"
/>

</div>
</div>







                {/* <div>
                    <label>Ảnh tác phẩm</label>
                    <input type="file" onChange={handleFileChange} />
                </div> */}


    <label htmlFor="artworkName">Chọn file</label>
    <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
        <input 
            onChange={handleFileChange}
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="file"
        />
   
</div>





                <button type="submit">Submit</button>





            </form>
        </div>
    );
};

export default CreateArtWork;



// return (
       
//     <div className="create-artwork-container">
        
        
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Tên tác phẩm</label>
//                 <input type="text" value={artworkName} onChange={(e) => setArtworkName(e.target.value)} />
//                 <input
//           className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
//           type="text"
//           placeholder="Search your Artworks here"
//         />
//             </div>
//             <div>
//                 <label>Giá</label>
//                 <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
//             </div>
//             <div>
//                 <label>Ảnh tác phẩm</label>
//                 <input type="file" onChange={handleFileChange} />
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     </div>
// );