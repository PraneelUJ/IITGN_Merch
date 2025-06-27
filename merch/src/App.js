// import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from "react-router-dom";
// import LandingPage from "./pages/landingpage.js";
// import AllItemsPage from "./pages/allitems.js";
// import AmaltheaPage from "./pages/amalthea.js";
// import BlithchronPage from "./pages/blithchron.js";
// import TEDxPage from "./pages/tedx.js";
// import CartPage from "./pages/cart.js";
// import AmaltheamerchPage from "./pages/products/amaltheamerch.js";
// import BlithmerchPage from "./pages/products/blithmerch.js";
// import TedxmerchPage from "./pages/products/tedxmerch.js";
// import { useState } from "react";
// import LoginPage from "./pages/login.js";
// import SignupPage from "./pages/signup.js";
// import { AuthProvider,useAuth } from "./contexts/AuthContext.js";

// import {Card,Button} from 'react-bootstrap'

// export default function App() {
//   const [login, setlogin] = useState(0);
//   const [user,setuser]=useState("");
//   const {curretUser,logout}= useAuth();
//   const [error,setError]=useState("");
//   const navigate = useNavigate();
//   if (!login) {
//     return (
//       <AuthProvider>
//       <Router>
//         <div>
//           <nav>
//             <Link to="/login">Login</Link> | <Link to="/">Home</Link> |{" "}
//             <Link to="/allitems">All Items</Link> |{" "}
//             <Link to="/amalthea">Amalthea</Link> |{" "}
//             <Link to="/blithchron">Blithchron</Link> |{" "}
//             <Link to="/tedx">TedxIITGN</Link>

//           </nav>

//           <Routes>
//             <Route
//               path="/"
//               element={<LandingPage login={login} setlogin={setlogin} user={user} setuser={setuser}  />}
//             />
//             <Route path="/allitems" element={<AllItemsPage />} />
//             <Route path="/amalthea" element={<AmaltheaPage />} />
//             <Route path="/blithchron" element={<BlithchronPage />} />
//             <Route path="/tedx" element={<TEDxPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/amaltheamerch" element={<AmaltheamerchPage login={login} setlogin={setlogin} />} />
//             <Route path="/blithmerch" element={<BlithmerchPage login={login} setlogin={setlogin} />} />
//             <Route path="/tedxmerch" element={<TedxmerchPage login={login} setlogin={setlogin}/>} />
//             <Route path="/signup" element={<LoginPage />} />
//             <Route path="/login" element={<SignupPage login={login} setlogin={setlogin} user={user} setuser={setuser}/>} />
//           </Routes>
//         </div>
//       </Router>
//       </AuthProvider>
//     );
//   } else {
//     async function handleLogout(){
//       setError('')
//       try{
//           await logout()
//           navigate('/login')
//       }
//       catch{

//       }
//     }
//     return (
//       <Router>
//         <div>
//           <nav>
//             <Link to="/">Home</Link> | <Link to="/allitems">All Items</Link> |{" "}
//             <Link to="/amalthea">Amalthea</Link> |{" "}
//             <Link to="/blithchron">Blithchron</Link> |{" "}
//             <Link to="/tedx">TedxIITGN</Link> | <Link to="/cart">🛒</Link>{" "}
//             <Button variant="link" onClick={handleLogout}>Logout</Button>
//           </nav>

//           <Routes>
//             <Route path="/" element={<LandingPage login={login} setlogin={setlogin} user={user} setuser={setuser}/>} />
//             <Route path="/allitems" element={<AllItemsPage />} />
//             <Route path="/amalthea" element={<AmaltheaPage />} />
//             <Route path="/blithchron" element={<BlithchronPage />} />
//             <Route path="/tedx" element={<TEDxPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/amaltheamerch" element={<AmaltheamerchPage />} />
//             <Route path="/blithmerch" element={<BlithmerchPage />} />
//             <Route path="/tedxmerch" element={<TedxmerchPage />} />
//           </Routes>
//         </div>
//       </Router>
//     );
//   }
// }

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import LandingPage from "./pages/landingpage.js";
import AllItemsPage from "./pages/allitems.js";
import AmaltheaPage from "./pages/amalthea.js";
import BlithchronPage from "./pages/blithchron.js";
import TEDxPage from "./pages/tedx.js";
import CartPage from "./pages/cart.js";
import AmaltheamerchPage from "./pages/products/amaltheamerch.js";
import BlithmerchPage from "./pages/products/blithmerch.js";
import TedxmerchPage from "./pages/products/tedxmerch.js";
import LoginPage from "./pages/login.js";
import UserPage from "./pages/userdashboard.js";
import SignupPage from "./pages/signup.js";
import ForgotPassword from "./pages/forgot.js";
import BuyNow from "./pages/buynow.js";
import Upipayment from "./pages/upi.js";
import AuthContext from "./contexts/AuthContext.js";

import { AuthProvider, useAuth } from "./contexts/AuthContext.js";
import { Button, Alert } from "react-bootstrap";

// This is the real component that uses useNavigate
function AppRouter() {
  const [login, setlogin] = useState(0);
  const [user, setuser] = useState("");
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const [imgsrc, setimgsrc] = useState("");
  const [prodname, setprodname] = useState("");
  const [quantity, setquantity] = useState("");
  const [size, setsize] = useState("");
  const [totaling, settotaling] = useState("");
  const [club, setclub] = useState("");
  const [ids,setids]=useState("");

  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      setlogin(0);
      setuser("");
      navigate("/");
    } catch (e) {
      console.error("Logout failed:", e);
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <nav>
        {!login ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/">Home</Link> |{" "}
            <Link to="/allitems">All Items</Link> |{" "}
            <Link to="/amalthea">Amalthea</Link> |{" "}
            <Link to="/blithchron">Blithchron</Link> |{" "}
            <Link to="/tedx">TedxIITGN</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link> | <Link to="/allitems">All Items</Link> |{" "}
            <Link to="/amalthea">Amalthea</Link> |{" "}
            <Link to="/blithchron">Blithchron</Link> |{" "}
            <Link to="/tedx">TedxIITGN</Link> | <Link to="/cart">🛒</Link> |{" "}
            <Link to="/userdashboard">Dashboard</Link> |{" "}
            <Button variant="link" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              login={login}
              setlogin={setlogin}
              user={user}
              setuser={setuser}
            />
          }
        />
        <Route path="/allitems" element={<AllItemsPage />} />
        <Route
          path="/buynow"
          element={
            <BuyNow
              login={login}
              setlogin={setlogin}
              user={user}
              setuser={setuser}
              imgsrc={imgsrc}
              setimgsrc={setimgsrc}
              prodname={prodname}
              setprodname={setprodname}
              quantity={quantity}
              setquantity={setquantity}
              size={size}
              setsize={setsize}
              totaling={totaling}
              settotaling={settotaling}
              club={club}
              setclub={setclub}
              ids={ids}
              setids={setids}
            />
          }
        />
        <Route path="/amalthea" element={<AmaltheaPage />} />
        <Route path="/blithchron" element={<BlithchronPage />} />
        <Route path="/tedx" element={<TEDxPage />} />
        <Route
          path="/payment"
          element={
            <Upipayment
              login={login}
              setlogin={setlogin}
              user={user}
              setuser={setuser}
              imgsrc={imgsrc}
              setimgsrc={setimgsrc}
              prodname={prodname}
              setprodname={setprodname}
              quantity={quantity}
              setquantity={setquantity}
              size={size}
              setsize={setsize}
              totaling={totaling}
              settotaling={settotaling}
              club={club}
              setclub={setclub}
              ids={ids}
              setids={setids}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              user={user}
              setuser={setuser}
              imgsrc={imgsrc}
              setimgsrc={setimgsrc}
              prodname={prodname}
              setprodname={setprodname}
              quantity={quantity}
              setquantity={setquantity}
              size={size}
              setsize={setsize}
              totaling={totaling}
              settotaling={settotaling}
              club={club}
              setclub={setclub}
              ids={ids}
              setids={setids}
            />
          }
        />
        <Route
          path="/amaltheamerch"
          element={
            <AmaltheamerchPage
              user={user}
              setuser={setuser}
              login={login}
              setlogin={setlogin}
              imgsrc={imgsrc}
              setimgsrc={setimgsrc}
              prodname={prodname}
              setprodname={setprodname}
              quantity={quantity}
              setquantity={setquantity}
              size={size}
              setsize={setsize}
              totaling={totaling}
              settotaling={settotaling}
              club={club}
              setclub={setclub}
              ids={ids}
              setids={setids}
            />
          }
        />
        <Route
          path="/blithmerch"
          element={
            <BlithmerchPage
              user={user}
              setuser={setuser}
              login={login}
              setlogin={setlogin}
              imgsrc={imgsrc}
              setimgsrc={setimgsrc}
              prodname={prodname}
              setprodname={setprodname}
              quantity={quantity}
              setquantity={setquantity}
              size={size}
              setsize={setsize}
              totaling={totaling}
              settotaling={settotaling}
              club={club}
              setclub={setclub}
              ids={ids}
              setids={setids}
            />
          }
        />
        <Route
          path="/tedxmerch"
          element={
            <TedxmerchPage
              user={user}
              setuser={setuser}
              login={login}
              setlogin={setlogin}
              imgsrc={imgsrc}
              setimgsrc={setimgsrc}
              prodname={prodname}
              setprodname={setprodname}
              quantity={quantity}
              setquantity={setquantity}
              size={size}
              setsize={setsize}
              totaling={totaling}
              settotaling={settotaling}
              club={club}
              setclub={setclub}
              ids={ids}
              setids={setids}
            />
          }
        />
        <Route
          path="/userdashboard"
          element={
            <UserPage
              user={user}
              setuser={setuser}
              login={login}
              setlogin={setlogin}
              imgsrc={imgsrc}
              setimgsrc={setimgsrc}
              prodname={prodname}
              setprodname={setprodname}
              quantity={quantity}
              setquantity={setquantity}
              size={size}
              setsize={setsize}
              totaling={totaling}
              settotaling={settotaling}
              club={club}
              setclub={setclub}
              ids={ids}
              setids={setids}
            />
          }
        />

        <Route
          path="/login"
          element={
            <SignupPage
              login={login}
              setlogin={setlogin}
              user={user}
              setuser={setuser}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <LoginPage
              login={login}
              setlogin={setlogin}
              user={user}
              setuser={setuser}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword login={login} setlogin={setlogin} />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}
