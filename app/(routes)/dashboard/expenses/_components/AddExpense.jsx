"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createExpense } from "@/app/actions/createExpense";
import { toast } from "sonner";

export default function AddExpense({budgetId, refereshData}) {
    const [name, setName]=useState();
    const [amount, setAmount]=useState();

    const addNewExpense = async()=>{
        if(!name || !amount) return;
        

        try{
            const res=await createExpense({
                name: name,
                amount: amount,
                budgetId: budgetId,
            })
            

            if(res.success){
                setName("");
                setAmount("");
                refereshData();
                toast("New Expense Created Successfully!!")
            }else{
                alert(`Error:${res.error}`)
            }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div className="border p-5 rounded-lg">

            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium mb-1">Expense Name</h2>
                <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium mb-1">Expense Amount</h2>
                <Input
                    placeholder="e.g. 1000"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button disabled={!(name&&amount)} className="mt-3 w-full"
            onClick={()=>addNewExpense()}>Add New Expense</Button>
        </div>
    )
}