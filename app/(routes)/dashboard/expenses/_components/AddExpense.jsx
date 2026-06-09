"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createExpense } from "@/app/actions/createExpense";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function AddExpense({ budgetId, refreshData }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        setLoading(true);
        if (!name || !amount) return;


        try {
            const res = await createExpense({
                name: name,
                amount: amount,
                budgetId: budgetId,
            })


            if (res.success) {
                setName("");
                setAmount("");
                refreshData();
                toast("New Expense Created Successfully!!")
            } else {
                alert(`Error:${res.error}`)
            }
             setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="border p-5 rounded-lg">

            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium mb-1">Expense Name</h2>
                <Input
                    value={name}
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium mb-1">Expense Amount</h2>
                <Input
                    value={amount}
                    placeholder="e.g. 1000"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button disabled={!(name && amount)|| loading} className="mt-3 w-full"
                onClick={() => addNewExpense()}>
                    {loading? 
                    <Loader className="animate-spin"/> : "Add New Expense" }
                    </Button>
        </div>
    )
}