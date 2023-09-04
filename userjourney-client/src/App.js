import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminRoute from "./PrivateRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UserRoute from "./PrivateRoute/UserRoute";
import Layout from "./components/Layout";
import ActiveAccount from "./components/authentication/ActiveAcount";
import EmailForget from "./components/authentication/Forget";
import ResetPassword from "./components/authentication/Reset";
import SignIn from "./components/authentication/SingIn";
import SignUp from "./components/authentication/SingUp";
import VerifySingIn from "./components/authentication/VerifySingin";
import AdminCredits from "./components/dashboards/admin/Admin";
import AdminProduct from "./components/dashboards/admin/AdminProduct";
import ContactUs from "./components/dashboards/admin/ContactUs";
import Subscribe from "./components/dashboards/admin/Subscribe";
import ViewProject from "./components/dashboards/admin/ViewProject";
import Credits from "./components/dashboards/page/Credits";
import MyUsers from "./components/dashboards/page/MyUsers";
import ProductsDashboard from "./components/dashboards/page/Products";
import Profile from "./components/dashboards/page/Profile";
import Project from "./components/dashboards/page/Project";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Products from "./components/pages/Product";
import useAuthCheck from "./hooks/useAuthCheck";
function App() {
  const authChecked = useAuthCheck();
  if (authChecked) {
    return (
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/singup" element={<SignUp />} />
          <Route path="/forget/email" element={<EmailForget />} />
          <Route path="/password/:token/reset" element={<ResetPassword />} />
          <Route path="/verify/otp" element={<VerifySingIn />} />
          <Route path="/active/otp" element={<ActiveAccount />} />
          <Route path="/contact_us" element={<Contact />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
             <PrivateRoute><Layout /></PrivateRoute>
            }
          > 
            <Route path="project/user_projects" element={<Project />} /> 
            <Route path="profile" element={<Profile />} />
            <Route path="products" element={ <ProductsDashboard />} />
            <Route path="products/:id" element={<ViewProject />} />
            <Route path="my_users" element={<UserRoute> <MyUsers /> </UserRoute>} />
            <Route path="credits/user_credits" element={<UserRoute> <Credits /> </UserRoute>} />
            <Route path="admin/projects" element={<AdminRoute> <AdminCredits /> </AdminRoute>} />
            <Route path="admin/products" element={<AdminRoute><AdminProduct /> </AdminRoute>} />
            <Route path="admin/subscribe" element={<AdminRoute> <Subscribe/> </AdminRoute> } />
            <Route path="admin/contact" element={<AdminRoute> <ContactUs/> </AdminRoute> } />
         

          </Route>

        </Routes>
      </div>
    );
  } else {
    return <h4>Checking Authentication...</h4>;
  }
}

export default App;
