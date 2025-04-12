import axios from "axios";
import { useRef, useState } from "react";

const Shortener = ()=>{
    const [url,setUrl] = useState("");
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const inputRef = useRef(null);

    const handleShortener = async ()=>{
        const res = await axios.post(`${serverAPI}/api/shorten`,{
            url : url
        })
        if(res.data.shortId){
            inputRef.current.value = "";
        }
    }

    return <div className="p-6 mx-8 my-4 border border-gray-200 rounded-lg shadow-xs bg-white">
        <div className="font-bold text-2xl">Create Short Link</div>
        <div className="text-gray-500">Enter a long URL to create a shortened version</div>
        <div className="my-3 flex-col space-y-2">
            <div className="font-medium text-sm max-0.5">URL</div>
            <input 
                placeholder="https://example.com/very/long/url"
                className="border border-gray-200 rounded-md p-2 w-full"
                ref={inputRef}
                onInput={(e)=>{
                    setUrl(e.target.value);
                }}
            />
        </div>
        <button
            className="bg-black text-white w-full p-2 font-medium rounded-md mt-2"
            onClick={handleShortener}
        >
            Create Short Link
        </button>
    </div>
}

export default Shortener;