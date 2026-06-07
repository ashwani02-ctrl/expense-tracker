"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Expense from "../page";
import { expenseURL } from "@/app/actions/expense";
import { getexpensesList } from "@/app/actions/expenselayout";

export default function Id() {
  const params = useParams();
  const [expenseData, setexpenseData] = useState();
  const [expenseList, setexpenseList] = useState([]);

  async function loadExpense() {

    const res = await expenseURL(Number(params.id));
    if (res.success) {
      setexpenseData(res.data);

    }
    loadExpenselist();

  }
  async function loadExpenselist() {
    const res = await getexpensesList(Number(params.id))
    if(res.success){
      setexpenseList(res.data);
    }

  }
  useEffect(() => {
    console.log(params);
    loadExpense();
  }, [params]);

  return (
    <div>
      <Expense expenseData={expenseData}
        loadExpense={loadExpense}
        expenseList={expenseList} />
    </div>
  );
}