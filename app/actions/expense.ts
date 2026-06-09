"use server"
import { cookies } from "next/headers";     
import { jwtVerify } from "jose";
import { db } from "@/db";
import { budgets, expenses } from "@/db/schema";
import {and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { getallexpense } from "./getallexpense";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function expenseURL(budgetId: number) {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        if(!token){
            throw new Error("Unauthorized: No token found. Please log in")
        }

        const {payload} = await jwtVerify(token, JWT_SECRET);

        const userEmail = payload.email as string
        if(!userEmail){
            throw new Error("Invalid token Payload: Email field missing.")
        }

          const result = await db.select({
                        ...getTableColumns(budgets),
                        totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
                        totalItem: sql`count(${expenses.id})`.mapWith(Number),
                    }).from(budgets)
                        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
                        .where(
                            and (
                            eq(budgets.createdBy, userEmail),
                            eq(budgets.id, budgetId)
                        ))
                        .groupBy(budgets.id)
                        .orderBy(desc(budgets.id))                
                        return {success: true, data: result[0]};
                        

    }catch(error: any){
        console.error("Auth/Database Error:", error)
        return {success: false, error: error.message || "something went wrong"}
    }
    
}