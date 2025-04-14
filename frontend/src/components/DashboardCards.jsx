import { useState } from "react";
import Analytics from "./Analytics";
import Charts from "./Charts";


const DashboardCards = () => {
    const [card, setCard] = useState("analytics");

    return <div className="my-6">
        <div className="mx-8 my-2 p-1 bg-gray-100 w-fit rounded text-gray-500">
            <button
                onClick={() => setCard("analytics")}
                className={`py-1 px-3 rounded ${
                    card === "analytics" ? "bg-white text-black" : "text-gray-500"
                }`}
                
            >
                Analytics
            </button>
            <button
                onClick={() => setCard("charts")}
                className={`py-1 px-3 rounded ${
                    card === "charts" ? "bg-white text-black" : "text-gray-500"
                }`}
            >
                Charts
            </button>
        </div>
        <div>
            { card === "analytics" ? <Analytics /> : <Charts /> }
        </div>
    </div>
}

export default DashboardCards;