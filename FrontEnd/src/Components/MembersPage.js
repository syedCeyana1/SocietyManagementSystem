import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const MembersPage = () => {
  const [membersData, setMembersData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembersData();
  }, []);

  const fetchMembersData = async () => {
    try {
      const response = await axios.get('http://localhost:9001/admin/members');
      setMembersData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openEditModal = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedMember(null);
  };

  // Add member functionality
  const handleAddMember = async (newMember) => {
    try {
      // Check if email and confirmEmail match
      if (newMember.email !== newMember.confirmEmail) {
        alert('Email and Confirm Email must match.');
        return;
      }

      // Perform the add member logic here using the newMember object
      // Send a request to the server to add the member

      // After successful addition, close the modal and fetch the updated member list
      await axios.post('http://localhost:9001/admin/members/add', JSON.stringify(newMember), {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Member Added Successfully!');
      closeAddModal();
      fetchMembersData();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Email Already Exists'); // Display the error message from the response
      } else if (error.response && error.response.status === 400) {
        alert('Flat Number Already Exists'); // Display the error message from the response
      } else {
        console.error(error);
        alert('An error occurred. Please try again.'); // Generic error message for other errors
      }
    }
  };

  function isNameValid(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  }

  function isMobileNumberValid(mobileNumber) {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
  };

  // Edit member functionality
  const handleEditMember = async (editedMember) => {
    try {
      if(isNameValid(editedMember.firstName)) {
        if(isNameValid(editedMember.lastName)) {
          if(isMobileNumberValid(editedMember.mobileNo)) {
            // Perform the edit member logic here using the editedMember object
            // Send a request to the server to update the member
            await axios.put(`http://localhost:9001/admin/member/update`, JSON.stringify(editedMember), {
              headers: { 'Content-Type': 'application/json' },
            });
            alert('Member Updated Successfully!');
            closeEditModal();
            fetchMembersData();
          } else {
            alert("Mobile Number Should be 10 Digits!");
          }
        } else {
          alert("Last Name should contain only Letters and White Spaces!");
        }
      } else {
        alert("First Name should contain only Letters and White Spaces!");
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.'); // Generic error message for other errors
    }
  };

  // Delete member functionality
  const handleDeleteMember = async (memberId) => {
    try {
      // Perform the delete member logic here using the memberId
      // Send a request to the server to delete the member
      await axios.delete(`http://localhost:9001/admin/members/delete/${memberId}`);
      alert('Member Deleted Successfully!');
      fetchMembersData();
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.'); // Generic error message for other errors
    }
  };

  return (
    <div className="container" style={{ height: '800px', overflowY: 'scroll' }}>
      <div class="table-title">
        <div class="row">
          <div class="col-sm-8">
            <br></br><br></br>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3"> Member<b>Details</b>
            </h1>
          </div>
          <hr></hr><hr></hr>
          <div class="col-sm-4">
            <button className='btn btn-primary' onClick={openAddModal} type="button" class='btn btn-primary'>
              <FontAwesomeIcon icon={faPlus} /> Member
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <div className="row">
        {membersData.map((member) => (
          <div className="col-md-4" key={member.userId}>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-center">
                  <AccountCircleIcon style={{ fontSize: 100 }} />
                </div>
                <h5 className="card-title">
                  {member.firstName} {member.lastName}
                </h5>
                <p className="card-text">
                  <strong>Email:</strong> {member.email}
                </p>
                <p className="card-text">
                  <strong>Mobile No:</strong> {member.mobileNo}
                </p>
                <p className="card-text">
                  <strong>Role:</strong> {member.role}
                </p>
                <p className="card-text">
                  <strong>Flat No:</strong> {member.flatNo}
                </p>
                <div className="d-flex justify-content-end">
                  <a className="mr-2" title="Edit" data-toggle="tooltip" onClick={() => openEditModal(member)}>
                    <EditIcon />
                  </a>
                  <a
                    title="Delete"
                    data-toggle="tooltip"
                    onClick={() => handleDeleteMember(member.userId)}
                  >
                    <DeleteIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMemberForm onAddMember={handleAddMember} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Member Modal */}
      {selectedMember && (
        <Modal show={showEditModal} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditMemberForm member={selectedMember} onEditMember={handleEditMember} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

const AddMemberForm = ({ onAddMember }) => {
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    mobileNo: '',
    role: '',
    flatNo: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if email and confirmEmail match
    if (member.email !== member.confirmEmail) {
      alert('Email and Confirm Email must match.');
      return;
    }

    onAddMember(member);
    setMember({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      mobileNo: '',
      role: '',
      flatNo: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={member.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={member.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={member.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirm Email</label>
        <input
          type="email"
          className="form-control"
          name="confirmEmail"
          value={member.confirmEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mobile No</label>
        <input
          type="text"
          className="form-control"
          name="mobileNo"
          value={member.mobileNo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select
          className="form-control"
          name="role"
          value={member.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="committee_member">CommitteeMember</option>
          <option value="resident">Resident</option>
        </select>
      </div>
      <div className="form-group">
        <label>Flat No</label>
        <input
          type="text"
          className="form-control"
          name="flatNo"
          value={member.flatNo}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Member
      </button>
    </form>
  );
};

const EditMemberForm = ({ member, onEditMember }) => {
  const [editedMember, setEditedMember] = useState({
    userId: member.userId,
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    mobileNo: member.mobileNo,
    role: member.role,
    flatNo: member.flatNo,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditMember(editedMember);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={editedMember.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={editedMember.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={editedMember.email}
          onChange={handleChange}
          required
          disabled
        />
      </div>
      <div className="form-group">
        <label>Mobile No</label>
        <input
          type="text"
          className="form-control"
          name="mobileNo"
          value={editedMember.mobileNo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select
          className="form-control"
          name="role"
          value={editedMember.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="committee_member">CommitteeMember</option>
          <option value="resident">Resident</option>
        </select>
      </div>
      <div className="form-group">
        <label>Flat No</label>
        <input
          type="text"
          className="form-control"
          name="flatNo"
          value={editedMember.flatNo}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

