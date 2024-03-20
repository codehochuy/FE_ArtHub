// export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));
  
//     if (user && user.token) {
//       return { Authorization: 'Bearer Token ' + user.token, 'Content-Type': 'application/json' };
//     } else {
//       return {};
//     }
//   }
// export default function authHeader() {



  // console.log('userid' , usersID);
  
  // console.log('access_token:', access_token);
  const authHeader = () => {
    const access_token = localStorage.getItem('access_token');
  if (access_token) {
    return { 
      Authorization: 'Bearer ' + access_token, 
      'Content-Type': 'application/json',
    };
    
  } else {
    return {};
  }
};
export default authHeader;