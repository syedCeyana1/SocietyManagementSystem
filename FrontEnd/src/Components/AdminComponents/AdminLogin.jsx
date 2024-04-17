import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
  
  import React from 'react';

export const AdminLogin = () => {

    const [isLoggedIn2, setIsLoggedIn2] = useState(false);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''})

        

    const handleInput = (event) => {setCredentials({...credentials,[event.target.name]: event.target.value})}

    function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
    }

    function isPasswordValid(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
    }

    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
        if (isEmailValid(credentials.email)) {
          if (isPasswordValid(credentials.password)) {
            const response = await axios.post(
              'http://localhost:9001/admin/validateadmin',
              JSON.stringify(credentials),
              { headers: { 'Content-Type': 'application/json' } }
            );
    
            const output = response.data;
    
            localStorage.setItem('isLoggedIn2', true);
            setIsLoggedIn2(true);
            // alert(output);
            navigate('/adminhomepage');
    
            // Display a toast message for successful login
            toast.success('Successfully Logged in!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            alert('Password format is incorrect!');
    
            // Display a toast message for incorrect password format
            toast.error('Password format is incorrect!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          alert('Email is in Incorrect format!');
    
          // Display a toast message for incorrect email format
          toast.error('Email is in Incorrect format!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error(error);
        alert('Login Failed!');
    
        // Display a toast message for login failure
        toast.error('Login Failed!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    

    return (
        <div style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>

        <MDBContainer fluid className='p-4'>
        
          <MDBRow>
    
            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
    
              <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              Welcome Here... <br/>
                <span className="text-primary">ADMIN.</span>
              </h1>
    
              <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
              Your journey to enhanced community living begins here. Login now to explore the endless possibilities our Society Management App offers. We are committed to providing you with a seamless and enriching experience within our vibrant society.
              </p>
    
            </MDBCol>
    
            <MDBCol md='6'>
            
              <MDBCard className='my-5 increased-card-size'>
                <MDBCardBody className='p-5'>
                  <h2>Login Here .. </h2>
                  <label for="email">Email</label>
                  <MDBInput wrapperClass='mb-4' onChange={handleInput} type='email' placeholder='Email' id='email' name='email' required/>
                  <label for="password">Password</label>
                  <MDBInput wrapperClass='mb-4' onChange={handleInput} type='password' placeholder='********' id='password' name='password' required/>
                  
                  <MDBBtn  onClick={handleLogin} className='w-100 mb-4' size='md'>LOGIN</MDBBtn>

                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
    
          </MDBRow>
         
        </MDBContainer>
        </div>
      );
    }