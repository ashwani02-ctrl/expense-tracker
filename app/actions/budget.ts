"use server"

import { db } from "@/db";
import { budgets } from "@/db/schema";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createBudget(formData: {name: string; amount: string; icon: string}) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        if (!token) {
            throw new Error("Unauthorized: No token found. Please log in.")
        }

        const {payload} = await jwtVerify(token, JWT_SECRET)

        const userEmail = payload.email as string 

        if(!userEmail){
            throw new Error("Invalid token payload: Email field missing.")
        }

        const result = await db.insert(budgets).values({
            name: formData.name,
            amount: formData.amount,
            icon: formData.icon,
            createdBy: userEmail,
        }).returning()

        return {success: true, data: result[0]}
    }catch(error: any){
        console.error("Auth/Database Error:", error)
        return {success: false, error: error.message || "something went wrong"}
    }
}