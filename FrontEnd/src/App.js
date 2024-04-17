
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AddMember } from './Components/AddMember';
import { AdminHomePage } from './Components/AdminComponents/AdminHomePage';
import { AdminLogin } from './Components/AdminComponents/AdminLogin';
import { DeleteMember } from './Components/DeleteMember';
import { Demo1 } from './Components/Demo1';
import { Elections } from './Components/Elections';
import { ForgotPasswordPage } from './Components/ForgotPasswordPage';
import { CommitteeMemberHomePage } from './Components/MemberComponents/CommitteeMemberHomepage';
import { MemberHomePage } from './Components/MemberComponents/MemberHomePage';
import { MemberLogin } from './Components/MemberComponents/MemberLogin';
import { SelfUpdateMember } from './Components/MemberComponents/SelfUpdateMember';
import { MembersPage } from './Components/MembersPage';
import { UpdateRole } from './Components/UpdateRole';
import { MainHomePage } from './Service/MainHomePage';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/ab' element={<MainHomePage/>}/>
          <Route path='/adminhomepage' element={<AdminHomePage/>}/>
          <Route path='/adminloginpage' element={<AdminLogin/>}/>
          <Route path='/memberloginpage' element={<MemberLogin/>}/>
          <Route path='/committeemember' element={<CommitteeMemberHomePage/>}/>
          <Route path='/memberhomepage' element={<MemberHomePage/>}/>
          
           
          <Route path='/addmember' element={<AddMember/>}/>
          <Route path='/deletemember' element={<DeleteMember/>}/>
          <Route path='/setrole' element={<UpdateRole/>}/>
          <Route path='/memberspage' element={<MembersPage/>}/>
          <Route path='/election' element={<Elections/>}/>
          <Route path='/selfupdate' element={<SelfUpdateMember/>}/>
          <Route path='/forgotpasswordpage' element={<ForgotPasswordPage/>}/>
          <Route path='/' element={<Demo1/>}/>
          
         
        </Routes>

        <ToastContainer />
      </div>
    </Router>
    
  );
}

export default App;
