"use server"
import { db } from "@/db";
import { budgets, expenses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { jwtVerify } from "jose";
import { cookies } from "next/headers"
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function getallexpense() {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        if(!token){
            throw new Error("Unauthorized : No token found. Please login ")
        }

        const {payload} = await jwtVerify(token, JWT_SECRET);
        const userEmail = payload.email as string
            if(!userEmail){
                throw new Error("Invalid token payload: Email field missing.")

            }
            const result = await db.select({
                id: expenses.id,
                name: expenses.name,
                amount:expenses.amount,
                createdAt:expenses.createdAt
            }).from(budgets)
            .rightJoin(expenses,eq(budgets.id, expenses.budgetId))
            .where(eq(budgets.createdBy, userEmail))
            .orderBy(desc(expenses.id))
            return {success: true, data: result};

        
    }catch(error: any){
        console.error("Auth/Database Error:", error);
        return{success: false, error: error.message || "something went wrong"}
    }
    
}