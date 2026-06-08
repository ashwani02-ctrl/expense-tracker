"use server"
import { db } from "@/db";
import { budgets, expenses } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function deletebudget(budgetId) {
    try {
        const expensedeleteresult = await db.delete(expenses)
        .where(eq(expenses.budgetId, budgetId))
        .returning()

        if (expensedeleteresult) {

            const result = await db.delete(budgets)
                .where(eq(budgets.id, budgetId))
                .returning()
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error("Database Error:", error);
        return { success: false, error: error.message || "something went wrong" }
    }

}