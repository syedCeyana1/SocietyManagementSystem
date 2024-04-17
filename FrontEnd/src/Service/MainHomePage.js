
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './style.css';


export const MainHomePage = () => {
  const navigate = useNavigate();
  const [isMemberLogin, setIsMemberLogin] = useState(true);

  const handleClick1 = () => {
    navigate('/memberloginpage');
  };

  const handleClick2 = () => {
    navigate('/adminloginpage');
  };

  const handleToggleForm = () => {
    setIsMemberLogin(!isMemberLogin);
  };

  return (
    <div>
        
    
    
    <div className={`wrapper ${isMemberLogin ? 'animate-signUp' : 'animate-signIn'}`}>
      <div className={`form-wrapper sign-up ${isMemberLogin ? 'animate-signUp' : ''}`}>
        <form action="">
          <h2  style={{ color: 'white' }}>Member Login</h2>

          <button onClick={handleClick1} type="submit" className="btn">
            Login
          </button>
          <div className="sign-link">
            <p className="not-member">
              Not a member? <a href="#" onClick={handleToggleForm} className="memberLogin-link">Admin Login</a>
            </p>
          </div>
        </form>
      </div>

      <div className={`form-wrapper sign-in ${isMemberLogin ? '' : 'animate-signIn'}`}>
        <form action="">
          <h2  style={{ color: 'white' }}>Admin Login</h2>

          <button onClick={handleClick2} type="submit" className="btn">
            Login
          </button>
          <div className="sign-link">
            <p className="not-member">
              Not an Admin? <a href="#" onClick={handleToggleForm} className="adminLogin-link">Member Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

