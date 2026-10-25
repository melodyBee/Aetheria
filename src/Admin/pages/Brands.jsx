import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BrandsModal from "../components/BrandsModal";
import { API_URL } from "../../config";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  const load = useCallback(() => {
    axios
      .get(`${API_URL}/api/brands/Brands`)
      .then((json) => setBrands(json.data.Brands))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (brand) => {
    const result = await Swal.fire({
      title: `Delete "${brand.BrandName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`${API_URL}/api/brands/delete-brands/${brand._id}`);
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
        <div className="d-flex justify-content-between align-item-center bg-lightb rounded p-2 my-3">
          <span className="fs-4 fw-bold text-light">Brands</span>
          <BrandsModal onAdded={load} />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Image</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(brands) && brands.length > 0 ? (
              brands.map((brand, index) => (
                <tr key={brand._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{brand.BrandName}</td>
                  <td>
                    <img
                      src={brand.BrandImage}
                      alt={brand.BrandName}
                      style={{ maxWidth: "100px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => remove(brand)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No brands available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
