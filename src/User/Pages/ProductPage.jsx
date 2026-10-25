import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { API_URL } from "../../config";

// small star display / picker (no extra package needed)
function Stars({ value = 0, onChange, size = 24 }) {
  return (
    <span style={{ fontSize: size, color: "#ffd700", whiteSpace: "nowrap" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          role={onChange ? "button" : undefined}
          style={{ cursor: onChange ? "pointer" : "default" }}
          onClick={onChange ? () => onChange(n) : undefined}
        >
          {n <= Math.round(Number(value) || 0) ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

export default function ProductPage() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | missing
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [ratingStar, setRatingStar] = useState(0);

  useEffect(() => {
    setStatus("loading");
    axios
      .get(`${API_URL}/api/products/product/${productID}`)
      .then((json) => {
        setProduct(json.data.product);
        setStatus("ok");
      })
      .catch(() => setStatus("missing"));
  }, [productID]);

  if (status === "loading") {
    return <div className="container mt-5">Loading...</div>;
  }
  if (status === "missing" || !product) {
    return (
      <div className="container mt-5">
        <h2 className="brand-font">Product not found</h2>
        <Link to="/Products">Back to products</Link>
      </div>
    );
  }

  const unitPrice = Number(product.ProductsPrice) || 0;

  const addToCart = () => {
    Swal.fire({
      title: "Added to Cart!",
      text: `${quantity} x ${product.ProductsName} ($${(
        unitPrice * quantity
      ).toFixed(2)})`,
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });
  };

  const submitReview = () => {
    if (!review.trim() || ratingStar === 0) {
      Swal.fire({
        title: "Almost there",
        text: "Please add a comment and a star rating.",
        icon: "info",
      });
      return;
    }
    Swal.fire({
      title: "Successfully Submitted!",
      text: "Thanks for reviewing our product",
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });
    setReview("");
    setRatingStar(0);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <img
            src={product.ProductsImage}
            alt={product.ProductsName}
            style={{ objectFit: "contain", width: "100%", height: "45vh" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <h1 className="brand-font">{product.ProductsName}</h1>
          <h4>{product.ProductsPrice}$</h4>
          {product.ProductsBrand && (
            <h6 className="text-secondary">Brand: {product.ProductsBrand}</h6>
          )}
          {product.ProductsCategories && (
            <h6 className="text-secondary">
              Category: {product.ProductsCategories}
            </h6>
          )}
          <p className="text-secondary">{product.ProductsDescription}</p>
          <Stars value={product.ProductsRatings} size={25} />

          <div className="my-3">
            <Button
              className="btn mx-3"
              variant="dark"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => q - 1)}
            >
              -
            </Button>
            {quantity}
            <Button
              className="btn mx-3"
              variant="dark"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </Button>
          </div>
          <Button className="d-block" variant="outline-dark" onClick={addToCart}>
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="row mt-5">
        <h2 className="brand-font">Reviews</h2>
        <div className="col-12 col-md-6">
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: 100 }}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <label htmlFor="floatingTextarea2">Comments</label>
          </div>
          <Button className="my-3 btn btn-dark" onClick={submitReview}>
            Submit review
          </Button>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <Stars value={ratingStar} onChange={setRatingStar} />
            <span className="ms-3">({ratingStar})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
