import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { API_URL } from "../../config";

export default function Products() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/products/products`, {
        params: categoryName ? { category: categoryName } : {},
      })
      .then((response) => setProducts(response.data.Products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  return (
    <>
      <div>
        <h1 className="head mx-5 my-5 py-5 px-5">
          {categoryName ? categoryName : "Products"}
        </h1>
        <div className="container">
          <div className="row">
            {loading ? (
              <p>Loading...</p>
            ) : Array.isArray(products) && products.length > 0 ? (
              products.map((val) => (
                <Card
                  className="procard col-2 m-2"
                  key={val._id}
                  style={{ width: "18rem" }}
                >
                  <Card.Img
                    className="image-container mt-2"
                    variant="top"
                    src={val.ProductsImage}
                    alt={val.ProductsName}
                  />
                  <Card.Body>
                    <Card.Title>
                      {val.ProductsName} {val.ProductsPrice}$
                    </Card.Title>
                    <Card.Text>{val.ProductsDescription}</Card.Text>
                    <Link className="btn btn-dark" to={`/product/${val._id}`}>
                      More Details
                    </Link>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>
                <p>No products{categoryName ? " in this category" : ""}.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
