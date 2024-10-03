import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(){
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();

    return(
        <div className="max-w-sm bg-white mx-auto p-8 mt-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form className="space-y-5 max-w-sm mx-auto pt-8">
            <input required type="text" value={username} placeholder="Enter username" className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"/>
            <input required type="email" value={email} placeholder="Enter email" className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"/>
            <input required type="password" value={password} placeholder="Enter password" className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"/>
            {
                message && <div className={`text-red-500 text-xs`}>{message}</div>
            }
            <button className="w-full mt-5 bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md">Register</button>
            <p className="my-5 text-center">Already have an account? 
                <Link to='/login' className="text-red-700 italic"> Login</Link> here
            </p>
        </form>
    </div>
    )
}