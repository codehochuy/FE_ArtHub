// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUserCircle, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
// import { paginationItems } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../../redux/slice/auth";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);


  
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogOut = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
        <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          ></div>



          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              value={searchQuery}
              placeholder="Search your Artworks here"
            />
            <FaSearch className="w-5 h-5 cursor-pointer" />
           

            
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div
              onClick={() => setShowUser(!showUser)}
              className="flex"
              style={{ alignItems: "center" }}
            >
              {/* <span className="pr-2">
                {isLogin && isLogin.firstname + " " + isLogin.lastname}
              </span> */}
              <FaUserCircle />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                {/* {isLogin ? ( */}
                
                  <>
                    <Link to="/editProfile">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    <Link to="/wishlist">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Wishlist
                      </li>
                    </Link>
                    <Link to="/order">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Order
                      </li>
                    </Link>
                    <li
                      className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer"
                      onClick={() => handleLogOut()}
                    >
                      Logout
                    </li>
                  </>
                
            
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
              
              </div>
            </Link>

            <Link to="/manageartwork">
              <div className="relative">
              <GiHamburgerMenu />
              </div>
            </Link>

          </div>
          

        </Flex>
        
      </div>
      
    </div>
    
  );
};

export default HeaderBottom;
