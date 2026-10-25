import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadImage } from "../utils/uploadImage";
import { API_URL } from "../../config";

const emptyForm = {
  ProductsName: "",
  ProductsDescription: "",
  ProductsPrice: "",
  ProductsBrand: "",
  ProductsCategories: "",
};

export default function ProductModal({ onAdded }) {
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // load the dropdown options each time the modal opens
  useEffect(() => {
    if (!show) return;
    axios
      .get(`${API_URL}/api/brands/Brands`)
      .then((json) => setBrands(json.data.Brands))
      .catch((err) => console.log(err));
    axios
      .get(`${API_URL}/api/category/get-all-categories`)
      .then((json) => setCategories(json.data.category))
      .catch((err) => console.log(err));
  }, [show]);

  const handleClose = () => setShow(false);
  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const AddProduct = async (e) => {
    e.preventDefault();
    if (
      !form.ProductsName.trim() ||
      !form.ProductsDescription.trim() ||
      form.ProductsPrice === "" ||
      !image
    ) {
      Swal.fire({
        title: "Fill in name, description, price and an image",
        icon: "info",
      });
      return;
    }
    if (isNaN(Number(form.ProductsPrice))) {
      Swal.fire({ title: "Price must be a number", icon: "info" });
      return;
    }

    setSaving(true);
    try {
      const url = await uploadImage(image);
      await axios.post(`${API_URL}/api/products/addProducts`, {
        ...form,
        ProductsName: form.ProductsName.trim(),
        ProductsImage: url,
      });
      setForm(emptyForm);
      setImage(null);
      handleClose();
      if (onAdded) onAdded();
    } catch (err) {
      Swal.fire({
        title: "Could not add product",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button variant="dark" onClick={() => setShow(true)}>
        Add Products
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddProduct}>
            <Form.Group className="mb-3" controlId="ProductsName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                value={form.ProductsName}
                onChange={setField("ProductsName")}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductsDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={form.ProductsDescription}
                onChange={setField("ProductsDescription")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductsPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={form.ProductsPrice}
                onChange={setField("ProductsPrice")}
                type="number"
                min="0"
                step="0.01"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductsBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                value={form.ProductsBrand}
                onChange={setField("ProductsBrand")}
              >
                <option value="">No brand</option>
                {brands.map((b) => (
                  <option key={b._id} value={b.BrandName}>
                    {b.BrandName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProductsCategories">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={form.ProductsCategories}
                onChange={setField("ProductsCategories")}
              >
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.CategoryName}>
                    {c.CategoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="ProductsImage" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Form.Group>
            <Button variant="dark" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
