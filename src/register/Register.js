import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
import logo from '../wenLogo.jpg'
import "../project.css";
import avatar from './avatar.png' 


function Register() {

    const [userName, setUserName] = useState("");
    const [nickName, setNickName] = useState("");
    const [image, setImage] = useState(avatar);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function postDataInDB(user) {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
        const response = await fetch('http://localhost:5271/api/User/Register', requestOptions);
        const token = await response.text();
        return token;
    }
    

    const checkPass2 = function () {
        var pass = document.getElementById('Password').value
        var message = document.getElementById('StrongPass')
        if (pass.length < 8 || !(/\d/.test(pass)) || !(/[a-zA-Z]/.test(pass))) {
            message.innerHTML = '<span id="notValid" >not valid</span>'
            return false;
        }
        else if (pass.match(/\d/g)?.length <= 2 || pass.match(/[a-zA-Z]/g)?.length <= 2) {
            message.innerHTML = '<span id="weak">weak</span>'
            return true;
        }
        else {
            message.innerHTML = '<span id="strong">strong</span>'
            return true;
        }
    }

    async function checkIfValidAndSubmit(event) {
        event.preventDefault();

        var checkPass = document.getElementById('checkPass').value;
        if (!checkPass2()) {
            alert('Password is not valid');
        }
        else if (password !== checkPass) {
            alert('Password is not matching');
        }
        else {
            let stat;
            if (nickName === '')
                stat = await postDataInDB({ userName: userName, password: password, nickName: userName,  image: image, contacts: [] });
            else 
                stat = await postDataInDB({ userName: userName, password: password, nickName: nickName,  image: image, contacts: [] });

            if (stat === "false" || userName === '') {
                alert('This user name is not valid or already exists, chose a different one');
            }
            else{
                navigate('/chats',  { state:{ token: stat, userName:userName}});
            }
        }
    }


    const uploadImage = (event) => {
            let value = URL.createObjectURL(event.target.files[0]);
            setImage(value);
        };



    return (
        <div>
            <img id="logoR" alt="logo" src={logo}></img>
            <div className='centerR shadow-lg p-3 mb-5 bg-white rounded'>

                <h1> Registration</h1>
                <form method='post'>

                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-floating form-floating-register">
                                        <input type="text" className="form-control form-control-register" id="username" name="username"
                                            placeholder="User Name" onChange={event => setUserName(event.target.value)} ></input>
                                        <label className='string' htmlFor="username"><i className="bi bi-person-fill"></i>
                                            User Name</label>
                                        <span id="userNameValid"></span> <br></br>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-floating">
                                        <input type="password" className="form-control form-control-register" id="Password" name="pass" placeholder="Password" onInput={checkPass2} onChange={event => setPassword(event.target.value)}></input>
                                        <label htmlFor="Password"><i className="bi bi-lock-fill"></i>Password</label>
                                        <i className="bi-info-circle" data-bs-toggle="tooltip" data-bs-placement="right"
                                            title="password must be at least 8 charecters, you must have at least one number and letter"></i>

                                        <span id="StrongPass"></span>

                                    </div></td>
                            </tr>
                            <tr>
                                <td><div className="form-floating">
                                    <input type="text" className="form-control form-control-register" id="NickName" name="username"
                                        placeholder="NickName"  onChange={event => setNickName(event.target.value)} ></input>
                                    <label className='string' htmlFor="username"><i className="bi bi-person-fill"></i> Nick Name</label>
                                    <span id="userNameValid"></span>
                                </div></td>
                                <td>    <div className="form-floating">
                                    <input type="password" className="form-control form-control-register" id="checkPass" nume="pass" placeholder="checkPass"></input>
                                    <label htmlFor="checkPass"><i className="bi bi-lock-fill"></i>
                                        Confirm Password</label>
                                </div></td>
                            </tr>



                        </tbody>
                    </table>
                    <input type="file" className="form-control form-control-imag " id="image" name="image" accept="image/png, image/jpeg" onChange={uploadImage}></input>

                    <button type="submit" id="btn" className="btn btn_start btn-primary" onClick={checkIfValidAndSubmit} > Submit</button>
                    <div className="link">
                        Already have an account?&nbsp;
                        <Link to='/'>Log in</Link>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Register;
