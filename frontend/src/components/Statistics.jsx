import { useEffect, useState } from "react"
import axios from "axios"
import useAnalytics from "../hooks/useAnalytics";

const Statistics = ()=>{
    const [links,setLinks] = useState(0);
    const [clicks,setClicks] = useState(0);
    const [active,setActive] = useState(links);
    const SERVER_API = import.meta.env.VITE_SERVER_API;
    const { refresh } = useAnalytics();

    useEffect(() => {
        const fetch = async ()=>{
            const res = await axios.get(`${SERVER_API}/stats`);
            if(res.data){
                setLinks(res.data.links);
                setClicks(res.data.clicks);
                setActive(res.data.active);
            }            
        }
        fetch();
    },[refresh])

    return <div className="flex mx-8 mt-4 justify-between space-x-4">
        <div className="flex-col space-y-2 py-4 px-8 border border-gray-200 rounded-lg w-full shadow-xs">
            <div className="text-md">Total Links</div>
            <div className="font-bold text-2xl">{links}</div>
        </div>
        <div className="flex-col space-y-2 py-4 px-8 border border-gray-200 rounded-md w-full shadow-xs">
            <div className="text-md">Total Clicks</div>
            <div className="font-bold text-2xl">{clicks}</div>
        </div>
        <div className="flex-col space-y-2 py-4 px-8 border border-gray-200 rounded-md w-full shadow-xs">
            <div className="text-md">Active Links</div>
            <div className="font-bold text-2xl">{active}</div>
        </div>
    </div>
}

export default Statistics;