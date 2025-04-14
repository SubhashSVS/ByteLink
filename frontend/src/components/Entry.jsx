import { Copy, ExternalLink, QrCode } from "lucide-react";
import { useState } from "react";
import QRModal from "./QRModal";

const Entry = ({entry})=>{
    const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
    const [showQR, setShowQR] = useState(false);

    return <div className="grid grid-cols-9 text-black border-t border-gray-300 px-3 py-3 hover:bg-gray-50">
        <div className="col-span-2 truncate py-2 pr-6">{entry.url}</div>
        <div className="col-span-2 py-2">{CLIENT_URL+'/'+entry.shortUrl}</div>
        <div className="col-span-1 p-2">{entry.clicks}</div>
        <div className="col-span-1 py-2">{new Date(entry.created).toLocaleDateString("en-US",{
            year : "numeric",
            month : "short",
            day : "numeric" 
        })}</div>
        <div className="col-span-1 py-2">{
            entry.expiryDate
                ? new Date(entry.expiryDate).toLocaleDateString("en-US",{
                    year : "numeric",
                    month : "short",
                    day : "numeric" 
                })
                : "Never"
        }</div>
        <div className="col-span-1 py-2">{
            (!entry.expiryDate || new Date() < new Date(entry.expiryDate)) 
            ? <span className="font-bold border border-gray-300 rounded-full px-2 py-0.5">Active</span>
            : <span className="font-bold border bg-red-500 text-white rounded-full px-2 py-0.5">Expired</span>
        }</div>
        <div className="col-span-1 py-2 flex space-x-4 items-center">
            <button
                className="cursor-pointer p-1 rounded active:bg-gray-200"
                onClick={() => {
                    navigator.clipboard.writeText(CLIENT_URL+'/'+entry.shortUrl);
                }}
            >
                <Copy size={16} />
            </button>
            <button
                className="cursor-pointer p-1 rounded active:bg-gray-200"
                onClick={() => {
                    window.open(CLIENT_URL+'/'+entry.shortUrl,"_blank");
                }}
            >
                <ExternalLink size={17} />
            </button>
            <button
                className="cursor-pointer p-1 rounded active:bg-gray-200"
                onClick={() => {
                    setShowQR(true);
                }}
            >
                <QrCode size={16} />
            </button>        
        </div>
        {
            showQR && (
                <QRModal 
                    url={CLIENT_URL+'/'+entry.shortUrl} 
                    onClose={() => {
                        setShowQR(false);
                }}/>
            )
        }
    </div>
}

export default Entry;