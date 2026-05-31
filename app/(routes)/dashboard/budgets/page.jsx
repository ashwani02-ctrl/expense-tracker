import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import BudgetList from "./_components/BudgetList";

function Budget(){
    return (
        <div className="mt-5 ml-6">
           <Button> 
           <PlusIcon/>
           Create Budget</Button>

           <h2 className="text-3xl font-bold">My Budgets</h2>
           <BudgetList/>

        </div>
    )
}

export default Budget;