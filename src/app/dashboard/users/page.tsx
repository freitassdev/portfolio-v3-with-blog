"use client"

import { DataTable } from "@/components/shared/data-table/data-table";
import { ColumnUser, usersColumns } from "@/components/shared/data-table/utils/columns";
import BreadcrumbNavigator from "@/components/shared/breadcrumb-navigator/breadcrumb-navigator";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Navbar from "@/components/shared/navbar/Navbar";
import { Separator } from "@/components/ui/separator";
export default function UsersPage() {
    const [users, setUsers] = useState<ColumnUser[]>([])
    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch(`/api/blog/users/get`, {
                method: "GET"
            });

            const response: ColumnUser[] = await res.json()

            if (res.ok) {
                return setUsers(response);
            }
            return toast.error("Erro ao buscar usuários");
        }

        getUsers();
    }, [])
    return (
        <div className="h-screen w-full bg-background relative flex items-center justify-center">
            <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px]">
                <Navbar active="blog" />
                <div className="flex flex-col gap-3 w-full mt-24">
                    <BreadcrumbNavigator items={[
                        { title: "Dashboard", href: "/dashboard" },
                        { title: "Usuários", href: "/dashboard/users" }
                    ]} />
                    <DataTable columns={usersColumns} data={users} />
                </div>
            </div>
        </div>
    );
}

