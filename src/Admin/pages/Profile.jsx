import React from "react";
import UserInfo from "../components/UserInfo";

export default function Profile() {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-item-center bg-lightb rounded p-2 my-3">
          <span className="fs-4 fw-bold text-light">Profile</span>
          <button className="btn btn-dark px-5 mx-4">Edit</button>
        </div>
      </div>
      <div className="container ">
        <UserInfo />
      </div>
    </>
  );
}
