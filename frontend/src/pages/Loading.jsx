import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Loading = ()=>{
    const { shortId } = useParams(); 
    const SERVER_API = import.meta.env.VITE_SERVER_API;
    const fetched = useRef(false);

    useEffect(() => {
        if(fetched.current) return;
        fetched.current = true;
        const fetch = async ()=>{
            const res = await axios.get(`${SERVER_API}/${shortId}`);
            if(res.data){
                window.location.href = res.data.url;
            }
        }
        fetch();
    },[]);

    return <div>
        <h1>{shortId}</h1>
    </div>
}

export default Loading;