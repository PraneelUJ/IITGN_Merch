import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Buynow({
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
  const navigate = useNavigate();
  const form = useRef();

  function deleteItem() {
    setclub("");
    setimgsrc("");
    setprodname("");
    setquantity("");
    setsize("");
    settotaling("");
    alert("Deleting purchase of product");
    navigate("/userdashboard");
  }
  async function updatestock(name, club, qty) {
    try {
      const ref1 = collection(db, club);
      const q1 = query(ref1, where("name", "==", name));
      const snap1 = await getDocs(q1);

      if (!snap1.empty) {
        const docdata1 = snap1.docs[0];
        const stock1 = docdata1.data().stock || 0;
        const docid1 = docdata1.id;
        const ref2 = doc(db, club, docid1);
        await updateDoc(ref2, { stock: stock1 - qty });

        const ref = collection(db, "products");
        const q2 = query(ref, where("name", "==", name));
        const snap2 = await getDocs(q2);

        if (!snap2.empty) {
          const docdata2 = snap2.docs[0];
          const stock2 = docdata2.data().stock || 0;
          const docid2 = docdata2.id;
          const ref3 = doc(db, "products", docid2);
          await updateDoc(ref3, { stock: stock2 - qty });
        }
      } else {
        console.warn("No such item present");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  }

  // Submit COD order and send confirmation email
  async function cashondelivery() {
    try {
      const data = {
        email: user,
        name: prodname,
        qty: quantity,
        size: size,
        total: totaling,
        imgsrc: imgsrc,
        club: club,
        paymentid: "blank",
        status: "confirm",
        paymentmode: "cod",
      };
      const data2 = {
        email: user,
        name: prodname,
        qty: quantity,
        size: size,
        total: totaling,
        imgsrc: imgsrc,
        paymentid: "blank",
        status: "confirm",
        paymentmode: "cod",
      };

      await addDoc(collection(db, "orders"), data);
      await addDoc(collection(db, club + "orders"), data2);
      updatestock(prodname, club, quantity);
      alert("Order placed !");
      setclub("");
      setimgsrc("");
      setprodname("");
      setquantity("");
      setsize("");
      settotaling("");
      navigate("/userdashboard");
    } catch (error) {
      console.error("Error placing order or sending email:", error);
      alert("Something went wrong while placing your order.");
    }
  }

  function upi() {
    alert("Redirecting you to UPI payment interface");
    navigate("/payment");
  }

  // If user is not logged in
  if (!login) {
    return (
      <div className="centered-message">
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f2f5",
            fontSize: "1.6rem",
            color: "#333",
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            textAlign: "center",
          }}
        >
          Please login to buy items 🙂
        </h3>
      </div>
    );
  }

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={imgsrc}
            alt={prodname}
            className="img-fluid rounded-start"
            style={{
              height: "100%",
              objectFit: "contain",
              padding: "10px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body position-relative">
            <form ref={form}>
              {/* Hidden inputs for emailjs */}
              <input type="hidden" name="user_email" value={user} />
              <input type="hidden" name="product_name" value={prodname} />
              <input type="hidden" name="order_total" value={totaling} />
              <input type="hidden" name="size" value={size} />
              <input type="hidden" name="quantity" value={quantity} />

              <Button
                onClick={deleteItem}
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
              >
                🗑️
              </Button>
              <h5 className="card-title">{prodname}</h5>
              <p className="card-text">Club: {club}</p>
              <p className="card-text">Size: {size}</p>
              <p className="card-text">Quantity: {quantity}</p>
              <h6 className="fw-bold">Grand Total: ₹{Number(totaling || 0)}</h6>
              <h3 className="mt-4">Select Payment Option</h3>
              <div className="d-flex gap-3 mt-3">
                <Button
                  variant="outline-success"
                  size="lg"
                  className="w-50"
                  onClick={cashondelivery} // ✅ now this works
                >
                  💵 Cash On Delivery
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-50"
                  onClick={upi}
                >
                  💳 Online Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
