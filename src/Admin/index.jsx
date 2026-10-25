import "./index.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Brands from "./pages/Brands";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Products from "./pages/Products";

export default function Admin() {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row m-0 p-0 ">
        <div
          className="col-md-3 col-3 m-0 p-0 "
          id="bg-brand"
          style={{ height: "100vh" }}
        >
          <Sidebar />
        </div>
        <div className="col-md-9 col-8 m-0 p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category" element={<Category />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
