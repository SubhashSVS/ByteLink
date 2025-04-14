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


    return <div className="flex space-x-4 m-8">
        <div className="w-full py-4 flex-col  border border-gray-200 rounded-lg shadow-xs space-y-1">
            <div className="text-2xl font-bold px-4">Clicks Over Time</div>
            <div className="text-gray-500 text-md px-4">Link performance over the last 30 days</div>
            <ResponsiveContainer width="90%" height={300} className="mt-6">
                <LineChart data={clicksData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="totalClicks" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className="w-full flex-col p-4 border border-gray-200 rounded-lg shadow-xs space-y-1">
            <div className="text-2xl font-bold px-4">Device Breakdown</div>
            <div className="text-gray-500 text-md px-4">Clicks by device type</div>
            <ResponsiveContainer width="100%" height={300} className="mt-6">
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
    </div>
}

export default Charts;