import { Children, createContext, useContext, useState } from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
export const authModalContext=createContext();

export default function AuthModal({children}){
    const[showLogin,setShowLogin]=useState(false);
    const[showRegister,setShowRegister]=useState(false);
    const openLogin=()=>setShowLogin(true);
    const closeLogin=()=>setShowLogin(false);
    const openRegister=()=>setShowRegister(true);
    const closeRegister=()=>setShowRegister(false);
    return(<authModalContext.Provider value={{openLogin,closeLogin,openRegister,closeRegister}}>
            {children}
        {showRegister && <Register/>}
        {showLogin && <Login/>}
    </authModalContext.Provider>);
}
