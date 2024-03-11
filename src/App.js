import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import FormAddProduct from "./components/FormAddProduct";
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import SideBar from "./layout/SideBar";
import TestRedux1 from "./components/TestRedux1";
import TestRedux2 from "./components/TestRedux2";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <>
        <CssBaseline />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <div className="app">
          <SideBar />
          <main className="content">
            <HeaderBar />
            <div className="content_body">
              <Box m="20px">
                <Routes>
                  <Route
                    path="/admin/tableproducts"
                    element={<FormProduct />}
                  />
                  <Route path="/add" element={<FormAddProduct />} />
                  <Route path="/edit/:id" element={<FormEditProduct />} />
                </Routes>
              </Box>
            </div>
          </main>
        </div>
        {/* <TestRedux1 />
      <hr/>
      <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
