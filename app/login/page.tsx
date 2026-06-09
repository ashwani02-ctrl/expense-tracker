"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(email: string, password: string) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.text();
            console.log(error);
            alert(error);
            return;
        }

        router.push("/dashboard");

    }

   return (
        <div className="max-w-sm mx-auto mt-40 border-2 rounded-lg">
            <div className="flex flex-col gap-4 max-w-sm mx-auto p-10">

                <h2 className="text-3xl font-bold">Hello!</h2>
                <p>Login to get started</p>
                
                {/* Email Input with Mail Icon */}
                <div className="relative flex items-center">
                    <Mail className="absolute left-3 text-gray-400 h-5 w-5" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 pl-10 rounded-lg w-full" 
                    />
                </div>

                {/* Password Input with Lock Icon */}
                <div className="relative flex items-center">
                    <Lock className="absolute left-3 text-gray-400 h-5 w-5" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 pl-10 rounded-lg w-full" 
                    />
                </div>

                <button 
                    onClick={() => login(email, password)}
                    className="bg-black text-white p-2 rounded-lg"
                >
                    Login
                </button>
            </div>
        </div>
    );
}