import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Dropdown, Form, Modal, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardGroup } from 'react-bootstrap';
import './Committe.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CommitteeMemberHomePage = () => {

  const [memberDetails, setMemberDetails] = useState({});
  const [isLoggedIn1, setIsLoggedIn1] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMemberDetails, setModalMemberDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    fromDate: null,
    toDate: null,
  });
  const [accounts, setAccounts] = useState([]);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showAccountsModal1, setShowAccountsModal1] = useState(false);
  const [notices, setNotices] = useState([]);



  const [complaintsSuggestions, setComplaintsSuggestions] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [showComplaintsSuggestionsModal, setShowComplaintsSuggestionsModal] = useState(false);
const [remainders, setRemainders] = useState([]);
  const [showRemaindersModal, setShowRemaindersModal] = useState(false);
  const [showAddRemainderModal, setShowAddRemainderModal] = useState(false);
  const [newRemainder, setNewRemainder] = useState({
    title: '',
    description: '',
    user: '',
  });


  const [contestantaDetails, setContestantaDetails] = useState([]);
  const [presidentRecords, setPresidentRecords] = useState([]);
  const [secretaryRecords, setSecretaryRecords] = useState([]);
  const [treasurerRecords, setTreasurerRecords] = useState([]);


  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
const [noticeHeading, setNoticeHeading] = useState('');
const [noticeContent, setNoticeContent] = useState('');


  useEffect(() => {
    const filterRecordsByRole = () => {
      const presidentRecords = contestantaDetails.filter(item => item.role === 'president');
      const secretaryRecords = contestantaDetails.filter(item => item.role === 'secretary');
      const treasurerRecords = contestantaDetails.filter(item => item.role === 'treasurer');
  
      setPresidentRecords(presidentRecords);
      setSecretaryRecords(secretaryRecords);
      setTreasurerRecords(treasurerRecords);
    };
  
    filterRecordsByRole();
  }, [contestantaDetails]);



  useEffect(() => {
    const checkPollsStatus = () => {
      const isPolling = localStorage.getItem('EnablePolls') === 'true';
      setIsPollsActive(isPolling);
    };
    checkPollsStatus();
  }, []);

  useEffect(() => {
    const checkResultsStatus = () => {
      const isResults = localStorage.getItem('EnableResults') === 'true';
      setIsResultsActive(isResults);
    };
    checkResultsStatus();
  }, []);

  useEffect(() => {
    const eleid = parseInt(localStorage.getItem('election_id'));
    const fetchContestantsDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/ballotbox/oneballot/${eleid}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        const memberdetails = response.data;
        setContestantaDetails(memberdetails);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };
    fetchContestantsDetails();
  }, []);

  const [users, setUsers] = useState([]);

  const handleAddNotice = () => {
    setShowAddNoticeModal(!showAddNoticeModal);
  };
  
  const handleNoticeFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'noticeHeading') {
      setNoticeHeading(value);
    } else if (name === 'noticeContent') {
      setNoticeContent(value);
    }
  };
  
  const handleNoticeFormSubmit = async (e) => {
    e.preventDefault();
  
    // Perform form validation
    if (!noticeHeading || !noticeContent) {
      alert('Please fill out all fields.');
      return;
    }
  
    try {
      // Make a POST request to the backend API to add the new notice
      const response = await axios.post('http://localhost:9001/notice/add', {
        heading: noticeHeading,
        notice: noticeContent,
      });
      alert('Notice added successfully!');
      console.log(response.data); // Handle success response
  
      // Close the add notice modal and reset the form
      setShowAddNoticeModal(false);
      setNoticeHeading('');
      setNoticeContent('');
    } catch (error) {
      console.error(error); // Handle error response
      alert('Failed to add notice. Please try again.');
    }
  };

  useEffect(() => {
    fetchRemainders();
    fetchUsers();
  }, []);

  const fetchRemainders = async () => {
    try {
      const response = await axios.get('http://localhost:9001/remainders/getall');
      const remaindersData = response.data;
      setRemainders(remaindersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendRemainders = async () => {
    try {
      await axios.post('http://localhost:9001/committee/sendRemainders');
      alert('Remainders sent successfully.');
    } catch (error) {
      console.error(error);
      alert('Failed to send remainders. Please try again.');
    }
  };



const handleAddRemainderFormChange = (e) => {
    setNewRemainder((prevRemainder) => ({
      ...prevRemainder,
      [e.target.name]: e.target.value,
    }));
  };





const handleAddRemainderSubmit = async (e) => {
    e.preventDefault();
  
    // Check if a user is selected
    if (!selectedUser) {
      alert('Please select a user.');
      return;
    }
  
    const remainderData = {
      title: newRemainder.title,
      description: newRemainder.description,
      userId: selectedUser.userId,
    };
  
    console.log('Remainder Data:', remainderData);
  
    try {
      await axios.post('http://localhost:9001/remainders/add', remainderData);
      alert('Remainder added successfully.');
      setNewRemainder({
        title: '',
        description: '',
        user: '',
      });
      // Additional logic after submitting the form
    } catch (error) {
      console.error(error);
      alert('Failed to add remainder. Please try again.');
    }
  };
  
  

  const renderRemainderTable = () => {
    return (
      <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {remainders.map((remainder) => (
            <tr key={remainder.id}>
              <td>{remainder.title}</td>
              <td>{remainder.description}</td>
              <td>{remainder.userId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

const handleUserSelect = (e) => {
    const selectedUserName = e.target.value;
    const selectedUser = users.find((user) => user.name === selectedUserName);
    setSelectedUser(selectedUser);
  };

const renderAddRemainderForm = () => {
    return (
      <Form onSubmit={handleAddRemainderSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={newRemainder.title} onChange={handleAddRemainderFormChange} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={newRemainder.description} onChange={handleUserSelect} />
        </Form.Group>
        <Form.Group controlId="userId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            name="userId"
            value={newRemainder.user ? newRemainder.user.userId :  ""}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="user">
          <Form.Label>User</Form.Label>
          <Form.Control as="select" name="user" value={newRemainder.user} onChange={handleAddRemainderFormChange}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user}>
                {user.userId}-{user.firstName}-{user.lastName}-{user.flatNo}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    
    );
  };
  

  const fetchAccounts1 = async () => {
    try {
      const response = await axios.get('http://localhost:9001/committee/allaccounts');
      setAccounts(response.data);
      setShowAccountsModal1(true);
    } catch (error) {
      console.error(error);
      // Handle error scenario
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9001/admin/members');
      const usersData = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.get(`http://localhost:9001/committee/accounts/user/${userId}`,
      { headers: { 'Content-Type': 'application/json' } }
      );
      const accountsData = response.data;
      setAccounts(accountsData);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handlePay = async (accountId) => {
    try {
         const userId = parseInt(localStorage.getItem('userId'));
      await axios.put(`http://localhost:9001/accounts/update/${userId}`);
      alert('Payment successful.');
      fetchAccounts();
    } catch (error) {
      console.error(error);
      alert('Failed to process payment. Please try again.');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus1 = () => {
      const isLoggedInUser1 = localStorage.getItem('isLoggedIn1') === 'true';
      setIsLoggedIn1(isLoggedInUser1);
    };
    checkLoginStatus1();
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn1');
    setIsLoggedIn1(false);
    // Displaying a toast message for successful logout
  toast.success('Successfully Logged out!', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000, // 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  navigate('/');
};


const handleAddEvent = () => {
    setShowAddModal(!showAddModal);
  };


  const handleEventFormChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleFromDateChange = (date) => {
    setNewEvent({
      ...newEvent,
      fromDate: date,
    });
  };


  const fetchEvents = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.get(`http://localhost:9001/members/events/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const eventsData = response.data;
      setEvents(eventsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToDateChange = (date) => {
    setNewEvent({
      ...newEvent,
      toDate: date,
    });
  };



  const handleEventFormSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!newEvent.eventName || !newEvent.fromDate || !newEvent.toDate) {
      alert('Please fill out all fields.');
      return;
    }

    const currentDate = new Date(); // Get the current date
    const fromDate = newEvent.fromDate;
    const toDate = newEvent.toDate;
  
    // Check if the dates are in the past
    if (fromDate < currentDate || toDate < currentDate ) {
      alert('Please select valid dates.');
      return;
    }

    if(toDate<fromDate)
    {
      alert("pls select a valid to date ")
    }
  
    // Check if the dates are already booked
    const eventsData = events.map((event) => ({
      ...event,
      fromDate: new Date(event.fromDate),
      toDate: new Date(event.toDate),
    }));
  
    for (const event of eventsData) {
      if ((fromDate >= event.fromDate && fromDate <= event.toDate) || (toDate >= event.fromDate && toDate <= event.toDate)) {
        alert('The selected dates are already booked.');
        return;
      }
    }

    // Set the userId to the current logged-in user's userId
    const userId = parseInt(localStorage.getItem('userId'));
    setNewEvent({
      ...newEvent,
      userId,
    });

    // Make a POST request to the backend API to add the new event
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.post('http://localhost:9001/members/events/add', newEvent);
      alert("event added!!!")
      console.log(response.data); // Handle success response

      // Close the add event modal and reset the form
      setShowAddModal(false);
      setNewEvent({
        eventName: '',
        fromDate: null,
        toDate: null,
        userId: '', // Reset userId field
      });
    } catch (error) {
      console.error(error); // Handle error response
      //alert('Failed to add event. Please try again.');
    }
  };


  const handleEvents = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.get(`http://localhost:9001/members/events/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const eventsData = response.data;
      setEvents(eventsData);
      setShowModal1(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9001/members/delete/events/${eventId}`);
      alert('Event deleted successfully.');

      // Refresh the events list
      const userId = parseInt(localStorage.getItem('userId'));
      fetchEvents(userId);
    } catch (error) {
      console.error(error);
      alert('Failed to delete event. Please try again.');
    }
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId'));
        const response = await axios.get(`http://localhost:9001/members/events/user/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const eventsData = response.data;
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);



  const fetchComplaintsSuggestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:9001/sugg/allsugg');
      setComplaintsSuggestions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintsSuggestions();
  }, []);





const renderActionButtons = (item) => {
    if (item.description === 'complaint') {
      if (item.status === 'taken into consideration' || item.status === 'issue resolved' || item.status === 'issue dismissed') {
        return null; // Hide the buttons
      } else {
        return (
          <>
            <button className='btn btn-success' onClick={() => handleStatusUpdate(item.id, 'issue resolved')}>
              <CheckIcon />
            </button>
            <button className='btn btn-danger' onClick={() => handleStatusUpdate(item.id, 'issue dismissed')}>
              <CloseIcon />
            </button>
            <button className='btn btn-primary' onClick={() => handleStatusUpdate(item.id, 'in process')}>
              <CircularProgress />
            </button>
          </>
        );
      }
    } else if (item.description === 'suggestion') {
      if (item.status === 'taken into consideration') {
        return null; // Hide the button
      } else {
        return (
          <button className='btn btn-success' onClick={() => handleStatusUpdate(item.id, 'taken into consideration')}>
            <CheckIcon />
          </button>
        );
      }
    } else {
      return null;
    }
  };
  

  

  const handleStatusUpdate = async (itemId, newStatus) => {
    try {
      await axios.put(`http://localhost:9001/sugg/updatesugg/${itemId}`, { status: newStatus });
      alert('Status updated successfully.');
      fetchComplaintsSuggestions(); // Refresh the data
    } catch (error) {
      console.error(error);
      alert('Failed to update status. Please try again.');
    }
  };
  

  


const navigateToMembersPage = () => {
    navigate('/memberspage');
  };


const handleUpdateProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9001/members/${memberDetails.userId}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      const memberdetails = response.data;
      setModalMemberDetails(memberdetails);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId'));
        const response = await axios.get(`http://localhost:9001/members/${userId}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        const memberdetails = response.data;
        setMemberDetails(memberdetails);
      } catch (error) {
        console.error(error);
        alert("Invalid Credentials!");
      }
    };
    fetchMemberDetails();
  }, []);

//   

//-------------------------------------------------------------------------------------------------------------------------

const [isPollsActive, setIsPollsActive] = useState(false);
const [showTable2, setShowTable2] = useState(false);
const [votingData, setVotingData] = useState([]);

const handleClick7 = () => {
  setShowTable2((prevShowTable) => !prevShowTable);
};

async function handleClick8(event) {
  event.preventDefault();
  
    try{
      const response = await axios.post('http://localhost:9001/polls/addpoll',JSON.stringify(mergedRecord),
      {headers: {'Content-Type': 'application/json'}})
        const member = response.data;
        setIsPollsActive(false);
        alert("Your vote is recorded Successfully!");
    } catch(error){
        alert(error);
    }
};    

const [selectedOptions, setSelectedOptions] = useState({
  president: '',
  secretary: '',
  treasurer: ''
});

const handleSelectChange = (event, role) => {
  const { value, options } = event.target;
  const selectedOption = options[options.selectedIndex];

  setSelectedOptions((prevOptions) => ({
    ...prevOptions,
    [role]: value
  }));

  setVotingData((prevData) => [
    ...prevData,
    {
    [`${role}_id`]: selectedOption.value,
    [`${role}_name`]: selectedOption.text,
    election_id: localStorage.getItem('election_id'),
    voter_id: memberDetails.userId,
    voter_name: memberDetails.firstName + memberDetails.lastName

  }]);
};

const mergedRecord = votingData.reduce((result, record) => {
  Object.entries(record).forEach(([key, value]) => {
    if (value !== '') {
      result[key] = value;
    }
  });
  return result;
}, {});

console.log(mergedRecord);


const renderTable2 = () => {
  if (!showTable2) {
    return null;
  }
  
return (
  <div className='container'>
    <form onSubmit={handleClick8}>
    <table className='table table-striped table-bordered table-hover'>
      <thead>
        <tr style={{ background: 'orange' }}>
          <th>President List</th>
          <th>Secretary List</th>
          <th>Treasurer List</th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td>
            <select
              value={selectedOptions.president}
              onChange={(event) => handleSelectChange(event, 'president')}>

              <option value="" disabled selected> Select President </option>
              
              {presidentRecords.map((contestant, sno) => (<option key={sno} value={contestant.contestant_id}> {contestant.contestant_name}
              
              </option>))}

            </select>
            <p>Member ID: {selectedOptions.president}</p>
          </td>

          <td>
            <select
              value={selectedOptions.secretary}
              onChange={(event) => handleSelectChange(event, 'secretary')}>

              <option value="" disabled selected> Select Secretary </option>

              {secretaryRecords.map((contestant, sno) => (<option key={sno} value={contestant.contestant_id}> {contestant.contestant_name}
              
              </option>))}

            </select>
            <p>Member ID: {selectedOptions.secretary}</p>
          </td>

          <td>
            <select
              value={selectedOptions.treasurer}
              onChange={(event) => handleSelectChange(event, 'treasurer')}>

              <option value="" disabled selected> Select Treasurer </option>

              {treasurerRecords.map((contestant, sno) => (<option key={sno} value={contestant.contestant_id}> {contestant.contestant_name}

              </option>))}

            </select>
            <p>Member ID: {selectedOptions.treasurer}</p>
          </td>

        </tr>
      </tbody>
      </table>
  

    <button class="btn btn-primary" type='submit'><h6>Cast Your Vote</h6></button>
    </form>
  </div>
  );
  }

//---------------------------------------------------------------------------------------------------------------------------

const [isResultsActive, setIsResultsActive] = useState(false);
const [showTable3, setShowTable3] = useState(false);
const [resultsData, setResultsData] = useState([]);

const handleClick9 = () => {
  setShowTable3((prevShowTable) => !prevShowTable);
};

const handleClick11 = () => {

  navigate('/selfupdate', { state: { role: 'committee_member' } });

};

async function handleClick10(event) {
  event.preventDefault();
  const eleid = parseInt(localStorage.getItem('election_id'));
  
    try{
      const response = await axios.get(`http://localhost:9001/results/oneresult/${eleid}`,
      { headers: { 'Content-Type': 'application/json' } });
        const results = response.data;
        setResultsData(results);
        alert("Results Fetched Successfully!");
    } catch(error){
        alert(error);
    }
};    




const renderTable3 = () => {
  if (!showTable3) {
    return null;
  }
  
return (
  <div className='container'>
    <form onSubmit={handleClick10}>
    <table className='table table-striped table-bordered table-hover'>
      <thead>
        <tr style={{ background: 'orange' }}>
          <th>Election ID</th>
          <th>Election Date</th>
          <th>Result ID</th>
          <th>Member ID</th>
          <th>Member Name</th>
          <th>Role</th>
          <th>Candidate Votes</th>
          <th>Total Votes</th>
        </tr>
      </thead>
      <tbody>

          {resultsData.map((data) =>(
            <tr key={data.election_id}>
                <th>{data.election_id}</th>
                <th>{data.election_date}</th>
                <th>{data.result_id}</th>
                <th>{data.member_id}</th>
                <th>{data.member_name}</th>
                <th>{data.role}</th>
                <th>{data.votes}</th>
                <th>{data.total_votes}</th>
              </tr>
                        ))} 

      </tbody>
      </table>
      <button type='submit'><h6>Fetch Results</h6></button>
    </form>
  </div>
  );
  }



  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:9001/notice/all');
        const noticesData = response.data;
        // Sort the notices by date in descending order
        const sortedNotices = noticesData.sort((a, b) => {
          const dateA = new Date(a.dateIssued);
          const dateB = new Date(b.dateIssued);
          return dateB - dateA;
        });
        setNotices(sortedNotices);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchNotices();
  }, []);
  

//----------------------------------------------------------------------------------------------------------------------------




  return (
    <div>
      {isLoggedIn1 ? (
        <>
    <div>
        <nav>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid'>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav mr-auto'>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' id='dropdown-myprofile'>
                    My Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleClick11} >Update Profile</Dropdown.Item>
                    <Dropdown.Item onClick={navigateToMembersPage} >Members</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' id='dropdown-operations'>
                    Operations
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowComplaintsSuggestionsModal(true)}>Complaints/Suggestions</Dropdown.Item>
                    <Dropdown.Item onClick={handleEvents} >Events</Dropdown.Item>
                     <Dropdown.Item  onClick={handleAddNotice}>Add Notice</Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' id='dropdown-pay'>
                    Pay
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    
                    <Dropdown.Item onClick={() => setShowAccountsModal(true)} >Accounts</Dropdown.Item>
                    <Dropdown.Item onClick={fetchAccounts1} >Members Accounts</Dropdown.Item>
                    
                  </Dropdown.Menu>
                  
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' id='dropdown-election'>
                    Election
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* <Dropdown.Item href='#'>Nomination</Dropdown.Item> */}
                    <Dropdown.Item href='#'>Voting</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
              <ul className='navbar-nav'>
                <div className="ms-auto">
                  <li className='nav-item'>
                    <button className='btn btn-danger' onClick={logout}>
                      <LogoutIcon /> Logout
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </nav>
      </div>
      
         
      <MDBContainer fluid className='p-4'>
        
        <MDBRow>
  
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
  
            <h1 className="my-5 display-3 fw-bold ls-tight px-3"> Welcome..</h1> 
            
            <h2 className="blockquote-footer">
            {memberDetails.firstName} {memberDetails.lastName}
          </h2>
                  </MDBCol>
    
    </MDBRow>
   
  </MDBContainer>
          
  <hr></hr><br></br>
  <center>
  <h2 className="my-5 display-3 fw-bold ls-tight px-3 text-primary">
    IMPORTANT NOTICE
  </h2>
</center>
{notices.length > 0 ? (
  <div className="carousel-container">
    <Carousel>
      {notices.map((notice) => (
        <Carousel.Item key={notice.id}>
          <div className="notice-card">
            <h5 className="notice-heading">
              {notice.heading.toUpperCase()}
            </h5>
            <div className="notice-date">Date Issued: {notice.dateIssued}</div>
            <p className="notice-content">{notice.notice}</p>
            
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
) : (
  <center>
    <h3 className="blockquote-footer">No notices available</h3>
  </center>
)}


<br></br><hr></hr>

          

          {isPollsActive ? (
            <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
            <>
            {renderTable2()}
            <div style={{ marginTop: '10px' }}>
            <button class="btn btn-primary" onClick={handleClick7}><h6>{showTable2 ? 'Hide' : 'Cast your Vote'}</h6></button>
            </div>
            </>
            </td>
            </tr>
            </tbody>
            </table>   
            ) : (
            <>
            </>
            ) 
          }

          {isResultsActive ? (
            <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
            <>
            {renderTable3()}
            <div style={{ marginTop: '10px' }}>
            <button class="btn btn-primary" onClick={handleClick9}><h6>{showTable3 ? 'Close' : 'View Results'}</h6></button>
            </div>
            </>
            </td>
            </tr>
            </tbody>
            </table>   
            ) : (
            <>
            </>
            ) 
          }

          {/* Member Details Modal */}
          <Modal show={showModal} dialogClassName="custom-modal" onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Member Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Flat No</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{modalMemberDetails.userId}</td>
                      <td>{modalMemberDetails.firstName}</td>
                      <td>{modalMemberDetails.lastName}</td>
                      <td>{modalMemberDetails.email}</td>
                      <td>{modalMemberDetails.mobileNo}</td>
                      <td>{modalMemberDetails.flatNo}</td>
                      <td>{modalMemberDetails.role}</td>
                      <td>
                        <a className="edit" title="Edit" data-toggle="tooltip">
                          {/* <EditIcon/> */}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/* event Details Modal */}
<Modal show={showModal1} dialogClassName='custom-modal' onHide={() => setShowModal1(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Events</Modal.Title>
    <div class="col-sm-4">
                        <button type="button" onClick={handleAddEvent} class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
                    </div>
  </Modal.Header>
  <Modal.Body>
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Event Id</th>
          <th>Event Name</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Status</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.eventId}>
            <td>{event.eventId}</td>
            <td>{event.eventName}</td>
            <td>{event.fromDate}</td>
            <td>{event.toDate}</td>
            <td>{event.status}</td>
            
            <td>
              
              <Button variant='danger' onClick={() => handleDeleteEvent(event.eventId)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={() => setShowModal1(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

 {/* Add Event Modal */}
 <Modal show={showAddModal} onHide={handleAddEvent}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEventFormSubmit}>
            <Form.Group controlId='eventName'>
              <Form.Label>Event Name</Form.Label>
              <Form.Control type='text' name='eventName' value={newEvent.eventName} onChange={handleEventFormChange} />
            </Form.Group>
            <Form.Group controlId='fromDate'>
              <Form.Label>From Date</Form.Label>
              <br />
              <DatePicker selected={newEvent.fromDate} onChange={handleFromDateChange} />
            </Form.Group>
            <Form.Group controlId='toDate'>
              <Form.Label>To Date</Form.Label>
              <br />
              <DatePicker selected={newEvent.toDate} onChange={handleToDateChange} />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showAccountsModal} dialogClassName="custom-modal" onHide={() => setShowAccountsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Accounts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Maintenance</th>
                  <th>Month</th>
                  <th>Paid On</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Water Bill</th>
                  <th>User ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.maintenanceBill}</td>
                    <td>{account.month}</td>
                    <td>{account.paidOn}</td>
                    <td>{account.status}</td>
                    <td>{account.total}</td>
                    <td>{account.waterBill}</td>
                    <td>{account.userId}</td>
                    <td>
                      {account.status !== 'Paid' && (
                        <Button variant='success' onClick={() => handlePay(account.id)}>
                          Pay
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowAccountsModal(false)}>
              Close
            </Button>
          </Modal.Footer>
          </Modal>

          <Modal show={showComplaintsSuggestionsModal}  dialogClassName='custom-modal' onHide={() => setShowComplaintsSuggestionsModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Complaints/Suggestions</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Message</th>
          <th>UserId</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {complaintsSuggestions.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.description}</td>
            <td>{item.message}</td>
            <td>{item.userId}</td>
            <td>{item.status}</td>
            <td>{renderActionButtons(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={() => setShowComplaintsSuggestionsModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

 {/* Remainders Modal */}
 <Modal show={showRemaindersModal} onHide={() => setShowRemaindersModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remainders</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderRemainderTable()}</Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => setShowAddRemainderModal(true)}>Add New</Button>
    <Button variant="secondary" onClick={() => setShowRemaindersModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSendRemainders}>
            Send Remainders
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Remainder Modal */}
      <Modal show={showAddRemainderModal} onHide={() => setShowAddRemainderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Remainder</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderAddRemainderForm()}</Modal.Body>
      </Modal>



      <Modal show={showAddNoticeModal} onHide={() => setShowAddNoticeModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add Notice</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleNoticeFormSubmit}>
      <div className="mb-3">
        <label htmlFor="notice-heading" className="form-label">Heading</label>
        <input type="text" className="form-control" id="notice-heading" name="noticeHeading" value={noticeHeading} onChange={handleNoticeFormChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="notice-content" className="form-label">Notice</label>
        <textarea className="form-control" id="notice-content" name="noticeContent" value={noticeContent} onChange={handleNoticeFormChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </Modal.Body>
</Modal>


<Modal show={showAccountsModal1} dialogClassName="custom-modal" onHide={() => setShowAccountsModal1(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Accounts</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Maintenance</th>
          <th>Month</th>
          <th>Paid On</th>
          <th>Status</th>
          <th>Total</th>
          <th>Water Bill</th>
          <th>User ID</th>
          
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.maintenanceBill}</td>
            <td>{account.month}</td>
            <td>{account.paidOn}</td>
            <td>{account.status}</td>
            <td>{account.total}</td>
            <td>{account.waterBill}</td>
            <td>{account.userId}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={() => setShowAccountsModal1(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


        </>
      ) : (
        <div>
          <h1>You are Logged out!.</h1>
          <button  className='btn btn-primary btn-block'><h3>LogIn as Member</h3></button><br/>
          <button className='link-btn'><h5>go back to main page</h5></button>
          
        </div>
      )}
      
      </div>
    
  );
}