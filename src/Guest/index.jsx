import SignLog from "./Pages/SignLog";
import NavGuest from "./Component/NavGuest";
import Footer from "./Component/Footer";
import HomeGuest from "./Pages/HomeGuest";
import { Route, Routes } from "react-router-dom";

export default function Guest() {
  return (
    <>
      <NavGuest />
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/SignLog" element={<SignLog />} />
        <Route path="*" element={<SignLog />} />
      </Routes>
      <Footer />
    </>
  );
}
