import axios from "axios";
import { useEffect, useState } from "react";
import { BsCartDash } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { API_URL } from "../../config";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/products`)
      .then((response) => setProducts(response.data.Products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="p-3 my-0 " id="bg-brand">
        <span className="fs-4 fw-bold ">Home</span>
      </div>
      <div className="container">
        <div className="my-3 mx-5 px-5">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className="center" key={product._id}>
                <div className="card cardProducts">
                  <div className="m-2">
                    <div className="d-flex justify-content-between">
                      <h3>{product.ProductsName}</h3>
                      <div>
                        <button className="btn mx-2" type="button">
                          <BsCartDash size={20} />
                        </button>
                      </div>
                    </div>
                    <span className="fs-0 text-muted">
                      {product.ProductsBrand}
                    </span>
                    <hr />
                    <div className="m-3">
                      <img
                        className=" productImage mr-3 rounded"
                        src={product.ProductsImage}
                        alt={product.ProductsName}
                      />
                    </div>
                    <button className="btn" type="button">
                      <AiOutlineHeart size={25} />
                    </button>
                    <span className="d-flex text-muted">
                      {product.ProductsCategories}
                    </span>
                    <p>{product.ProductsDescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
}
