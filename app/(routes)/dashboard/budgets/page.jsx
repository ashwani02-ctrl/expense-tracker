import React from "react";
import { Suspense } from "react";
import BudgetList from "./_components/BudgetList";
import BudgetListSkeleton from "./_components/BudgetListSkeleton";

function Budget() {
    return (
        <div className="mt-5 ml-6">
            <h2 className="text-3xl font-bold ">My Budgets</h2>
            <Suspense fallback={<BudgetListSkeleton />}>
                <BudgetList />
            </Suspense>


        </div>
    )
}

export default Budget;