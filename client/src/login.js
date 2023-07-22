import React, { useEffect, useState } from 'react';
import "./login.css"
import logo from './components/images/logo.png'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const Login = () => {
    
        const [username, setUsername] = useState('');
        const [mobilenumber, setMobileno] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();
        var enableHover='false';
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
            const response = await Axios.post('http://localhost:8080/login', {
              username,
              password,
              mobilenumber
            });
            

            if (response.data==='invalidUsername') {
              alert("Invalid Username");
          }
      
            else if (response.data==="toAdmin") {
                navigate('/custcom');
            }

            else if (response.data==="toUser") {
              enableHover="false";
              const queryParameters = `?mobno=${mobilenumber}&enable=${enableHover}`;
          
              navigate(`/home${queryParameters}`);
            }

            else if (response.data==="incorrectPassword") {
                alert("Incorrect Password");
            }
            else{
              console.log("error:");
              console.log(response);
             }

          } catch (error) {
            console.log("come to error");
            console.error(error);
          }
        };
  

  return (
    <div className='login_body'>
    <div className='login_container'>
      
        <form onSubmit={handleSubmit}>
            <div className="header">
                <img src={logo} title="My Website" width="100px" height="90px" style={{display: "inline",}}/>
        <h1 >Infinix</h1>
            </div>
            <h2 >Login Page</h2>
            <div className="form-group">
                <label>Username:</label>
                <input type="text" name="username" placeholder="username" required="" id="id_username" onChange={e => setUsername(e.target.value)}/>
            </div>
            
            <div className="form-group">
                <label>Mobile Number:</label>
                <input type="tel" id="mobile" placeholder="Mobile number" onChange={e => setMobileno(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Password:</label>
                <div>
                    <input type="password" name="password" placeholder="password"  required id="id_password" onChange={e => setPassword(e.target.value)}/>
                </div>
            </div>
            
                
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
     </div>
  );
};

export default Login;