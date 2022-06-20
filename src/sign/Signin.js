import { Link, useNavigate } from 'react-router-dom'
import { React, useState, useEffect } from 'react';
import logo from '../wenLogo.jpg'
import './sign.css'
import '../project.css'

function Signin() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    async function serverSignIn(user) {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        }
        const response = await fetch('http://localhost:5271/api/User/Login', requestOptions);
        
        const token = await response.text();
        return token;
    }

    async function goToChatPage(event) {
        event.preventDefault();
        
        const token = await serverSignIn({userName: userName, password:password})


        if (token === "false") {
            alert('user name or password are incorrect')
        }
        else {
            navigate('/chats', { state:{token:token, userName: userName}});
        }

    }


    return (
        <div>
            <img id="logo" alt="logo" src={logo}></img>
            <div id="sign" className='col-6 center shadow-lg p-3 mb-5 bg-white rounded'>

                    <h1> Sign in</h1>
                    <form method="post">
                        <div className="form-floating sign">
                            <input type="text" className="form-control" id="lname" name="lname" placeholder="User Name"
                             onChange={event => setUserName(event.target.value)}></input>
                            <label htmlFor='lname'><i className="bi bi-person-fill"></i> User Name</label>
                        </div>
                        <br></br>
                        <div className="form-floating sign">
                            <input type="password" className="form-control" id="pass" name="pass" placeholder="Password"
                             onChange={event => setPassword(event.target.value)}></input>
                            <label htmlFor='lname'><i className="bi bi-lock-fill"></i>Password</label>
                        </div>
            
                        <button type="submit" id="btn" className="btn btn_start btn-primary" onClick={goToChatPage} > Login</button>

                        <div className="link">
                            Don't have an account? Click here to&nbsp;
                            <Link to='/register'>register</Link>
                        </div>
                    </form>
                    <a href='https://localhost:7038'> go to rating page </a>
                </div>
                
        </div>

    );
}
export default Signin;