import axios from "axios";
import { useRef, useState } from "react";
import useAnalytics from "../hooks/useAnalytics";
import { Link2 } from "lucide-react";


const Shortener = ()=>{
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [date, setDate] = useState("");
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const inputRef = useRef(null);
    const {triggerRefresh} = useAnalytics();

    const handleShortener = async ()=>{
        const res = await axios.post(`${serverAPI}/api/shorten`,{
            url : url,
            customAlias : alias,
            ...(date && { expiryDate : date })
        })
        if(res.data.shortId){
            inputRef.current.value = "";
            setUrl("");
            triggerRefresh();
        }
    }

    return <div className="p-6 mx-8 my-4 border border-gray-200 rounded-lg shadow-xs bg-white">
        <div className="font-bold text-2xl"><span></span>Create Short Link</div>
        <div className="text-gray-500">Enter a long URL to create a shortened version</div>
        <div className="my-3 flex-col space-y-4">
            <div className="flex-col space-y-2">
                <div className="text-sm max-0.5">URL</div>
                <div className="flex items-center">
                    <div className="p-2.5 border border-gray-200 rounded-l-lg text-gray-500"><Link2 size={20}/></div>
                    <input 
                        placeholder="https://example.com/very/long/url"
                        className="border border-gray-200 rounded-r-md p-2 w-full"
                        ref={inputRef}
                        onInput={(e)=>{
                            setUrl(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="flex space-x-6 ">
                <div className="flex-col w-full space-y-2">
                    <div className="text-sm max-0.5">Custom Alias (Optional)</div>
                    <input 
                        placeholder="custom-name"
                        className="border border-gray-200 rounded-md p-2 w-full"
                        ref={inputRef}
                        onInput={(e)=>{
                            setAlias(e.target.value);
                        }}
                    />
                </div>
                <div className="flex-col w-full space-y-2">
                    <div className="text-sm max-0.5">Expiration Date (Optional)</div>
                    <input 
                        type="Date"
                        className="border border-gray-200 rounded-md p-2 w-full text-gray-500"
                        ref={inputRef}
                        onInput={(e)=>{
                            setDate(e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
        <button
            className="bg-black text-white w-full p-2 font-medium rounded-md mt-2 cursor-pointer"
            onClick={handleShortener}
        >
            Create Short Link
        </button>
    </div>
}

export default Shortener;