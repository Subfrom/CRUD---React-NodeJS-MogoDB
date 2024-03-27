import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ResponsiveAppBar from "./layout/ResponsiveAppBar";

// Header
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline } from "@mui/material";

// Sidebar
import SideBar from "./layout/SideBar";

// Admin
import AdminHome from "./components/pages/admin/AdminHome";
import ManageUser from "./components/pages/admin/ManageUser";
import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import FormAddProduct from "./components/FormAddProduct";

// User
import UserHome from "./components/pages/user/UserHome";

// notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Line from "./components/pages/auth/Line";
import Notfound from "./components/pages/Notfound";

// Routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

// function
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import Homepage from "./components/pages/Homepage";
import Profile from "./components/pages/profile/Profile";

// Test Redux
import TestRedux1 from "./components/TestRedux1";
import TestRedux2 from "./components/TestRedux2";


function App() {

  const dispatch = useDispatch();

  const IDToken = localStorage.getItem('token');

  currentUser(IDToken).then((res) => {
    dispatch(login({
      email: res.data.email,
      username: res.data.username,
      role: res.data.role,
      token: IDToken,
    }))
  }).catch((err) => {
    console.log(err);
  })

  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <ToastContainer />

        <Routes>
          <Route
            path="*"
            element={
              <Notfound text="The page you’re looking for doesn’t exist." />
            }
          />

          <Route
            path="/"
            element={
              <>
                <ResponsiveAppBar />
                <Homepage />
              </>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/line" element={<Line />} />

          <Route
            path="/user/index"
            element={
              <UserRoute>
                <UserHome />
              </UserRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <UserRoute>
                <Profile />
              </UserRoute>
            }
          />

          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/manageuser"
            element={
              <AdminRoute>
                <ManageUser />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/tableproducts"
            element={
              <AdminRoute>
                <FormProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/add"
            element={
              <AdminRoute>
                <FormAddProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FormEditProduct />
              </AdminRoute>
            }
          />
        </Routes>
        {/* <TestRedux1 />
      <hr/>
      <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
