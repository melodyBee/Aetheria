import { useCallback, useEffect, useState } from "react";
import CategoryModal from "../components/CategoryModal";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const load = useCallback(() => {
    axios
      .get(`${API_URL}/api/category/get-all-categories`)
      .then((json) => setCategories(json.data.category))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (category) => {
    const result = await Swal.fire({
      title: `Delete "${category.CategoryName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`${API_URL}/api/category/delete-category`, {
        data: { _id: category._id },
      });
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
          <span className="fs-4 fw-bold text-light">Categories</span>
          <CategoryModal onAdded={load} />
        </div>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category Name</th>
                <th scope="col">Category Image</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{category.CategoryName}</td>
                    <td>
                      <img
                        src={category.CategoryImage}
                        alt={category.CategoryName}
                        style={{ maxWidth: "100px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => remove(category)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No categories available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
