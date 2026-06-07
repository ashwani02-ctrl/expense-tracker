"use server"
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db";
import { budgets, expenses} from "@/db/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function budgetCard() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        if(!token){
            throw new Error("Unauthorized: No token found. Please log in")
        }

        const {payload} = await jwtVerify(token, JWT_SECRET)

        const userEmail = payload.email as string
        if(!userEmail){
            throw new Error("Invalid token payload: Email field missing.")

        }
        

         const result = await db.select({
                ...getTableColumns(budgets),
                totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${expenses.id})`.mapWith(Number),
            }).from(budgets)
                .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
                .where(eq(budgets.createdBy, userEmail))
                .groupBy(budgets.id)
                .orderBy(desc(budgets.id))                
                return {success: true, data: result};

    }catch(error: any){
        console.error("Auth/Database Error:", error)
        return {success: false, error: error.message|| "something went wrong" }
    }
    
}