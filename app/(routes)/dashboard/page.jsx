"use client"
import React, { useEffect, useState } from "react";
import Cardinfo from "./_components/Cardinfo";
import { budgetCard } from "@/app/actions/budgetcard"
import { checkuserbudget } from "@/app/actions/checkuserbudget";
import BudgetBarchart from "./_components/barChart";
import BudgetItem from "./budgets/_components/budgetItem";
import { getallexpense } from "@/app/actions/getallexpense";
import ExpenseListTable from "./expenses/_components/expenseListTable";

export default function Dashboard() {
    const [budgetData, setbudgetData] = useState([]);
    const [email, setEmail] = useState();
    const [allExpense, setallExpense] = useState([]);

    const checking = async () => {
        const { email } = await checkuserbudget();
        setEmail(email);
    }

    const getallExpense = async () => {
        const res = await getallexpense();
        if (res.success) {
            setallExpense(res.data);
            console.log(res);

        }

    }
    async function loadBudget() {
        const res = await budgetCard();
        if (res.success) {
            setbudgetData(res.data);
           
        }
        getallExpense();

    }
    useEffect(() => {
        checking();
        loadBudget();
        getallExpense();

    }, []);

    return (
        <div className="m-4">
            <h2 className="font-bold text-3xl">Hi, {email}</h2>
            <p className="text-1xl text-gray-500">Here's what happening with you money, lets manage it</p>
            <Cardinfo budgetData={budgetData} />
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
                <div className="md:col-span-2">
                    <BudgetBarchart
                        budgetData={budgetData} />

                    <ExpenseListTable
                    expenseList={allExpense}
                    refreshData={()=>loadBudget()}/>
                </div>
                <div className="grid gap-5">
                    <h2 className="font-bold text-lg">Latest Budgets</h2>
                    {budgetData.map((budget, index) => (
                        <BudgetItem budget={budget} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}
