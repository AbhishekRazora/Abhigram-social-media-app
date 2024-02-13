import { Navigate,Outlet } from "react-router-dom";



function ProtectedLayout() {

    const isLoggin=true;

    if(!isLoggin){
        return <Navigate to='sign-in' state={{message:"Please login first before access:--"}}/>
    }

    return <Outlet/>

 
}

export default ProtectedLayout
