import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
  const [user, setUser] = useLocalStorage("user", null)
  
  const navigate = useNavigate()
    if (!user) {
      return <Navigate to="/" />
    }    

    const handleLogout = () => {
      localStorage.setItem('user', "");
      navigate('/', { replace: true })
    }
    
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        {/* @ts-ignore */}
      <h1 className="text-8xl font-bold mb-4">Welcome {user.userName}!</h1>
      <button 
           onClick={handleLogout}
           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
         >
      Logout
      </button>
      </div>
    );
}

export default Home;
  