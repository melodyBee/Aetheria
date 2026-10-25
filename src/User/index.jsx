import Home from "./Pages/HomeUser";
import UserNav from "./Component/UserNav";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import ProductPage from "./Pages/ProductPage";
import Footer from "../Components/Footer";

export default function User() {
  return (
    <>
      <UserNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/products/category/:categoryName" element={<Products />} />
        <Route path="/product/:productID" element={<ProductPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
