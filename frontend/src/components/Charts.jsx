import { useEffect, useState } from "react";
import {
    Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
    Cell, Pie, PieChart
  } from "recharts";
import useAnalytics from "../hooks/useAnalytics";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = () => {
    const [clicksData, setClicksData] = useState([]);
    const [deviceData, setDeviceData] = useState([]);
    const SERVER_API = import.meta.env.VITE_SERVER_API;
    const { refresh } = useAnalytics();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${SERVER_API}/api/charts`);
            setClicksData(res.data.clicksData);
            setDeviceData(res.data.deviceData);
        }
        fetchData();
    },[refresh]);


    return <div>
        <h1>Clicks Chart</h1>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clicksData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip />
                <Line type="monotone" dataKey="totalClicks" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
        <h1>Device Chart</h1>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ deviceType, percent }) => `${deviceType} ${(percent * 100).toFixed(0)}%`}
            >
                {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
}

export default Charts;