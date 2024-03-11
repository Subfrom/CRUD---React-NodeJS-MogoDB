import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import FormAddProduct from "./components/FormAddProduct";
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import SideBar from "./layout/SideBar";

function App() {
  return (
    <BrowserRouter>
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <HeaderBar />
          <div className="content_body">
            <Box m="20px">
      <Routes>
        <Route path="/admin/tableproducts" element={ <FormProduct />}/>
        <Route path="/add" element={ <FormAddProduct />}/>
        <Route path="/edit/:id" element={ <FormEditProduct />}/>
      </Routes>
    </Box>
          </div>
        </main>
      </div>
    </>
    </BrowserRouter>
  );
}

export default App;
