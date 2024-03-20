import './createArtwork.css'; 
import userService from "../../api/user.service";
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [reloadComponent, setReloadComponent] = useState(false);
 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await userService.getUser();
            setUsers(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchData();
        if (reloadComponent) {
            setReloadComponent(false);
        }
      }, [users]);


      const handleBanUser = (user) => {
        userService.banUser(user.usersID)
            .then(response => {
                if (response.data.status === "Ban User Successful"){
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
                    console.log(response.data)
                }
               
            })
            .catch(error => {
                console.error("Error banning user:", error);
            });
           
    };

    const handleUnbanUser = (user) => {
        userService.unbanUser(user.usersID)
            .then(response => {
                if (response.data.status === "UnBan User Successful"){
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
                    console.log(response.data)
                }
                
                
            })
            .catch(error => {
                console.error("Error banning user:", error);
            });
            
    };
  
      
 

  return (
    <div>
          <section className="pt-9 pb-9">
            {/* <Container className="pl-10 pr-10">
                <Row className="d-flex"> */}
                    {/* <Col lg="1"> */}
                        {users && users.length > 0 ? (
                            <table className="table bordered">
                                <thead>
                                    <tr>
                                   
                                        <th>usersID</th>
                                        <th>accountName</th>
                                        <th>email</th>
                                        <th>avatar</th>
                                        <th>phone</th>
                                        <th>userStatus</th>
                                            <th>accountBalance</th>
                                        <th>role</th>
                                        
                                        <th>username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                       
                                            <tr>
                                               
                                                <td>{user.usersID}</td>
                                                <td>{user.accountName}</td>
                                                <td>{user.email}</td>
                                                <td><img src={user.avatar} alt="" style={{ maxWidth: '250px' }} /></td>
                                                <td>{user.phone}</td>
                                                <td>{user.userStatus ? "Active" : "Inactive"}</td>
                                                <td>{user.accountBalance}</td>
                                                <td>{user.role}</td>
                                              
                                                <td>{user.username}</td>
                                                


                                                <td>
    {user.userStatus ? (
      
        <button onClick={() => handleBanUser(user)}>Disabled</button>
       ) : (  
       
        <button onClick={() => handleUnbanUser(user)}>Enabled</button>
      )}  
</td>
  


                                            </tr>

                                            
                                      
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h2 className="fs-4 text-center">Không có artwork nào</h2>
                        )}
                    {/* </Col> */}
                {/* </Row>
            </Container> */}
        </section>
    </div>
);

};               
export default ManageUser;
