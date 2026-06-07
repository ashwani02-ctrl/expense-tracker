"use server"
import { db } from "@/db";
import { expenses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
export async function getexpensesList(budgetId: number) {
    try{
        const result = await db.select().from(expenses)
        .where(eq(expenses.budgetId, budgetId))
        .orderBy(desc(expenses.id));
        return{success: true, data: result};
    }catch(error: any){
        console.error("Database Error:", error);
        return {success: false, error: error.message || "something went wrong"}
    }
    
}