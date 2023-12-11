import { useState, useEffect, createContext } from "react";
import { useRouter } from 'next/router';
import axiosClient from "@/config/axiosClient";

// const AuthContext = createContext()

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setLoading(false)
                return
            }
    
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {
                const {data} = await axiosClient('/auth/profile', config)
                setAuth(data)
                // navigate('/proyectos')
                router.push('/')
            } catch (error) {
                setAuth({})
            } finally{
                 setLoading(false) 
            }
    
            
        }
        authenticateUser()
    }, [])

    const closeSessionAuth = () => {
        localStorage.removeItem('token');
        setAuth({})
        console.log("User logged out");
    }

  return (
    <AuthContext.Provider
            value={{
                auth,
                setAuth, 
                loading,
                closeSessionAuth
            }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext