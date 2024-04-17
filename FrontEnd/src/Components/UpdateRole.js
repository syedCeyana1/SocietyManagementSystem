import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const UpdateRole = () => {
  const [member, setMember] = useState([]);
  const [modifiedRecords, setModifiedRecords] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchMemberDetails = async () => {
    try {
      const response = await axios.get('http://localhost:9001/admin/members');
      const fetchedMember = response.data;
      setMember(fetchedMember.map(mem => ({ ...mem, selectedRole: mem.role })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      if (location.state.role === 'admin') {
        const isLoggedInUser = localStorage.getItem('isLoggedIn2') === 'true';
        setIsLoggedIn(isLoggedInUser);
      } else if (location.state.role === 'committee_member') {
        const isLoggedInUser = localStorage.getItem('isLoggedIn1') === 'true';
        setIsLoggedIn(isLoggedInUser);
      }
    };
    checkLoginStatus();
  }, []);

  const handleClick = () => {
    if (location.state.role === 'admin') {
      navigate('/adminhomepage');
    } else if (location.state.role === 'committee_member') {
      navigate('/committeemember');
    }
  };

  const navigatepage = () => {
    if (location.state.role === 'admin') {
      navigate('/adminloginpage');
    } else if (location.state.role === 'committee_member') {
      navigate('/memberloginpage');
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  const updateRole = (recordId, newRole) => {
    const updatedMembers = member.map((mem) => {
      if (mem.userId === recordId) {
        return { ...mem, selectedRole: newRole };
      }
      return mem;
    });

    setMember(updatedMembers);
  };

  const handleUpdateClick = async () => {
    try {
      const updatedRecords = member.map((mem) => {
        if (mem.selectedRole && mem.role !== mem.selectedRole) {
          return { ...mem, role: mem.selectedRole };
        }
        return mem;
      });
      setModifiedRecords(updatedRecords);

      await axios.put('http://localhost:9001/admin/members/update', updatedRecords, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert("Records updated successfully");

      await fetchMemberDetails();
    } catch (error) {
      alert("Error updating records");
    }
  };

  return (
    <div className='App2'>
      <div>
        {isLoggedIn ? (
          <>
            <h1>Update Members</h1>
            <hr />

            <table className='table table-striped table-bordered table-hover'>
              <thead>
                <tr style={{ background: 'orange' }}>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Flat Number</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {member.map((mem) => (
                  <tr key={mem.userId}>
                    <th>{mem.userId}</th>
                    <th>{mem.firstName}</th>
                    <th>{mem.lastName}</th>
                    <th>{mem.email}</th>
                    <th>{mem.mobileNo}</th>
                    <th>{mem.flatNo}</th>
                    <th>
                      {mem.role === '' ? (
                        <select
                          value={mem.selectedRole || ''}
                          onChange={(e) => updateRole(mem.userId, e.target.value)}
                        >
                          <option value="">Select Role</option>
                          <option value="resident">Resident</option>
                          <option value="committee_member">Committee Member</option>
                        </select>
                      ) : (
                        mem.role
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleUpdateClick}>Update</button>
            <span> </span>
            <button onClick={handleClick}>Back to previous page</button>
          </>
        ) : (
          <div>
            <h1>
              {location.state.role} logged out!<br /> Please Login again to access this page!.
            </h1>
            <button onClick={navigatepage}>LogIn</button>
          </div>
        )}
      </div>
    </div>
  );
};
