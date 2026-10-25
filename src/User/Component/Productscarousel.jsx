import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

export default function Productscarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/products`)
      .then((response) => {
        setProducts(response.data.Products);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="dark">
      <div className="container buffer ">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Carousel
            interval={null}
            indicators={false}
            style={{ width: "100%", height: "80vh" }}
          >
            {Array.isArray(products) && products.length > 0 ? (
              products.map((val) => (
                <Carousel.Item key={val._id}>
                  <div className="container" style={{ color: "white" }}>
                    <Card
                      style={{
                        color: "white",
                        backgroundColor: "#2b3035",
                        border: "none",
                      }}
                    >
                      <div className="row mt-5">
                        <div className="col-12 col-md-6">
                          <Card.Img
                            variant="top"
                            className="thumb img-fluid image-container"
                            src={val.ProductsImage}
                            alt={val.ProductsName}
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "200px",
                            }}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <Card.Body>
                            <h1
                              className="brand-font"
                              style={{ color: "white" }}
                            >
                              {val.ProductsName}
                            </h1>
                            <h4>{val.ProductsPrice}$</h4>
                            {val.ProductsBrand && (
                              <h6 className="text-secondary">
                                Brand: {val.ProductsBrand}
                              </h6>
                            )}
                            <p className="text-secondary">
                              {val.ProductsDescription}
                            </p>
                            <Link
                              className="btn btn-light"
                              to={`/product/${val._id}`}
                            >
                              Shop Now
                            </Link>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Carousel.Item>
              ))
            ) : (
              <div>
                <p>No products available.</p>
              </div>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
}
