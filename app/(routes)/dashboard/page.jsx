import React from "react";
import { budgets } from "@/db/schema";
import { db } from "@/db";
import { verifyJwt } from "@/lib/jwt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export default async function Dashboard() {

    const token = (await cookies()).get("token")?.value;
    if (!token) {
        redirect("/login");
    }

    const payload = verifyJwt(token);
    


    const checkUserBudget = await db
        .select()
        .from(budgets)
        .where(eq(budgets.createdBy, payload.email));

   

    if (checkUserBudget.length === 0) {

        redirect("/dashboard/budgets")
    }
    return (
        <div>dashboard</div>
    )
}
