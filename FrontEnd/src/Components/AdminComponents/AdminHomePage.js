import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminHomePage = () => {
  const [isLoggedIn2, setIsLoggedIn2] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus2 = () => {
      const isLoggedInUser2 = localStorage.getItem('isLoggedIn2') === 'true';
      setIsLoggedIn2(isLoggedInUser2);
    };
    checkLoginStatus2();
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn2');
    setIsLoggedIn2(false);
    // Display a toast message for successful logout
  toast.success('Successfully Logged out!', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

  const navigatePage1 = () => {
    navigate('/adminloginpage');
  };

  const navigatePage2 = () => {
    navigate('/');
  };

  const navigateToMembersPage = () => {
    navigate('/memberspage');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick6 = () => {
    navigate('/election',{ state: { role: 'admin' } });
};

  return (
    <div className="admin-home-page">
      <div>
        {isLoggedIn2 ? (
          <>
            <nav>
              <a  onClick={navigateToMembersPage}>
                Members
              </a>
              <a onClick={handleClick6}>Elections</a>
              
              <a onClick={logout}>
                <LogoutIcon />
              </a>

              {isMenuOpen && (
                <ul className="menu-list">
                  <li>
                    <a href="#">Voting</a>
                  </li>
                  <li>
                    <a href="#">AssignCommittee</a>
                  </li>
                </ul>
              )}

              <div className="animation start-home"></div>
            </nav>

            <br></br><hr></hr>
            <MDBContainer fluid className='p-4'>
        
        <MDBRow>
  
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
  
            <h1 className="my-5 display-3 fw-bold ls-tight px-3"> Welcome Here..</h1> 
            
            <h3 className="my-5 display-3 fw-bold ls-tight px-3 text-primary"> ADMIN </h3>
            </MDBCol>
    
    </MDBRow>
   
  </MDBContainer>
            
                 
          </>
        ) : (
          <div> <center>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-primary"> Bye ADMIN</h1>
            </center>
            <center>
            <h5 className = "my-5 display-3 fw-bold ls-tight px-3"> Have A Great Day !!!</h5>
            </center>
            <hr/>
            <center>
            <button onClick={navigatePage1} className="btn btn-primary">
              <LoginIcon />
            </button>
            </center>
            <hr />
            <center>
            <button className="btn btn-primary" onClick={navigatePage2}>
              <HomeIcon />
            </button>
            </center>
            <hr/>
          </div>
          
        )}
      </div>
    </div>
    
  );
};
