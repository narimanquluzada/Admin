import React, { createContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();



 const LoginContextProvider = ({children})=> {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState('');
    const [isLogin, setIsLogin] = useState(false);



    useEffect( ()=>{
  
        let token = localStorage.getItem('token');
        if(token){
            setAdmin(token);
            setIsLogin(true);
        }else{
            navigate('/');
        }
    }, []);
    

    const Login = (data) =>{
        setAdmin(data.idToken);
        setIsLogin(true);
        localStorage.setItem('token', data.idToken);
        navigate('/list')
        setTimeout(() => {
            alert("Admin xos gelmisiz!!!")
            
        }, 1000);
    }

    const logout = () => {
        setIsLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('useremail');
    navigate('/');
        
    }

    const values ={
        Login,
        logout,
        isLogin,
        admin,
    }


    return ( 
    <div> 
<LoginContext.Provider value={values}>{children}</LoginContext.Provider>

    </div> 

    )

}

export default LoginContextProvider;