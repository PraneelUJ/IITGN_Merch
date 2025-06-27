import { Link } from "react-router-dom";

// Accept login and setLogin as props (correct way)
export default function LandingPage({ login, setLogin,user,setuser }) {
  const featuredClubs = ["Amalthea", "Blithchron", "TEDxIITGN"];

  if (login == 0) {
    return (
      <>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>MERCH-IITGn</h1>
          <h2>Official IIT Gandhinagar Merchandise Store</h2>
          <p>
            Welcome! Browse and order your favorite merchandise from IITGN clubs
            and events.
          </p>

          <h3>Featured Clubs</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {featuredClubs.map((club, index) => (
              <li
                key={index}
                style={{
                  margin: "10px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {club}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="name">
          <h2 style={{ textAlign: "center", padding: "10px" }}>Welcome {user}</h2>
        </div>

        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>MERCH-IITGn</h1>
          <h2>Official IIT Gandhinagar Merchandise Store</h2>
          <p>
            Welcome! Browse and order your favorite merchandise from IITGN clubs
            and events.
          </p>

          <h3>Featured Clubs</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {featuredClubs.map((club, index) => (
              <li
                key={index}
                style={{
                  margin: "10px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {club}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
