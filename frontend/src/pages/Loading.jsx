import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useAnalytics from "../hooks/useAnalytics";


const Loading = ()=>{
    const { shortId } = useParams(); 
    const SERVER_API = import.meta.env.VITE_SERVER_API;
    const fetched = useRef(false);
    const {triggerRefresh} = useAnalytics();

    useEffect(() => {
        if(fetched.current) return;
        fetched.current = true;
        const fetch = async ()=>{
            const res = await axios.get(`${SERVER_API}/${shortId}`);
            if(res.data){
                triggerRefresh();
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