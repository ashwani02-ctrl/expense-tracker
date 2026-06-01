import { eq, getTableColumns, sql } from "drizzle-orm"
import BudgetForm from "./BudgetForm"
import { budgets, expenses } from "@/db/schema"
import { verifyJwt } from "@/lib/jwt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/db";
import BudgetItem from "./budgetItem";


export default async function BudgetList() {
    const token = (await cookies()).get("token")?.value;
        if (!token) {
            redirect("/login");
        }
        
    
        const payload = verifyJwt(token);
        console.log(payload);
    

        const getBudgetList=await db.select({
            ...getTableColumns(budgets),
            totalSpend:sql `sum(${expenses.amount})`.mapWith(Number),
            totalItem:sql `count(${expenses.id})`.mapWith(Number),
        }).from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
        .where(eq(budgets.createdBy, payload.email))
        .groupBy(budgets.id);

  
    console.log("tada!!!!=>",getBudgetList);

    
    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <BudgetForm />
                {getBudgetList && getBudgetList.map((budget)=>(
                    
                    <BudgetItem
                    key={budget.id}
                    budget={budget}/>
                ))}
                
            </div>
        </div>
    )
}