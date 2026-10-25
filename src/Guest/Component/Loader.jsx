import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Loader() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: false,
    });
  }, []);

  return (
    <>
      <div className="Loader">
        <div data-aos="fade-up">
          <h1 className="brand-font">Aetheria</h1>
          <p className="brand-font">
            Where your shopping desires meet limitless possibilities.
          </p>
        </div>
      </div>
    </>
  );
}
