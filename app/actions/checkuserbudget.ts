"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkuserbudget() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const payload = verifyJwt(token);

    const userBudgets = await db
        .select({ id: budgets.id })
        .from(budgets)
        .where(eq(budgets.createdBy, payload.email))
        .limit(1);

    if (userBudgets.length === 0) {
        redirect("/dashboard/budgets");
    }

    return {
        email: payload.email,
    };
}