import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadImage } from "../utils/uploadImage";
import { API_URL } from "../../config";

export default function BrandsModal({ onAdded }) {
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [BrandName, setBrandName] = useState("");
  const [BrandDescription, setBrandDescription] = useState("");
  const [BrandImage, setBrandImage] = useState(null);

  const handleClose = () => setShow(false);

  const AddBrand = async (e) => {
    e.preventDefault();
    if (!BrandName.trim() || !BrandImage) {
      Swal.fire({ title: "Enter a brand name and select an image", icon: "info" });
      return;
    }

    setSaving(true);
    try {
      const url = await uploadImage(BrandImage);
      await axios.post(`${API_URL}/api/brands/addBrands`, {
        BrandName: BrandName.trim(),
        BrandImage: url,
        BrandDescription,
      });
      setBrandName("");
      setBrandDescription("");
      setBrandImage(null);
      handleClose();
      if (onAdded) onAdded();
    } catch (err) {
      Swal.fire({
        title: "Could not add brand",
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
        Add Brand
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddBrand}>
            <Form.Group className="mb-3" controlId="BrandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                value={BrandName}
                onChange={(e) => setBrandName(e.target.value)}
                type="text"
                placeholder="Enter Brand Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="BrandDescription">
              <Form.Label>Description (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={BrandDescription}
                onChange={(e) => setBrandDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="BrandFile" className="mb-3">
              <Form.Label>Brand Image</Form.Label>
              <Form.Control
                onChange={(e) => setBrandImage(e.target.files[0])}
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
