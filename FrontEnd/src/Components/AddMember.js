import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export const AddMember = () => {

    const [member, AddMember] = useState({

        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNo: '',
        flatNo: '',
        role: ''
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect( ()=> {

        const checkLoginStatus = ()=> {
            if(location.state.role === 'admin')
            {
                const isLoggedInUser = localStorage.getItem('isLoggedIn2') === 'true';
                setIsLoggedIn(isLoggedInUser);
            } else if(location.state.role === 'committee_member')
            {
                const isLoggedInUser = localStorage.getItem('isLoggedIn1') === 'true';
                setIsLoggedIn(isLoggedInUser);
            }
        };
        checkLoginStatus();
    },[]);

    function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    function isPasswordValid(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };

    function isMobileNumberValid(mobileNumber) {
        const mobileNumberRegex = /^\d{10}$/;
        return mobileNumberRegex.test(mobileNumber);
      };
      

    const handleInput = (event) => {

        AddMember({...member, [event.target.name]: event.target.value})
    }

    const handleClick1 = () => {
    if(location.state.role === 'admin')
     {   
        navigate('/adminhomepage');
     }else if(location.state.role === 'committee_member')
     {
        navigate('/committeemember');
     }
    } 


    const handleClick2 = () => {
        
    if(location.state.role === 'admin')
     {   
        navigate('/adminloginpage');
     }else if(location.state.role === 'committee_member')
     {
        navigate('/memberloginpage');
     }
    }

    async function handleSubmit(event) {

        event.preventDefault();
    
    const {firstName, lastName, email, password, mobileNo, flatNo, role} = member;

    if( !firstName || !lastName || !email || !password || !mobileNo || !flatNo || !role) {

        alert('Please fill in all the required fields.');
        return;
    }

    try {

        if(isEmailValid(member.email)) {

            if(isPasswordValid(member.password)) {

                if(isMobileNumberValid(member.mobileNo)) {
                    
        const response = await axios.post('http://localhost:9001/admin/members/add',JSON.stringify(member),
        {headers: {'Content-Type': 'application/json'}})
        
        const data = response.data;
        alert("Member Added Successfully!");
        //navigate('/adminhomepage');
        } else {

            alert("Mobile Number Should be 10 Digits!");
        }

        } else {

            alert("Password format is invalid!");
        }
     } else {

        alert("Email format is Invalid!");
     }
    }catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Email Already Exists"); // Display the error message from the response
        } else if(error.response && error.response.status === 400) {
            alert("Flat Number Already Exists"); // Display the error message from the response
        } else {
          console.error(error);
          alert("An error occurred. Please try again."); // Generic error message for other errors
        }
      }
      
    }

    return(

        <div className='App2'>
            {isLoggedIn ? (

                <div className='auth-form-container'>
                    <h3 className='link-btn'>Add Member</h3><hr/>

                    <form className='register-form'>

                        <input onChange={handleInput} type='text' placeholder='First Name' id='firstName' name='firstName'/>

                        <input onChange={handleInput} type='text' placeholder='Last Name' id='lastName' name='lastName'/>

                        <input onChange={handleInput} type="email" placeholder="Email" id="email" name="email" />

                        <input onChange={handleInput} type="password" placeholder="********" id="password" name="password" />

                        <input onChange={handleInput} type='number' placeholder='Mobile Number' id='mobileNo' name='mobileNo'/>

                        <input onChange={handleInput} type='number' placeholder='Flat Number' id='flatNo' name='flatNo'/>

                        <select onChange={handleInput} id='role' name='role'>
                            <option value='' disabled selected>Select Resident Type</option>
                            <option value='resident'>Resident</option>
                            <option value='committee_member'>Committee Member</option>
                        </select><br/>

                        <button className='btn btn-primary' onClick={handleSubmit}>Add Member</button><hr/>

                    </form>
                    <h4><button className="link-btn" onClick={handleClick1}>Back to previous page</button></h4>
                </div>

            ) : (
                <div>
                     <h1>{location.state.role}  logged out!<br/> Please Login again to access this page!.</h1>
                     <button onClick={handleClick2}>LogIn</button>
                </div>
            )}
        </div>
    );


}