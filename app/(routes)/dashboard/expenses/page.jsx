"use client"
import BudgetItem from "../budgets/_components/budgetItem";
import AddExpense from "./_components/AddExpense";
import ExpenseListTable from "./_components/expenseListTable";
export default function Expense({ expenseData,loadExpense,expenseList }) {
    console.log(expenseData)
    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold">My Expenses</h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                {expenseData ? <BudgetItem budget={expenseData} /> :
                    <div className="h-37.5 w-full bg-slate-200 rounded-lg animate-pulse"></div>
                }
                <AddExpense
                budgetId ={expenseData?.id}
                refereshData={()=>loadExpense()}/>
            </div>
            <div className="mt-5">
                <h2 className="font-bold text-lg">Latest Expenses</h2>
                <ExpenseListTable
                expenseList={expenseList || []}
                refreshData={()=>loadExpense()}/>
            </div>

        </div>
    )
}