import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./components/Layout";
import ActiveAccount from "./components/authentication/ActiveAcount";
import EmailForget from "./components/authentication/Forget";
import ResetPassword from "./components/authentication/Reset";
import SignIn from "./components/authentication/SingIn";
import SignUp from "./components/authentication/SingUp";
import VerifySingIn from "./components/authentication/VerifySingin";
import Profile from "./components/dashboards/page/Profile";
import Project from "./components/dashboards/page/Project";
import Leaderboards from "./components/pages/Leaderboards";
import Rewards from "./components/pages/Rewards";
import useAuthCheck from "./hooks/useAuthCheck";
function App() {
  const authChecked = useAuthCheck();
  if (authChecked) {
    return (
      <div className="App">
        <ToastContainer />
        <Routes>
           <Route path="/login" element={<SignIn />} />
           <Route path="/singup" element={<SignUp />} />
           <Route path="/forward/email" element={<EmailForget />} />
           <Route path="/password/reset" element={<ResetPassword />} />
           <Route path="/verify/otp" element={<VerifySingIn />} /> 
           <Route path="/active/otp" element={<ActiveAccount />} /> 

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
                <Layout />
            }
          > 
            <Route path="leaderboards" element={<Leaderboards />} /> 
            <Route path="project/user_projects" element={<Project />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="profile" element={<Profile />} />
          </Route>
           
        </Routes>
      </div>
    );
  } else {
    return <h4>Checking Authentication...</h4>;
  }
}

export default App;
