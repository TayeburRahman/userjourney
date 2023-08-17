import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./components/Layout";
import SignIn from "./components/authentication/SingIn";
import SignUp from "./components/authentication/SingUp";
import Leaderboards from "./components/pages/Leaderboards";
import Profile from "./components/pages/Profile";
import Rewards from "./components/pages/Rewards";
import useAuthCheck from "./hooks/useAuthCheck";
function App() {
  const authChecked = useAuthCheck();
  if (authChecked) {
    return (
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
                <Layout />
            }
          > 
            <Route path="leaderboards" element={<Leaderboards />} /> 
            <Route path="rewards" element={<Rewards />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    );
  } else {
    return <h4>Checking Authentication...</h4>;
  }
}

export default App;
