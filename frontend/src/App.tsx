import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
