"use client"

import { budgetCard } from "@/app/actions/budgetcard";
import BudgetForm from "./BudgetForm"
import BudgetItem from "./budgetItem";
import { useEffect, useState } from "react";


export default function BudgetList() {
    const [budgetData, setbudgetData] = useState([]);
    useEffect(()=>{
        async function loadBudget() {
            const res = await budgetCard();
            if(res.success){
                setbudgetData(res.data);
            }
            
        }
        loadBudget();
    },[]);



    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <BudgetForm
                />
                {budgetData.map((budget) => (

                    <BudgetItem
                        key={budget.id}
                        budget={budget} />
                ))

                }

            </div>
        </div>
    )
}