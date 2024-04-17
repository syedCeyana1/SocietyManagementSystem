import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

// Function to check if email is valid
function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to check if password is valid
function isPasswordValid(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function isMobileNumberValid(mobileNumber) {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
  };

export const SelfUpdateMember = () => {
  const [member, setMember] = useState({});
  const [modifiedRecords, setModifiedRecords] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAnyFieldEdited, setIsAnyFieldEdited] = useState(false);
  const [isEmailValidated, setIsEmailValidated] = useState(true);
  const [isPasswordValidated, setIsPasswordValidated] = useState(true);
  const [isMobileNoValidated, setIsMobileNoValidated] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchMemberDetails = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.get(`http://localhost:9001/members/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const fetchedMember = response.data;
      setMember(fetchedMember);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedInUser = localStorage.getItem('isLoggedIn1') === 'true';
      setIsLoggedIn(isLoggedInUser);
    };
    checkLoginStatus();
  }, []);

  const handleClick = () => {
    if (location.state.role === 'resident') {
      navigate('/memberhomepage');
    } else if (location.state.role === 'committee_member') {
      navigate('/committeemember');
    }
  };

  const navigatepage = () => {
    navigate('/memberloginpage');
  };

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  const toggleEditing = (recordId) => {
    setMember((prevMember) => {
      if (prevMember.userId === recordId) {
        const updatedMember = { ...prevMember, isEditing: !prevMember.isEditing };
        // setIsAnyFieldEdited(true);
        return updatedMember;
      }
      return prevMember;
    });
  };

  const updateMemberField = (recordId, fieldName, fieldValue) => {
    setMember((prevMember) => {
      if (prevMember.userId === recordId) {
        const updatedMember = { ...prevMember, [fieldName]: fieldValue };
        setIsAnyFieldEdited(true);
        return updatedMember;
      }
      return prevMember;
    });
  };

  const handleUpdateClick = async () => {
    const {firstName, lastName, email, mobileNo, password} = member;

    if( !firstName || !lastName || !email || !mobileNo || !password ) {

        alert('Please fill in all the required fields.');
        return;
    }
    try {
      if (isAnyFieldEdited && isEmailValidated && isPasswordValidated) {
        setModifiedRecords([member]);
        await axios.put('http://localhost:9001/admin/member/update', member, {
          headers: { 'Content-Type': 'application/json' },
        });
        alert('Record updated successfully');
        await fetchMemberDetails();
      } else {
        alert('No changes to update or invalid email/password');
      }
    } catch (error) {
      alert('Error updating records');
    }
        window.location.reload();
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    updateMemberField(member.userId, 'email', emailValue);
    setIsEmailValidated(isEmailValid(emailValue));
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    updateMemberField(member.userId, 'password', passwordValue);
    setIsPasswordValidated(isPasswordValid(passwordValue));
  };

  const handleMobileNoChange = (e) => {
    const mobileValue = e.target.value;
    updateMemberField(member.userId, 'mobileNo', mobileValue);
    setIsMobileNoValidated(isMobileNumberValid(mobileValue));
  };

  

  useEffect(() => {
    setIsEmailValidated(isEmailValid(member.email));
    setIsPasswordValidated(isPasswordValid(member.password));
  }, [member.email, member.password]);

  return (
    <div className='App3'>
      <div>
        {isLoggedIn ? (
          <>
            <h1>Update Members</h1>
            <hr />

            <table className="table table-striped table-bordered ">
              <thead>
                <tr style={{ background: 'orange' }}>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Password</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                <tr key={member.userId}>
                  <td>{member.userId}</td>
                  <td>
                    {member.isEditing ? (
                      <input
                        type="text"
                        value={member.firstName || ''}
                        onChange={(e) => updateMemberField(member.userId, 'firstName', e.target.value)}
                      />
                    ) : (
                      member.firstName
                    )}
                  </td>
                  <td>
                    {member.isEditing ? (
                      <input
                        type="text"
                        value={member.lastName || ''}
                        onChange={(e) => updateMemberField(member.userId, 'lastName', e.target.value)}
                      />
                    ) : (
                      member.lastName
                    )}
                  </td>
                  <td>
                    {member.isEditing ? (
                      <input
                        type="text"
                        value={member.email || ''}
                        onChange={handleEmailChange}
                      />
                    ) : (
                      member.email
                    )}
                    {!isEmailValidated && member.isEditing && (
                      <span className="error">
                        <br />
                        Invalid email
                      </span>
                    )}
                  </td>
                  <td>
                    {member.isEditing ? (
                      <input
                        type="text"
                        value={member.mobileNo || ''}
                        onChange={handleMobileNoChange}
                      />
                    ) : (
                      member.mobileNo
                    )}
                    {!isMobileNoValidated && member.isEditing && (
                      <span className="error">
                        <br />
                        Mobile Number must contain 10 Digits!.
                      </span>
                    )}
                  </td>
                  <td>
                    {member.isEditing ? (
                      <input
                        type="text"
                        value={member.password || ''}
                        onChange={handlePasswordChange}
                      />
                    ) : (
                      member.password
                    )}
                    {!isPasswordValidated && member.isEditing && (
                      <span className="error">
                        <br />
                        Password must be at least 8 characters long, must contain at least one uppercase letter, one
                        digit, and one special character.
                      </span>
                    )}
                  </td>
                  <td>
                    <Toggle checked={member.isEditing} icons={false} onChange={() => toggleEditing(member.userId)} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={handleUpdateClick} disabled={!isAnyFieldEdited || !isEmailValidated || !isMobileNoValidated || !isPasswordValidated} 
                    className={!isAnyFieldEdited || !isEmailValidated || !isMobileNoValidated || !isPasswordValidated ? 'disabled' : ''} ><h6> Update </h6></button>

            <br/>
            <button className='link-btn' onClick={handleClick}><h5>Back to previous page</h5></button>
          </>
        ) : (
          <div>
            <h1>
              {location.state.role} logged out!
              <br /> Please Login again to access this page!.
            </h1>
            <button onClick={navigatepage}>LogIn</button>
          </div>
        )}
      </div>
    </div>
  );
};