import { Trash } from "lucide-react"
import { toast } from "sonner";
import { deleteExpense } from "@/app/actions/deleteExpense"
export default function ExpenseListTable({ expenseList, refreshData}) {
    console.log(expenseList)
    async function deleteexpense(id){
        const res = await deleteExpense(Number(id));
        if(res.success){
            toast("Expense Deleted");
            refreshData();
        }
    }
    return (
        <div className="mt-3">
            <div className="grid grid-cols-4 bg-slate-200 p-2">
                <h2 className="font-bold">Name</h2>
                <h2 className="font-bold">Amount</h2>
                <h2 className="font-bold">Date</h2>
                <h2 className="font-bold">Action</h2>
            </div>
            {expenseList.map((expenses, index) => (
                <div key={expenses.id} className="grid grid-cols-4 bg-slate-200 p-2">
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}$</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2>
                        <Trash className="text-red-600 cursor-pointer"
                        onClick={()=>deleteexpense(expenses.id)}/>
                    </h2>
                </div>
            ))}
        </div>
    )
}