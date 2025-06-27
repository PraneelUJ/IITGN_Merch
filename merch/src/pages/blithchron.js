import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Items() {
  const [items, setItems] = useState([]);
  const [type, settype] = useState("all");

  useEffect(() => {
    async function fetchitems() {
      try {
        const ref = collection(db, "Blithchron");
        const q = type === "all" ? ref : query(ref, where("type", "==", type));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const fetchedorders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(fetchedorders);
          console.log(fetchedorders);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      }
    }

    fetchitems();
  }, [type]);

  const handleChange = (e) => {
    settype(e.target.value);
  };

  return (
    <article>
      <h1>Blithchron Merchandises</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="form-label fw-bold">Select Type of Product</label>
        <select
          className="form-select"
          name="size"
          value={type}
          onChange={handleChange}
          required
        >
          <option value="all">All</option>
          <option value="tshirt">Tshirt</option>
          <option value="cap">Cap</option>
          <option value="hoodies">Hoodies</option>
          <option value="notepad">Notepad</option>
          <option value="penstand">Penstand</option>
        </select>
      </form>
      <ul>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "pink",
              color: "black",
              marginBottom: "40px",
            }}
          >
            <li>
              <img
                src={item.imgsrc}
                alt={item.name}
                style={{
                  border: "4px solid gold",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "10px",
                  transition: "transform 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <p>
                <b>{item.name}</b>
              </p>
              <p>{item.description}</p>
              <h4>Price: {item.price}</h4>
              <Link to={item.link}>
                <button>View Item</button>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </article>
  );
}
