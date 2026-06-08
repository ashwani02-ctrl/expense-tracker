"use client"
import React, { useEffect, useState } from "react";
import Cardinfo from "./_components/Cardinfo";
import { budgetCard } from "@/app/actions/budgetcard"
import { checkuserbudget } from "@/app/actions/checkuserbudget";

export default function Dashboard() {
    const [budgetData, setbudgetData] = useState([]);
    const [email, setEmail] = useState();
    const checking = async()=>{
        const { email } = await checkuserbudget();
        setEmail(email);
    }
        useEffect(()=>{
            checking();
            async function loadBudget() {
                const res = await budgetCard();
                if(res.success){
                    setbudgetData(res.data);
                }
                
            }
            loadBudget();
        },[]);
    return (
        <div className="m-4">
            <h2 className="font-bold text-3xl">Hi, {email}</h2>
            <p className="text-1xl text-gray-500">Here's what happening with you money, lets manage it</p>
            <Cardinfo budgetData={budgetData}/>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
                <div className="md:col-span-2">
                    chart
                </div>
                <div>
                    other content
                </div>
            </div>
        </div>
    )
}
