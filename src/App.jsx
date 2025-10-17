import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import './App.css';
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/authcontext.jsx";



function App() {
  return (


    <>
    <AuthProvider>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
        
    
      </div>

      {/* Footer Section */}
      <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
