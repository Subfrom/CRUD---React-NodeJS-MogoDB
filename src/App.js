import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import FormAddProduct from "./components/FormAddProduct";
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import SideBar from "./layout/SideBar";
import TestRedux1 from "./components/TestRedux1";
import TestRedux2 from "./components/TestRedux2";
import Notfound from "./components/pages/Notfound";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";

// notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Line from "./components/pages/auth/Line";

// Routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

// Admin
import AdminHome from "./components/pages/admin/AdminHome";
import ManageUser from "./components/pages/admin/ManageUser";

// User
import UserHome from "./components/pages/user/UserHome";

// function
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const IDToken = localStorage.getItem('token');
  currentUser(IDToken).then(res => {
    // console.log(res.data);
    dispatch(login({
      username: res.data.username,
      email: res.data.email,
      role: res.data.role,
      token: IDToken
    }));
  }
  ).catch(err => {
    console.log(err);
  });
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
              <h1>Home Page</h1>
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
