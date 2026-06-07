"use server"
import { db } from "@/db"
import { budgets, expenses } from "@/db/schema";
import { jwtVerify } from "jose";
import moment from "moment";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createExpense(formData: {name: string; amount: string; budgetId: number;}){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        if(!token){
            throw new Error("Unauthorized: NO token found. Please Log in.")
        }
        
        const {payload} = await jwtVerify(token, JWT_SECRET);

        const userEmail = payload.email as string

        if(!userEmail){
            throw new Error("Invalid token payload: Email field missing.")
        }

        const result = await db.insert(expenses).values({
            name: formData.name,
            amount: formData.amount,
            budgetId: formData.budgetId,
            createdAt: moment().format('DD/MM/YYYY')
        }).returning({insertId: budgets.id})

        return{success: true, data: result[0]}
    }catch(error: any){
        console.error("Auth/Database Error:", error)
        return {success: false, error: error.message || "something went wrong"}
    }
}