import { useEffect, useState } from "react";
import Entry from "./Entry";
import axios from "axios";
import useAnalytics from "../hooks/useAnalytics";
import { Search } from "lucide-react";



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
            <div className="flex mx-8 mt-3 border border-gray-200 text-gray-500 rounded-md w-fit items-center p-2">
                <Search size={20}/>
                <input 
                    placeholder="Search links..."
                    className="rounded-md px-2 outline-none"
                    onInput={(e)=>{
                        setFilter(e.target.value);
                        searchFilter();
                    }}
                />
            </div>
            <div className="border border-gray-300 rounded-md mx-8 text-gray-500 mt-4">
                <div className="grid grid-cols-9 px-3 py-3">
                    <div className="col-span-2">Original URL</div>
                    <div className="col-span-2">Short URL</div>
                    <div className="col-span-1">Clicks</div>
                    <div className="col-span-1">Created</div>
                    <div className="col-span-1">Expires</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1">Actions</div>
                </div>
                { data.map(item => <Entry entry={item} key={item.shortUrl} />) }
            </div>
            <div className="flex justify-end items-center p-2 gap-x-1 m-6 mt-4">
                <button 
                    className="py-1 px-3 border border-gray-300 rounded text-gray-600 disabled:opacity-50 cursor-pointer hover:bg-gray-50"
                    disabled={page === 1}
                    onClick={ () => setPage(p => Math.max(p-1, 1)) }
                >
                    &lt;
                </button>
                <span className="p-1">Page {page} of {totalPages}</span>
                <button
                    className="py-1 px-3 border border-gray-300 rounded text-gray-600 disabled:opacity-50 cursor-pointer hover:bg-gray-50"
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