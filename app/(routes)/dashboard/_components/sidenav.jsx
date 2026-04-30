"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";


function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ]

    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])


    return (
        <div >
            <div className="h-screen shadow-sm">
                <Image src={'./logo.svg'}
                    alt='logo'
                    width={100}
                    height={100}
                />
                <div className="mt-5">
                    {menuList.map((menu) => (
                        <Link href={menu.path} key={menu.id}>
                            <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary mb-2 hover:bg-blue-100
                                ${path == menu.path && 'text-primary bg-blue-100'}`
                                }>
                                <menu.icon />
                                {menu.name}
                            </h2>
                        </Link>
                    ))}
                </div>
                {/* profile view */}
            </div>
        </div >
    )
}

export default SideNav