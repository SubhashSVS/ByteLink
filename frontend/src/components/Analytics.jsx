import { useEffect, useState } from "react";
import Entry from "./Entry";
import axios from "axios";
import useAnalytics from "../hooks/useAnalytics";



const Analytics = ()=>{
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 5;
    const SERVER_API = import.meta.env.VITE_SERVER_API;
    const { refresh } = useAnalytics();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${SERVER_API}/analytics?page=${page}&limit=${limit}&filter=${filter}`);
            setData(res.data.data);
            setTotalPages(res.data.totalPages);
        };
        fetchData();
    },[refresh,page,filter]);

    return (
        <div>
            <div>
                <input 
                    placeholder="Search links..."
                    className="border border-gray-200 rounded-md p-2 mx-8 mt-2 "
                    onInput={(e)=>{
                        setFilter(e.target.value);
                        searchFilter();
                    }}
                />
            </div>
            <div className="border border-gray-300 rounded-md mx-8 text-gray-500 mt-4">
                <div className="grid grid-cols-8 px-3 py-3">
                    <div className="col-span-2">Original URL</div>
                    <div className="col-span-2">Short URL</div>
                    <div className="col-span-1">Clicks</div>
                    <div className="col-span-1">Created</div>
                    <div className="col-span-1">Expires</div>
                    <div className="col-span-1">Status</div>
                </div>
                { data.map(item => <Entry entry={item} key={item.shortUrl} />) }
            </div>
            <div className="flex justify-end items-center p-2 gap-x-1 m-6 mt-4">
                <button 
                    className="py-1 px-3 border border-gray-300 rounded text-gray-600 disabled:opacity-50 cursor-pointer"
                    disabled={page === 1}
                    onClick={ () => setPage(p => Math.max(p-1, 1)) }
                >
                    &lt;
                </button>
                <span className="p-1">Page {page} of {totalPages}</span>
                <button
                    className="py-1 px-3 border border-gray-300 rounded text-gray-600 disabled:opacity-50 cursor-pointer"
                    disabled={page === totalPages}
                    onClick={ () => setPage(p => Math.min(p+1, totalPages)) }
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default Analytics;