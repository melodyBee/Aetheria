import React from "react";
import Sign from "../Component/Sign";
import "./SignLog.css";
import LogIn from "../Component/LogIn";

export default function SignLog() {
  return (
    <>
      <div id="section" className="slbg">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-1">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="indecator"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log" />
                <div id="card-3d-wrap" className=" mx-auto">
                  <div id="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 id="slhead" className="mb-4 pb-4">
                            Log In
                          </h4>
                          <LogIn />
                        </div>
                      </div>
                    </div>

                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 id="slhead" className="mb-2 pb-3">
                            Sign Up
                          </h4>
                          <Sign />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
