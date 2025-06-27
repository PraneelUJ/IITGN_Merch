import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Userdashboard({
  user,
  setuser,
  login,
  setlogin,
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
}) {
  const [showcart, setshowcart] = useState(false);
  const [showorder, setorder] = useState(false);
  const [showprev, setprev] = useState(false);
  const [showprofile, setprofile] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setorders] = useState([]);
  const navigate = useNavigate();

  async function deleteitem(id) {
    try {
      const itemre = doc(db, "cart", id);
      await deleteDoc(itemre);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  async function buynow(club, imgsrc, prodname, quantity, size, totaling) {
    setclub(club);
    setimgsrc(imgsrc);
    setprodname(prodname);
    setquantity(quantity);
    setsize(size);
    settotaling(totaling);
    navigate("/buynow");
    console.log(club, imgsrc, prodname, quantity, size, totaling);
  }

  useEffect(() => {
    async function fetchItems() {
      try {
        const ref = collection(db, "cart");
        const q = query(ref, where("email", "==", user));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const fetchedItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(fetchedItems);

          const sum = fetchedItems.reduce(
            (acc, item) => acc + Number(item.total || 0),
            0
          );
          setTotal(sum);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      }
    }

    if (user) {
      fetchItems();
    }
  }, [user]);
  //////////////////////////
  useEffect(() => {
    async function fetchorders() {
      try {
        const ref = collection(db, "orders");
        const q = query(ref, where("email", "==", user));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const fetchedorders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setorders(fetchedorders);

          const sum = fetchedorders.reduce(
            (acc, item) => acc + Number(item.total || 0),
            0
          );
          setTotal(sum);
        } else {
          setorders([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setorders([]);
      }
    }

    if (user) {
      fetchorders();
    }
  }, [user]);

  const handleshowcart = () => {
    setshowcart((prev) => !prev);
    setorder(false);
    setprev(false);
    setprofile(false);
  };
  const handleshoworder = () => {
    setshowcart(false);
    setorder((prev) => !prev);
    setprev(false);
    setprofile(false);
  };
  const handleshowprev = () => {
    setshowcart(false);
    setorder(false);
    setprev((prev) => !prev);
    setprofile(false);
  };
  // const handleshowprofile = () => {
  //   setshowcart(false);
  //   setorder(false);
  //   setprev(false);
  //   setprofile((prev) => !prev);
  // };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <img
          src="/images/Default.jpg"
          alt="Default img"
          style={{
            border: "4px solid gold",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginBottom: "20px",
            marginTop: "80px",
            transition: "transform 0.3s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Container>
      <div className="d-flex align-items-cenetr justify-content-center">
        <h3>{user}</h3>
      </div>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <Button onClick={handleshowcart}>Cart 🛒</Button>
        <Button onClick={handleshoworder}>Current Orders 🛍</Button>
        <Button onClick={handleshowprev}>Previous Orders 🛍</Button>
        {/* <Button onClick={handleshowprofile}>Update Profile 👽</Button> */}
      </div>
      <div className="row">
        {showcart && (
          <div className="container my-5">
            <h1 className="mb-5 text-center">🛒 Your Cart</h1>

            {items.length === 0 ? (
              <p className="text-center">No items in your cart yet.</p>
            ) : (
              <div className="row">
                <div className="col-md-8">
                  {items.map((item) => (
                    <div key={item.id} className="card mb-4 shadow-sm border-0">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.imgsrc}
                            alt={item.name}
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
                            <Button
                              onClick={() => deleteitem(item.id)}
                              variant="danger"
                              size="sm"
                              className="position-absolute top-0 end-0 m-2"
                            >
                              🗑️
                            </Button>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Club: {item.club}</p>
                            <p className="card-text">Size: {item.size}</p>
                            <p className="card-text">Quantity: {item.qty}</p>
                            <p className="card-text fw-semibold">
                              Item Total: ₹{item.total}
                            </p>
                            <p className="card-text text-muted">
                              Shipping: ₹100
                            </p>
                            <h6 className="fw-bold">
                              Grand Total: ₹{100 + Number(item.total)}
                            </h6>
                            <Button
                              variant="success"
                              className="mt-2"
                              onClick={() =>
                                buynow(
                                  item.club,
                                  item.imgsrc,
                                  item.name,
                                  item.qty,
                                  item.size,
                                  item.total + 100
                                )
                              }
                            >
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-md-4">
                  <div className="card shadow-sm border-0 p-3">
                    <div className="card-body">
                      <h4 className="card-title mb-4 text-center">
                        Order Summary
                      </h4>
                      <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span>₹{total}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Shipping</span>
                        <span>₹100</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>₹{total + 100}</span>
                      </div>
                      <Button variant="primary" className="w-100 mt-3">
                        Buy All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {showorder && (
          <div className="container my-5">
            <h1 className="mb-5 text-center">🛍 Your Orders</h1>

            {items.length === 0 ? (
              <p className="text-center">No items in your cart yet.</p>
            ) : (
              <div className="row">
                <div className="col-md-8">
                  {orders.map((item) => (
                    <div key={item.id} className="card mb-4 shadow-sm border-0">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.imgsrc}
                            alt={item.name}
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
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Size: {item.size}</p>
                            <p className="card-text">Quantity: {item.qty}</p>
                            <p className="card-text fw-semibold">
                              Item Total: ₹{item.total}
                            </p>
                            <p className="card-text text-muted">
                              Shipping: ₹100
                            </p>
                            <h6 className="fw-bold">
                              Grand Total: ₹{100 + Number(item.total)}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {showprev && <div>previous</div>}
        {showprofile && <div>👽</div>}
      </div>
    </>
  );
}
