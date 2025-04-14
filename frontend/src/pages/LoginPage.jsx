import axios from 'axios';
import {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

const LoginPage = () => {           
    const [username, setUsername] = useState("user@bytelink.com");
    const [password, setPassword] = useState("Test@123");
    const [isLoading, setIsLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();
    const SERVER_API = import.meta.env.VITE_SERVER_API;

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token) navigate('/dashboard');
    },[]);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${SERVER_API}/api/login`, {
                username,
                password
            });
            
            if(res.data && res.data.token) {
                login(res.data.token);
                navigate('/dashboard');
            } else {
                console.log("No token received in response");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <div className='flex-col py-8 px-7 rounded-md w-full max-w-md bg-white shadow-md border-black'>
                <div className='text-2xl font-bold mb-2 underline decoration-pink-600'>Login</div>
                <div className='text-sm text-gray-500 my-3'>Enter your credentials to access your dashboard</div>
                <div className='flex-col my-2'>
                    <div className='text-md my-2'>
                        Username
                    </div>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        className='p-2 border border-gray-300 rounded-md w-full '
                        onChange={(e)=>setUsername(e.target.value)} 
                    />
                </div>
                <div className='flex-col my-2'>
                    <div className='text-md my-2'>
                        Password
                    </div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        className='p-2 border border-gray-300 rounded-md w-full'
                        onChange={(e)=>setPassword(e.target.value)} 
                    />
                </div>
                <button 
                    onClick={handleLogin}
                    className="py-2 mt-3 w-full border rounded bg-black text-white cursor-pointer active:bg-gray-700"
                    >
                    {isLoading ? 
                        <>
                            <Loader size='sm' />
                            Logging in...
                        </>
                        :"Login"}
                </button>
            </div>
        </div>
    )
}

export default LoginPage;