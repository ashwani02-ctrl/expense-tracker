"use client"
import { PiggyBank, Receipt, Wallet } from "lucide-react"
import { useEffect, useState } from "react"

export default function Cardinfo({ budgetData }) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    useEffect(() => {
        calcualteCardInfo();

    }, [budgetData])

    const calcualteCardInfo = () => {
        console.log(budgetData);
        let totalbgt = 0;
        let totalspnt = 0;
        budgetData.forEach(element => {
            totalbgt = totalbgt + Number(element.amount)
            totalspnt = totalspnt + element.totalSpend
            console.log(totalbgt, totalspnt)
            
        });
        setTotalBudget(totalbgt)
        setTotalSpend(totalspnt)
    }
    return (
        <div>
            {budgetData?.length > 0 ?
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm">Total Budget</h2>
                            <h2 className="font-bold text-2xl">${totalBudget}</h2>
                        </div>
                        <PiggyBank className="bg-primary h-12 p-3 w-12 rounded-full text-white" />
                    </div>
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm">Total Spent</h2>
                            <h2 className="font-bold text-2xl">${totalSpend}</h2>
                        </div>
                        <Receipt className="bg-primary h-12 p-3 w-12 rounded-full text-white" />
                    </div>
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm">NO. of Budget</h2>
                            <h2 className="font-bold text-2xl">{budgetData?.length}</h2>
                        </div>
                        <Wallet className="bg-primary h-12 p-3 w-12 rounded-full text-white" />
                    </div>
                </div>
                :
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {  [1,2,3].map((item,index)=>(
                    <div 
                    key={index}
                    className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
                    )) }

                </div>
            }
        </div>
    )
}