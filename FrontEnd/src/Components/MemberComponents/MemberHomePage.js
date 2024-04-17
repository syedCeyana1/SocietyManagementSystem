import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Dropdown, Form, Modal, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
// import { Pie } from 'react-chartjs-2';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import PaymentsIcon from '@mui/icons-material/Payments';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cell, Pie, PieChart } from 'recharts';
  


export const MemberHomePage = () => {
  const [memberDetails, setMemberDetails] = useState({});
  const [isLoggedIn1, setIsLoggedIn1] = useState(false);
  const [contestantaDetails, setContestantaDetails] = useState([]);

  const [presidentRecords, setPresidentRecords] = useState([]);
  const [secretaryRecords, setSecretaryRecords] = useState([]);
  const [treasurerRecords, setTreasurerRecords] = useState([]);
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
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMemberDetails, setModalMemberDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    fromDate: null,
    toDate: null,
  });
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintData, setComplaintData] = useState({
    description: '',
    message: '', 
  });
  const [accounts, setAccounts] = useState([]);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [notices, setNotices] = useState([]);


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
    //navigate('/');
  };

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


  const handleComplaintModalOpen = () => {
    setShowComplaintModal(true);
  };

  const handleComplaintModalClose = () => {
    setShowComplaintModal(false);
    setComplaintData({
      description: '',
      message: '',
    });
  };

  const handleComplaintFormChange = (e) => {
    setComplaintData({
      ...complaintData,
      [e.target.name]: e.target.value,
    });
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
  const handleComplaintFormSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!complaintData.description || !complaintData.message) {
      alert('Please fill out all fields.');
      return;
    }

    // Make a POST request to add the complaint/suggestion
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.post('http://localhost:9001/sugg/addsugg', {
        ...complaintData,
        userId: userId,
      });
      if(complaintData.description="suggestion")
      {alert("suggestion sent ")}
      else{alert("complaint sent")}
      console.log(response.data); // Handle success response

      // Close the complaint modal and reset the form
      handleComplaintModalClose();
    } catch (error) {
      console.error(error); // Handle error response
      alert('Failed to add complaint/suggestion. Please try again.');
    }
  };

  





const handleEventFormSubmit = async (e) => {
  e.preventDefault();

  // Perform form validation
  if (!newEvent.eventName || !newEvent.fromDate || !newEvent.toDate) {
    toast.error('Please fill out all fields.');
    return;
  }

  const fromDate = moment(newEvent.fromDate).tz('Asia/Kolkata').toDate();
  const toDate = moment(newEvent.toDate).tz('Asia/Kolkata').toDate();

  // Check if the dates and times are valid
  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    alert('Invalid date or time.');
    return;
  }

  // Check if the fromDate is before toDate
  if (fromDate >= toDate) {
    alert('The start time should be before the end time.');
    return;
  }

  // Check if the dates and times are in the past
  const currentDate = new Date();
  if (fromDate < currentDate || toDate < currentDate) {
    alert('Please select valid dates.');
    return;
  }

  // Check if the dates and times are already booked
  for (const event of events) {
    const eventFromDateTime = moment(event.fromDate).tz('Asia/Kolkata').toDate();
    const eventToDateTime = moment(event.toDate).tz('Asia/Kolkata').toDate();

    if (
      eventFromDateTime.toDateString() === fromDate.toDateString() &&
      (
        (fromDate >= eventFromDateTime && fromDate < eventToDateTime) ||
        (toDate > eventFromDateTime && toDate <= eventToDateTime) ||
        (fromDate <= eventFromDateTime && toDate >= eventToDateTime)
      )
    ) {
      alert('The selected dates and times conflict with an existing event.');
      return;
    }
  }

  // Set the userId to the current logged-in user's userId
  const userId = parseInt(localStorage.getItem('userId'));
  if (!userId || isNaN(userId)) {
    alert('User ID not found. Please log in again.');
    return;
  }

  // Make a POST request to the backend API to add the new event
  try {
    const response = await axios.post('http://localhost:9001/members/events/add', {
      ...newEvent,
      userId,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
    });

    toast.success('Event Added Successfully');
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
    toast.error('Error adding the event. Please try again.');
  }
};









 

  const handleClick2 = () => {

    navigate('/selfupdate', { state: { role: 'resident' } });

  };

  const handleClick3 = () => {
    navigate('/memberloginpage');
  };

  const handleClick4 = () => {
    navigate('/');
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
        const response = await axios.get(`http://localhost:9001/members/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const memberdetails = response.data;
        setMemberDetails(memberdetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemberDetails();
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

  const renderTable = () => {
    if (!showTable) {
      return null;
    }
  };

  //------------------------------------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState();
  const [isNominationsActive, setIsNominationsActive] = useState(false);
  const [showTable1, setShowTable1] = useState(false);
  const [pollsData, setPollsData] = useState({
    election_id: localStorage.getItem('election_id'),
    contestant_id: memberDetails.userId,
    contestant_name: memberDetails.firstName + memberDetails.lastName,
    role: selectedTab
  });
  
  useEffect(() => {
    const updatePollsData = () => {
      setPollsData({
        election_id: localStorage.getItem('election_id'),
        contestant_id: memberDetails.userId,
        contestant_name: memberDetails.firstName + memberDetails.lastName,
        role: selectedTab
      });
    };
  
    updatePollsData();
  }, [memberDetails, selectedTab]);
  

  useEffect(() => {
    const checkNominationStatus = () => {
      const isNomination = localStorage.getItem('OpenNomination') === 'true';
      setIsNominationsActive(isNomination);
    };
    checkNominationStatus();
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleCloseTab = () => {
    setSelectedTab(null);
  };

  const handleClick5 = () => {
    setShowTable1((prevShowTable) => !prevShowTable);
  };

  async function handleClick6(event) {
    event.preventDefault();
    console.log('Selected Role:',selectedTab);
    
      try{
        const response = await axios.post('http://localhost:9001/ballotbox/addballot',JSON.stringify(pollsData),
        {headers: {'Content-Type': 'application/json'}})
          const member = response.data;
          setIsNominationsActive(false);
          alert("Success!");
      } catch(error){
          alert(error);
      }
  };    

  const renderTable1 = () => {
    if (!showTable1) {
      return null;
    }
    return (
      <div className="container">
        <div className="background-template">
          <h1 className="text-center mb-4 mt-4">Contest as:</h1>
          <div className="close-button-wrapper">
            {selectedTab && (
              <button
                className="close-button btn btn-light"
                onClick={handleCloseTab}
              >
                &times;
              </button>
            )}
          </div>
          <form onSubmit={handleClick6}>
            <div className="row">
              <div className="col-lg-4">
                <div
                  className={`card ${selectedTab === 'president' ? 'bg-white' : ''}`}
                  onClick={() => handleTabChange('president')}
                >
                  <div className="card-header d-flex"><b>President</b></div>
                  <div className="card-body">
                    <input
                      type="radio"
                      name="tab"
                      checked={selectedTab === 'president'}
                      onChange={() => handleTabChange('president')}
                    />
                    <span>Select</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className={`card ${selectedTab === 'secretary' ? 'bg-white' : ''}`}
                  onClick={() => handleTabChange('secretary')}
                >
                  <div className="card-header d-flex"><b>Secretary</b></div>
                  <div className="card-body">
                    <input
                      type="radio"
                      name="tab"
                      checked={selectedTab === 'secretary'}
                      onChange={() => handleTabChange('secretary')}
                    />
                    <span>Select</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className={`card ${selectedTab === 'treasurer' ? 'bg-white' : ''}`}
                  onClick={() => handleTabChange('treasurer')}
                >
                  <div className="card-header d-flex"><b>Treasurer</b></div>
                  <div className="card-body">
                    <input
                      type="radio"
                      name="tab"
                      checked={selectedTab === 'treasurer'}
                      onChange={() => handleTabChange('treasurer')}
                    />
                    <span>Select</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <h6>Election ID : {localStorage.getItem('election_id')}</h6>
            <button  class="btn btn-primary"  type="submit"><h6>Nominate</h6></button>
            </div>
          </form>
        </div>
      </div>
    );
  };

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
      <button type='submit'><h6> Results</h6></button>
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


const [showTable4, setShowTable4] = useState(false);
const [contestantsData, setContestantsData] = useState([]);

const hancleDecision = () => {
  setShowTable4((prevShowTable) => !prevShowTable);
};   

const renderPieChart = (role) => {
  const filteredData = contestantsData.filter((data) => data.role === role);
  const data = filteredData.map((data) => ({
    name: data.contestant_name,
    value: data.candidate_votes,
  }));

  if (filteredData.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <p style={{ fontWeight: 'bold', margin: 0 }}>No data available</p>
    </div>
    );
  }

  const colors = ['#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div>
        <PieChart width={440} height={360}>
          <Pie
            dataKey="value"
            data={data}
            fill="#8884d8"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="bottom"
                  
                  style={{ fontWeight: 'bold', fill: ["black"] }}
                >
                  <tspan>{data[index].name}</tspan>
              <tspan x={x} dy={15}>
                votes: {value}
              </tspan>
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
    </div>
  );
};

const [electionId, setElectionId] = useState({

  election_id: ''
});

const [isButtonDisabled, setIsButtonDisabled] = useState(true);

const renderTable4 = () => {
  if (!showTable4) {
    return null;
  }

const handleElectionId = (event) => {

  const { name, value } = event.target;
    setElectionId({ ...electionId, [name]: value });

    // Enable or disable the button based on the input value
    setIsButtonDisabled(value.trim() === '');
}
  

  const handlefetchData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:9001/ballotbox/oneballot/${electionId.election_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const results = response.data;
      setContestantsData(results);
      console.log(contestantsData);
      // alert('Results Fetched Successfully!');
    }catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Invalid Election ID!");
      } else {
          alert("Unknown Eroor!");
      }
    }
  };

  return (
    
    <div>
    <form onSubmit={handlefetchData}><br/>
    {/* <p>No Data Available</p> */}
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
        <form>
          <h4>
            <u style={{ color: 'mediumseagreen' }}>President</u>
          </h4><br/><br/><br/>
          {renderPieChart('president')}
        </form>
      </div>
      <div>
        <form>
          <h4>
            <u style={{ color: 'mediumseagreen' }}>Secretary</u>
          </h4><br/><br/><br/>
          {renderPieChart('secretary')}
        </form>
      </div>
      <div>
        <form >
          <h4>
            <u style={{ color: 'mediumseagreen' }}>Treasurer</u>
          </h4><br/><br/><br/>
          {renderPieChart('treasurer')}
        </form>
        </div>
      </div><br/><br/>
      <input  onChange={handleElectionId} type='number' placeholder='Election ID' id='election_id' name='election_id' required></input><span>  </span>
      <button type='submit' disabled={isButtonDisabled} className={isButtonDisabled ? 'disabled' : ''}> <b>Fetch Results</b></button>
      </form>
      </div>
    
  );
// }
};


//-----------------------------------------------------------------------------------------------------------------------

return (<div className='container mt-4'>
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
                  <AccountBoxIcon/>
                  My Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleClick2}>Update Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleUpdateProfile}>Blank</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant='dark' id='dropdown-operations'>
                  Operations
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleComplaintModalOpen}>Complaints/Suggestions</Dropdown.Item>
                  <Dropdown.Item onClick={handleEvents}>Events</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant='dark' id='dropdown-pay'>
                  <PaymentsIcon/>
                  Pay
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  
                  <Dropdown.Item  onClick={() => setShowAccountsModal(true)}>
                   <AccountBalanceIcon/> Accounts</Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
              {/* <Dropdown>
                <Dropdown.Toggle variant='dark' id='dropdown-election'>
                  Election
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  
                  <Dropdown.Item href='#'>Nomination</Dropdown.Item>
                  <Dropdown.Item href='#'>Voting</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
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
  
            <h1 className="my-5 display-3 fw-bold ls-tight px-3"> Welcome Here..</h1> 
            
            <h2 className="blockquote-footer">
            {memberDetails.firstName} {memberDetails.lastName}
          </h2>
                  </MDBCol>
    
    </MDBRow>
   
  </MDBContainer>

  <hr></hr><br></br>
  <center>
  <h2 className="my-5 display-3 fw-bold ls-tight px-3 text-primary"> NOTICES</h2>
  </center>
  {notices.length > 0 ? (
<div className="carousel-container">
  <Carousel>
    {notices.map((notice) => (
      <Carousel.Item key={notice.id}>
        <div className="notice-card">
          <h5 className="notice-heading">{notice.heading.toUpperCase()}</h5>
          <p className="notice-content">{notice.notice} </p>
          <div className="notice-date">Date Issued: {notice.dateIssued}</div>
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
</div>



) : (
  <center>
  <h3 className=" blockquote-footer "> No notices available </h3>
  </center>
)}


<br></br><hr></hr>
<div>
<table className="table table-bordered">
<tbody>
            <tr>
              <td>
<>
         {renderTable4()}
          <div style={{ marginTop: '10px' }}>
          <center>
          <button className ='btn btn-warning' onClick={hancleDecision}><h6>{showTable4 ? 'Close' : 'Display Results'} </h6></button>
          </center>
          </div>
          </>
          </td>
          </tr>
          </tbody>
          </table>
</div>
          {isNominationsActive ? (
          <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
          <>
          {renderTable1()}
          <div style={{ marginTop: '10px' }}>
          <center>
          <button className='btn btn-warning' onClick={handleClick5}><h6>{showTable1 ? 'Close' : 'Contest in Elections'}</h6></button>
          </center>
          </div> 
          </>
          </td>
          </tr>
          </tbody>
          </table>   
          ) : (
          <div>
          <>
                   {renderTable4()}
                    <div style={{ marginTop: '10px' }}>
                    <button className ='btn btn-info' onClick={hancleDecision}><h6>{showTable4 ? 'Close' : 'Display Results'} </h6></button>
                    </div>
                    </>
          </div>
          ) 
        }

{isPollsActive ? (
          <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
          <>
          {renderTable2()}
          <div style={{ marginTop: '10px' }}>
          <button  class="btn btn-primary" onClick={handleClick7}><h6>{showTable2 ? 'Hide' : 'Cast your Vote'}</h6></button>
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
          <button className='btn btn-primary' onClick={handleClick9}><h6>{showTable3 ? 'Close' : 'View Results'}</h6><VisibilityIcon/></button>
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
                         <EditIcon/> 
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
            {/* <DatePicker selected={newEvent.fromDate} onChange={handleFromDateChange} /> */}
            {/* <TimePicker value={newEvent.dateTimeStart} onChange={handleDateTimeStartChange} /> */}
            <DatePicker
      selected={newEvent.fromDate}
      onChange={(date) => handleFromDateChange(date)}
      showTimeSelect
      dateFormat='Pp'
    />
          </Form.Group>
          <Form.Group controlId='toDate'>
            <Form.Label>To Date</Form.Label>
            <br />
            {/* <DatePicker selected={newEvent.toDate} onChange={handleToDateChange} /> */}
            {/* <TimePicker value={newEvent.dateTimeEnd} onChange={handleDateTimeEndChange} /> */}
            <DatePicker
      selected={newEvent.toDate}
      onChange={(date) => handleToDateChange(date)}
      showTimeSelect
      dateFormat='Pp'
    />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    {/* Complaint/Suggestion Modal */}
    <Modal show={showComplaintModal} onHide={handleComplaintModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Complaints/Suggestions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleComplaintFormSubmit}>
          <Form.Group controlId="complaintDescription">
            <Form.Label>Description</Form.Label>
            <Form.Select
              name="description"
              value={complaintData.description}
              onChange={handleComplaintFormChange}
            >
              <option value="">Select an option</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="complaintMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={complaintData.message}
              onChange={handleComplaintFormChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
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

          <hr />
        </> 
      ) : (
        <div>
           <center>
          <h2 className="my-5 display-3 fw-bold ls-tight px-3 "> You have 
          <span className="text-primary"> LOGOUT</span>
              </h2>
          </center>
          <hr></hr><br></br>
           <center>
          <button className='btn btn-primary' onClick={handleClick4}>
          
          <HomeIcon/>
          </button>
          </center>
        </div>
      )}
    </div>
  
);
};