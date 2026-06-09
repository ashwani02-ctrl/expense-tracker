"use client"
import { BarChart, Tooltip, XAxis, YAxis,Legend, Bar } from "recharts";

export default function BudgetBarchart({budgetData}){
    return (
        <div className="border rounded-lg p-5">
            <h2 className="font-bold text-lg">Activity</h2>
            <BarChart
            width={500}
            height={300}
            data={budgetData || []}
            margin={{
                top:7,
                right:5,
                left:5,
                bottom:5
            }}
            >
                <XAxis
                dataKey='name'/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey='totalSpend' stackId="a" fill='#2B2B2B'/>
                <Bar dataKey='amount' stackId="a" fill='#555555'/>

            </BarChart>
        </div>
    );
}