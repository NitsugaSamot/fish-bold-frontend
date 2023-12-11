import { useContext } from "react";
import AuthContext from "@/context/AuthProvider";

const useAuth = () =>{
    return useContext(AuthContext) 
}

// En tu archivo useAuth.ts
export interface AuthData {
    auth: {
      _id: string; // Ajusta según la estructura real de tu objeto auth
      // Otros campos según la estructura de tu objeto auth
    };
    loading: boolean;
    closeSessionAuth: () => void;
    // Otros campos según la estructura de tu objeto auth
  }

export default useAuth