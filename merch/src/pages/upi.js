import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
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

export default function Upipayment({
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
  const [qrUrl, setupiurl] = useState("");
  const [loading, setLoading] = useState(false);
  const paymentRef = useRef();
  const [msg, setmsg] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const [stock, setstock] = useState(0);
  const [items, setitems] = useState([]);

  useEffect(() => {
    const upiId = "random";
    const name = "random";
    const note = "Learning React UPI";
    const link = `upi://pay?pa=${upiId}&pn=${name}&am=${totaling}&tn=${note}&cu=INR`;
    setupiurl(link);
  }, [totaling]);

  async function deleteitem(id) {
    try {
      const itemre = doc(db, "cart", id);
      await deleteDoc(itemre);
      console.log("deleting item");
    } catch (error) {
      console.log(error);
    }
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

  async function handleSubmit(e) {
    e.preventDefault();
    seterror("");
    setmsg("");
    setLoading(true);
    try {
      const data = {
        email: user,
        name: prodname,
        qty: quantity,
        size: size,
        total: totaling,
        imgsrc: imgsrc,
        club: club,
        paymentid: paymentRef.current.value,
        status: "pending",
        paymentmode: "upi",
      };
      const data2 = {
        email: user,
        name: prodname,
        qty: quantity,
        size: size,
        total: totaling,
        imgsrc: imgsrc,
        paymentid: paymentRef.current.value,
        status: "pending",
        paymentmode: "upi",
      };
      setmsg("Purchase Successfull !!!!!!!!");
      await addDoc(collection(db, "orders"), data);
      await addDoc(collection(db, club + "orders"), data2);
      await deleteitem(ids);
      await updatestock(prodname, club, quantity);
      setclub("");
      setimgsrc("");
      setprodname("");
      setquantity("");
      setsize("");
      settotaling("");
      navigate("/userdashboard");
    } catch (error) {
      seterror("Purchase failed");
    }
    setLoading(false);
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <h3 style={{ fontSize: "14px", marginTop: "8px" }}>
            After scanning, complete the payment and paste the UPI Transaction
            ID below.
          </h3>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {!error && msg && <Alert variant="success">{msg}</Alert>}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h3>UPI Payment</h3>
              <h4>Total Amount: ₹{totaling}</h4>
              {qrUrl && (
                <div
                  style={{
                    display: "inline-block",
                    padding: "16px",
                    background: "#fff",
                  }}
                >
                  <QRCodeCanvas value={qrUrl} size={200} />
                  <p>Scan with any UPI app</p>
                </div>
              )}
            </div>
            <Form.Group id="paymentid">
              <Form.Label>Payment ID</Form.Label>
              <Form.Control type="text" ref={paymentRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
