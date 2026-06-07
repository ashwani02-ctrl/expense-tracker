"use server"
import { db } from "@/db";
import { expenses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function deleteExpense(expenseId) {
    try{
        const result = await db.delete(expenses)
        .where(eq(expenses.id, expenseId))
        .returning()
        return{success: true, data: result};
    }catch(error: any){
        console.error("Database Error:", error);
        return {success: false, error: error.message || "something went wrong"}
    }
    
}