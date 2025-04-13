import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => { 
    const navigate = useNavigate();

    return <div>
        <div className="flex justify-between py-4 px-8 border border-gray-200 shadow">
            <div className="text-3xl font-extrabold underline decoration-pink-600">ByteLink</div>
            <button 
                className="bg-black text-white text-md font-medium py-2 px-5 rounded cursor-pointer active:bg-gray-700"
                onClick={()=>{
                    navigate('/login');
                }}
            >
                Login
            </button>
        </div>
        <div className="max-h-screen flex-col py-40">
            <div className="text-5xl font-extrabold text-center">
                <span className="underline decoration-pink-600">ByteLink</span> <span className="text-pink-600">—</span> Shorten<span className="text-pink-600">.</span> 
                         Track<span className="text-pink-600">.</span>
                         Analyze<span className="text-pink-600">.</span>
                         
            </div>
            <div className="text-center text-xl text-gray-500 mt-5">Create shortened URLs and track their performance with our powerful analytics dashboard.</div>
            <div className="text-center text-xl text-gray-500 mt-1">
                <span className="text-pink-600 text-2xl">[</span>
                 The smarter way to link
                 <span className="underlinetext-pink-600 text-2xl">]</span>
            </div>
            <div className="text-center mt-6">
                <button
                    className="bg-black text-white text-lg px-40 py-1.5 rounded-md cursor-pointer"
                    onClick={()=>{
                        navigate('/login');
                    }}
                    >
                    Get Started
                </button>
            </div>
        </div>
        <div className="fixed bottom-0 w-full text-center text-gray-500 p-2">© 2025 ByteLink. All rights reserved.</div>
    </div>
}

export default LandingPage;