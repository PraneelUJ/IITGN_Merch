import { useState, useEffect } from "react";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function TedxItem1page({
  login,
  setLogin,
  user,
  setuser,
  club,
  imgsrc,
  prodname,
  quantity,
  size,
  totaling,
  setclub,
  setimgsrc,
  setprodname,
  setquantity,
  setsize,
  settotaling,
  ids,
  setids,
}) {
  const [quant, setQuant] = useState(1);
  const [siz, setsiz] = useState("");
  const [item, setItem] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchItem() {
      try {
        const ref = doc(db, "Tedx", "1");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setItem(snap.data());
        } else {
          console.log("No document found.");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }
    fetchItem();
  }, []);

  const price = item?.price || 0;
  const cost = price * quant;

  function toggleImageSize(element) {
    element.classList.toggle("fullsize");
  }
  async function buynow(club, imgsrc, prodname, quantity, size, totaling, id) {
    setclub(club);
    setimgsrc(imgsrc);
    setprodname(prodname);
    setquantity(quantity);
    setsize(size);
    settotaling(totaling);
    setids(id);
    navigate("/buynow");
    console.log(club, imgsrc, prodname, quantity, size, totaling);
  }
  async function addToCart(email, size, qty, total, name, imgsrc, club) {
    try {
      const data = {
        email,
        name,
        qty,
        size,
        total,
        imgsrc,
        club,
      };
      await addDoc(collection(db, "cart"), data);
    } catch (error) {
      console.error("Error adding to cart:", error.code, error.message);
    }
  }

  if (!item) {
    return <div className="text-center my-5">Loading item...</div>;
  }

  return (
    <div className="container my-5">
      <style>
        {`
          .fullsize {
            width: 100% !important;
            max-width: 400px;
            height: 400px !important;
            transition: all 0.3s ease;
            z-index: 10;
            position: relative;
          }
        `}
      </style>

      <div className="text-center">
        <div
          className="mb-4 p-3 rounded"
          style={item.theme || { backgroundColor: "#f8f9fa" }}
        >
          <h1 className="fw-bold">{item.name}</h1>
        </div>

        <img
          src={item.imgsrc}
          alt={item.name}
          className="img-thumbnail shadow"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            cursor: "pointer",
            transition: "transform 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={(e) => toggleImageSize(e.currentTarget)}
        />

        <h4 className="mt-4">View Size Chart</h4>
        <div className="table-responsive d-flex justify-content-center">
          <table className="table table-bordered table-striped w-50 mt-3">
            <thead className="table-dark">
              <tr>
                <th>Waist (in cm)</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>28</td>
                <td>S</td>
              </tr>
              <tr>
                <td>30</td>
                <td>M</td>
              </tr>
              <tr>
                <td>32</td>
                <td>L</td>
              </tr>
              <tr>
                <td>35</td>
                <td>XL</td>
              </tr>
            </tbody>
          </table>
        </div>

        <form className="mt-4">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">Select Size</label>
              <select
                className="form-select"
                value={siz}
                onChange={(e) => setsiz(e.target.value)}
                name="size"
                required
              >
                <option value="">Choose...</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">
                Select Quantity (Max 3)
              </label>
              <select
                className="form-select"
                value={quant}
                onChange={(e) => setQuant(Number(e.target.value))}
                name="qty"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <h4 className="mb-4 text-center">Total Cost: ₹{cost}</h4>

          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={() => {
                if (login === 0) {
                  alert("Please login to buy item.");
                  return;
                }
                buynow(
                  "Amalthea",
                  item.imgsrc,
                  item.name || "Amalthea 2025 Tshirt",
                  quant,
                  siz,
                  cost,
                  item.id
                );
              }}
            >
              Buy Now
            </button>
            <button
              type="button"
              className="btn btn-success px-4"
              onClick={() => {
                if (login === 0) {
                  alert("Please login to add items to cart.");
                  return;
                }
                addToCart(
                  user,
                  siz,
                  quant,
                  cost,
                  item.name || "Amalthea 2025 Tshirt",
                  item.imgsrc,
                  "Amalthea"
                );
              }}
            >
              Add to Cart 🛒
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
