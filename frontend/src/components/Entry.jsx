const Entry = ({entry})=>{
    const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

    return <div className="grid grid-cols-8 text-black border-t border-gray-300 px-3 py-3 ">
        <div className="col-span-2 truncate">{entry.url}</div>
        <div className="col-span-2">{CLIENT_URL+'/'+entry.shortUrl}</div>
        <div className="col-span-1">{entry.clicks}</div>
        <div className="col-span-1">{new Date(entry.created).toLocaleDateString("en-US",{
            year : "numeric",
            month : "short",
            day : "numeric" 
        })}</div>
        <div className="col-span-1">{
            entry.expiryDate
                ? new Date(entry.expiryDate).toLocaleDateString("en-US",{
                    year : "numeric",
                    month : "short",
                    day : "numeric" 
                })
                : "Never"
        }</div>
        <div className="col-span-1">{
            (!entry.expiryDate || new Date() < new Date(entry.expiryDate)) ? "Active" : "Expired"
        }</div>
    </div>
}

export default Entry;