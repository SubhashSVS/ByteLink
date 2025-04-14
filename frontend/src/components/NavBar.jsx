import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout();
        navigate('/');
    }
    
    return <div className="flex justify-between py-4 px-8 border border-gray-200 shadow  z-10 sticky top-0 bg-white opacity-100">
        <div className="text-3xl font-extrabold underline decoration-pink-600">ByteLink</div>
        <button 
            className="bg-black text-white text-md font-medium py-2 px-5 rounded cursor-pointer active:bg-gray-700"
            onClick={handleLogout}
        >
            Logout
        </button>
    </div>
}

export default NavBar;