import React from "react";

import BudgetList from "./_components/BudgetList";

function Budget(){
    return (
        <div className="mt-5 ml-6">
           <h2 className="text-3xl font-bold ">My Budgets</h2>
           <BudgetList/>

        </div>
    )
}

export default Budget;