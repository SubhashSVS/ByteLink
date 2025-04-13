import Analytics from "../components/Analytics";
import NavBar from "../components/NavBar";
import Shortener from "../components/Shortener"
import Statistics from "../components/Statistics";

const Dashboard = () => {
    return <>
        <div className="">
            <NavBar />
            <Statistics />
            <Shortener />
            <Analytics />
        </div>
    </>
}

export default Dashboard;