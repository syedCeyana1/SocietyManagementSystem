import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const Elections = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const [selectedDate, setSelectedDate] = useState(null);

  const [openNominationsCompleted, setOpenNominationsCompleted] = useState(false);
  const [closeNominationsCompleted, setCloseNominationsCompleted] = useState(false);
  const [openPollsCompleted, setOpenPollsCompleted] = useState(false);
  const [closePollsCompleted, setClosePollsCompleted] = useState(false);
  const [declareResultsCompleted, setDeclareResultsCompleted] = useState(false);
  const [closeResultsCompleted, setCloseResultsCompleted] = useState(false);
  const[colseAll, setCloseAll] = useState(false);

  const filterDates = (date) => {
    const currentDate = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(currentDate.getDate() + 7);
    return date > nextWeek;
  };

  const handleClick1 = () => {
    if (location.state.role === 'admin') {
      navigate('/adminhomepage');
    } else if (location.state.role === 'committee_member') {
      navigate('/committeemember');
    }
  };

  const handleClick2 = () => {
    if (location.state.role === 'admin') {
      navigate('/adminloginpage');
    } else if (location.state.role === 'committee_member') {
      navigate('/memberloginpage');
    }
  };

  const handleDecision1 = async () => {
    localStorage.setItem('OpenElection', false);
    localStorage.setItem('OpenNomination', true);
    setOpenNominationsCompleted(true);
    window.location.reload();

  };

  const handleDecision2 = async () => {

    localStorage.setItem('OpenNomination', false);
    setCloseNominationsCompleted(true);
    localStorage.setItem('OpenPolls', true);
    const res = handleClick3();
    window.location.reload();
  };

  async function handleClick3() {
    const eleid = localStorage.getItem('election_id');
      try{
        const response = await axios.post('http://localhost:9001/ballotbox/postdata',JSON.stringify(eleid),
        {headers: {'Content-Type': 'application/json'}})
          alert("Nominations Posted into Ballot box Successfully!");
      } catch(error){
          alert(JSON.stringify(error));
      }
  };

  const handleDecision3 = async () => {
    
    localStorage.setItem('EnablePolls', true);
    setOpenPollsCompleted(true);
    localStorage.setItem('OpenPolls', false);
    window.location.reload();
  };

  const handleDecision4 = async () => {
    
    setClosePollsCompleted(true);
    localStorage.setItem('EnablePolls', false);
    localStorage.setItem('OpenResults', true);
    const res1 = handleClick4();
    window.location.reload();
  };

  async function handleClick4() {
    const eleid = localStorage.getItem('election_id');
      try{
        const response = await axios.post('http://localhost:9001/ballotbox/fetchdata',JSON.stringify(eleid),
        {headers: {'Content-Type': 'application/json'}})
          alert("Votes counted and posted into ballot box for each contestant Successfully!");
      } catch(error){
          alert(JSON.stringify(error));
      }
  };

  const handleDecision5 = async () => {
    localStorage.setItem('EnableResults', true);
    localStorage.setItem('OpenResults', false);
    
    setDeclareResultsCompleted(true);
    const res2 = handleClick5();
    window.location.reload();
  };

  async function handleClick5() {
    
    const eleid = localStorage.getItem('election_id');
      try{
        const response = await axios.post(`http://localhost:9001/results/fetchresults/${eleid}`)
          alert("Data Posted into results Successfully!");
      } catch(error){
          alert(JSON.stringify(error));
      }
  };

  const handleDecision6 = async () => {
    localStorage.setItem('EnableResults', false);
    setCloseResultsCompleted(true);
    localStorage.setItem('election_id',null);
  }

  const closeAll = async ()=> {
    localStorage.setItem('OpenElection',false);
    localStorage.setItem('OpenNomination',false);
    localStorage.setItem('OpenPolls',false);
    localStorage.setItem('EnablePolls',false);
    localStorage.setItem('OpenResults',false);
    localStorage.setItem('election_id',null);
    setCloseAll(false);
    alert("All Cleared!");
    window.location.reload();
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const timezoneOffset = new Date().getTimezoneOffset();
      const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset * 60000);
      const formattedDate = adjustedDate.toISOString().split('T')[0];

      const response = await axios.post('http://localhost:9001/elections/createelection',
        { election_date: formattedDate },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const electiondata = response.data;
      localStorage.setItem('election_id',electiondata.election_id);
      localStorage.setItem('OpenElection', true);
      alert('Election Created Successfully!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('An election is already registered on the given date!');
      } else {
        console.error(error);
        alert('An error occurred. Please try again.');
      }
    }
    window.location.reload();
  }

  return (
    <div >
      {isLoggedIn ? (
        <div className='auth-form-container'>
          <form className='register-form'>
            <br />
            <h3 className="my-5 display-3 fw-bold ls-tight px-3"> 
              Election Date
            </h3>
            <hr />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              filterDate={filterDates}
              placeholderText='Select a date'
            />
            <br />
            <button className='btn btn-primary' onClick={handleSubmit}>
              Create Election
            </button>
            <hr />
          </form>

          {localStorage.getItem('OpenElection') === 'true' && !openNominationsCompleted ? (
            <h4>
              <button className='btn btn-primary' onClick={handleDecision1}>Open Nominations</button>
            </h4>
          ) : null}

          {localStorage.getItem('OpenNomination') === 'true' && !closeNominationsCompleted ? (
            <h4>
              <button className='btn btn-danger' onClick={handleDecision2}>Close Nominations</button>
            </h4>
          ) : null}

          {localStorage.getItem('OpenPolls') === 'true' && !openPollsCompleted ? (
            <h4>
              <button className='btn btn-primary' onClick={handleDecision3}>Open Polls</button>
            </h4>
          ) : null}

          {localStorage.getItem('OpenPolls') === 'false' && localStorage.getItem('EnablePolls') === 'true'  && !closePollsCompleted ? (
            <h4>
              <button className='btn btn-danger' onClick={handleDecision4}>Close Polls</button>
            </h4>
          ) : null}

          {localStorage.getItem('OpenResults') === 'true' && !declareResultsCompleted ? (
            <h4>
              <button className='btn btn-primary' onClick={handleDecision5}>Declare Results</button>
            </h4>
          ) : null}

          {localStorage.getItem('OpenResults') === 'false' && localStorage.getItem('EnableResults') === 'true' && !closeResultsCompleted ? (
            <h4>
              <button onClick={handleDecision6}>Close Results</button>
            </h4>
          ) : null}

            <h4>
              <button className='btn btn-primary' onClick={closeAll}>Clear All</button>
            </h4>

          <h4>
            <button className='btn btn-primary' onClick={handleClick1}>
            <KeyboardReturnIcon/> GO BACk
            </button>
          </h4>
        </div>
      ) : (
        <div>
          <h1>
            {location.state.role} logged out!
            <br /> Please Login again to access this page!.
          </h1>
          <button onClick={handleClick2}>LogIn</button>
        </div>
      )}
    </div>
  );
};