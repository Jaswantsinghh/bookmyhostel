import "../Styles/Components/Navbar.css";
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const navigateTo = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault;
        localStorage.removeItem("user");
        localStorage.removeItem("room");
        navigateTo('/login');
    }
    return (
        <div className="navbar">
            <a>Book My Hostel</a>
            <div className="navButtons">
                <a href="/single" className={location.pathname === '/single' ? "navButtonActive" : "navButton"}>Single bed rooms</a>
                <a className="navButton" onClick={handleLogout}>Log Out</a>
            </div>
        </div>
    );
}

export default Navbar;