"use server"

import { db } from "@/db"
import { budgets } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function updateBudget(formData: {name: string; amount: string; icon: string},budgetId) {
    try{
        const result = await db.update(budgets).set({
            name: formData.name,
            amount: formData.amount,
            icon: formData.icon,
        }).where(eq(budgets.id, budgetId))
        .returning()

        return {success: true, data: result[0]}
    }catch(error: any){
        console.error("Database Error:", error)
        return{success: false, error: error.message || "something went wrong"}
    }
    
}