import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductModal from "../components/ProductModal";
import { API_URL } from "../../config";

export default function Products() {
  const [products, setProducts] = useState([]);

  const load = useCallback(() => {
    axios
      .get(`${API_URL}/api/products/products`)
      .then((response) => setProducts(response.data.Products))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (product) => {
    const result = await Swal.fire({
      title: `Delete "${product.ProductsName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(
        `${API_URL}/api/products/delete-product/${product._id}`
      );
      load();
    } catch (err) {
      Swal.fire({
        title: "Could not delete",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-item-center rounded bg-lightb p-2 my-3">
          <div className="fs-4 fw-bold text-light">Products</div>
          <ProductModal onAdded={load} />
        </div>
      </div>
      <div className="m-2 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={product.ProductsImage}
                      alt={product.ProductsName}
                      style={{ maxWidth: "60px" }}
                    />
                  </td>
                  <td>{product.ProductsName}</td>
                  <td>{product.ProductsBrand}</td>
                  <td>{product.ProductsCategories}</td>
                  <td>{product.ProductsPrice}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => remove(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
