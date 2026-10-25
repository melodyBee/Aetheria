import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadImage } from "../utils/uploadImage";
import { API_URL } from "../../config";

export default function CategoryModal({ onAdded }) {
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const [CategoryImage, setCategoryImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const AddCategory = async (e) => {
    e.preventDefault();
    if (!CategoryName.trim()) {
      Swal.fire({ title: "Enter a category name", icon: "info" });
      return;
    }
    if (!CategoryImage) {
      Swal.fire({ title: "Select a category image", icon: "info" });
      return;
    }

    setSaving(true);
    try {
      const url = await uploadImage(CategoryImage);
      await axios.post(`${API_URL}/api/category/create-category`, {
        CategoryName: CategoryName.trim(),
        CategoryImage: url,
      });
      setCategoryName("");
      setCategoryImage(null);
      handleClose();
      if (onAdded) onAdded();
    } catch (err) {
      Swal.fire({
        title: "Could not add category",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title> Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddCategory}>
            <Form.Group className="mb-3" controlId="CategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                value={CategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                placeholder="Enter Category Name"
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                onChange={(e) => setCategoryImage(e.target.files[0])}
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
