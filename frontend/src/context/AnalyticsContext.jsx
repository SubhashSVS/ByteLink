import { createContext, useState } from "react";


export const AnalyticsContext = createContext();

const AnalyticsProvider = ({children})=>{
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = ()=>{
        setRefresh(prev => !prev);
    };

    return(
        <AnalyticsContext.Provider value={{refresh, triggerRefresh}}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export default AnalyticsProvider;