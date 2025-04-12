import Analytics from "../components/Analytics";
import Shortener from "../components/Shortener"

const Dashboard = () => {
    return <>
        <div className="">
            <Shortener  />
            <Analytics />
        </div>
    </>
}

export default Dashboard;