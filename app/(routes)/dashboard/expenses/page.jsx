"use client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BudgetItem from "../budgets/_components/budgetItem";
import AddExpense from "./_components/AddExpense";
import ExpenseListTable from "./_components/expenseListTable";
import { deletebudget } from "@/app/actions/deleteBudget";
import { PenBox, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditBudget from "./_components/editBudget";
export default function Expense({ expenseData, loadExpense, expenseList }) {
    console.log(expenseData)
    console.log(expenseList)
    const router = useRouter();

    const deleteBudget = async()=>{
            const res = await deletebudget(
                expenseData?.id

            )
        if(res.success){
            toast("budget deleted successfully ")
            router.replace('/dashboard/budgets')
        }
    }
    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold flex justify-between items-center">My Expenses

                <span className="flex gap-2 items-center">
                   <EditBudget
                   expenseData={expenseData}
                   expenseList={expenseList}
                   refreshData={()=>loadExpense()}/>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex" variant="destructive">
                                <Trash />
                                Delete</Button>

                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your current budget with all the expenses
                                    from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </span>
            </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                {expenseData ? <BudgetItem budget={expenseData} /> :
                    <div className="h-37.5 w-full bg-slate-200 rounded-lg animate-pulse"></div>
                }
                <AddExpense
                    budgetId={expenseData?.id}
                    refreshData={() => loadExpense()} />
            </div>
            <div className="mt-5">
                <h2 className="font-bold text-lg">Latest Expenses</h2>
                <ExpenseListTable
                    expenseList={expenseList}
                    refreshData={() => loadExpense()} />
            </div>

        </div>
    )
}