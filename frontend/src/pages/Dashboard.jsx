import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Shortener from "../components/Shortener"
import Statistics from "../components/Statistics";
import { useNavigate } from "react-router-dom";
import DashboardCards from "../components/DashboardCards";

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token) navigate('/login');
    })
    return <>
        <div className="">
            <NavBar />
            <Statistics />
            <Shortener />
            <DashboardCards />
        </div>
    </>
}

export default Dashboard;