const Entry = ({entry})=>{
    return <div className="grid grid-cols-6 text-black border-t border-gray-300 px-3 py-3">
        <div className="col-span-2 truncate">{entry.url}</div>
        <div className="col-span-2">{entry.shortUrl}</div>
        <div className="col-span-1">{entry.clicks}</div>
        <div className="col-span-1">{entry.created}</div>
    </div>
}

export default Entry;