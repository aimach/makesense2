import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer />
      </div>
    </UserProvider>
  );
}

export default App;
