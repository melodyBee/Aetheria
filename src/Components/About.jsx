import { useEffect } from "react";
import image2 from "../assets/undraw_internet_on_the_go_re_vben.svg";
import image3 from "../assets/undraw_shopping_bags_n001.svg";
import image4 from "../assets/undraw_discount_d-4-bd.svg";
import image5 from "../assets/undraw_reviews_lp8w.svg";
import image6 from "../assets/undraw_mobile_pay_re_sjb8.svg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: false,
    });
  }, []);
  return (
    <>
      <section className="buffer">
        <h1
          className="brand-font d-flex justify-content-center"
          data-aos="fade-up"
        >
          Why Aetheria is helpful?
        </h1>
        <div className="Outerportion py-5 container">
          <div className="row align-items-center">
            <div className="contents col-12 col-md-6">
              <h1
                className="font-size-36 mb-4 brand-font"
                data-aos="fade-right"
              >
                Convenience
              </h1>
              <p className="font-size-18 mb-0" data-aos="fade-right">
                1. Shop anytime, anywhere, 24/7. <br />
                2. Hassle-free online shopping experience. <br />
                3. No need to visit physical stores. <br />
                4. Time-saving and convenient browsing. <br />
                5. Flexibility to shop at your own pace.
                <br />
              </p>
            </div>
            <div className="image imagecontainer-2 col-12 col-md-6 mr-3">
              <img className="col-12  mr-3" src={image2} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="buffer">
        <div className="Outerportion py-5 container">
          <div className="row align-items-start">
            <div className="image imagecontainer-3 col-6 mr-3">
              <img className="col-12  mr-3" src={image3} alt="" />
            </div>
            <div className="contents col-12 col-md-6">
              <h1 className="font-size-36 mb-4 brand-font" data-aos="fade-left">
                Extensive Product Selection:
              </h1>
              <p className="font-size-18 mb-0" data-aos="fade-left">
                1. Wide range of products available.
                <br />
                2. Diverse selection to suit preferences.
                <br />
                3. Access to niche or specialty items.
                <br />
                4. Multiple brands and options to explore.
                <br />
                5. One-stop-shop for various needs.
                <br />
              </p>
            </div>
            <div className="image imagecontainer-3 col-12 col-md-6 mr-3"></div>
          </div>
        </div>
      </section>
      <section className="buffer">
        <div className="Outerportion py-5 container">
          <div className="row align-items-start">
            <div className="contents col-12 col-md-6">
              <h1
                className="font-size-36 mb-4 brand-font"
                data-aos="fade-right"
              >
                Competitive Pricing:
              </h1>
              <p className="font-size-18 mb-0" data-aos="fade-right">
                1. Affordable prices, great value.
                <br />
                2. Discounts, deals, and promotional offers.
                <br />
                3. Price comparisons for informed decisions.
                <br />
                4. Cost savings compared to traditional shopping.
                <br />
                5. Access to exclusive online discounts.
                <br />
              </p>
            </div>
            <div className="image imagecontainer-4 col-12 col-md-6 mr-3">
              <img
                className="col-12  mr-3 img img-fluid"
                src={image4}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="buffer">
        <div className="Outerportion py-5 container">
          <div className="row align-items-start">
            <div className="image imagecontainer-5 col-12 col-md-6 mr-3">
              <img
                className="col-11 mt-0 mr-3"
                src={image5}
                alt=""
              />
            </div>

            <div className="contents col-12 col-md-6">
              <h1 className="font-size-36 mb-4 brand-font" data-aos="fade-left">
                Customer Reviews and Ratings:
              </h1>
              <p className="font-size-18 mb-0" data-aos="fade-left">
                1. Insights from real customer experiences.
                <br />
                2. Authentic feedback for better decision-making.
                <br />
                3. Trustworthy recommendations from fellow shoppers.
                <br />
                4. Assess product quality and reliability.
                <br />
                5. Evaluate seller credibility and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="buffer">
        <div className="Outerportion py-5 container">
          <div className="row align-items-start">
            <div className="contents col-12 col-md-6">
              <h1
                className="font-size-36 mb-4 brand-font"
                data-aos="fade-right"
              >
                Secure and Convenient Payment Options:
              </h1>
              <p className="font-size-18 mb-0" data-aos="fade-right">
                1. Safe and encrypted online transactions.
                <br />
                2. Multiple payment methods to choose from.
                <br />
                3. Fast and secure checkout process.
                <br />
                4. Convenience of saving payment details.
                <br />
                5. Protection against fraud and unauthorized transactions.
              </p>
            </div>
            <div className="image imagecontainer-6 col-12 col-md-6 mr-3">
              <img className="col-12  mr-3" src={image6} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
