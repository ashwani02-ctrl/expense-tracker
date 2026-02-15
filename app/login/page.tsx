"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(email: string, password: string) {
        const res = await fetch("/api/auth/login",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        if(!res.ok){
            alert("Login Failed");
            return;
        }

        router.push("/dashboard");
        
    }

    return (
        <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
            <input 
            placeholder="Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="border p-2" />

            <input
            placeholder="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="border p-2" />    

            <button onClick={()=>login(email,password)}
            className="bg-black text-white p-2"
            >Login</button>    
            </div>
    );
}