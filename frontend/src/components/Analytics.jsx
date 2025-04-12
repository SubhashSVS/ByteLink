import { useEffect, useState } from "react";
import Entry from "./Entry";
import axios from "axios";

const Analytics = ()=>{
    const [data, setData] = useState([]);
    const SERVER_API = import.meta.env.VITE_SERVER_API;

    useEffect(() => {
        const fetch = async ()=>{
            const res = await axios.get(`${SERVER_API}/analytics`);
            if(res.data){
                setData(res.data.data);
            }
        }
        fetch();
    }, [data]);

    return <div className="border border-gray-300 rounded-md mx-8 text-gray-500">
        <div className="grid grid-cols-6 px-3 py-3">
            <div className="col-span-2">Original URL</div>
            <div className="col-span-2">Short URL</div>
            <div className="col-span-1">Clicks</div>
            <div className="col-span-1">Created</div>
        </div>
        { data.map(item => <Entry entry={item} key={item.shortUrl} />) }
    </div>
}

export default Analytics;