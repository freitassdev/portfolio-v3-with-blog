'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function UserMenu({ className }: { className?: string }) {
    const [nameAbrev, setNameAbrev] = useState<string>("");
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && session.user) {
            const name = session.user.fullName;
            const nameAbreviation = name.split(" ").map((n) => n[0]).join("").substring(0, 2);
            setNameAbrev(nameAbreviation);
        }
    }, [session])

    if (status === "authenticated") {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <div className={cn("flex flex-row items-center gap-3", className)}>
                        <Avatar className="cursor-pointer">
                            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                            <AvatarFallback>{nameAbrev.toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="flex flex-row gap-3 items-center ">
                            <Avatar className="cursor-pointer w-12 h-12">
                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                <AvatarFallback>{nameAbrev.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center gap-1 h-full">
                                <h4 className="text-primary font-medium leading-none">{session.user.fullName}</h4>
                                <p className="text-sm text-foreground">
                                    @{session?.user?.username}
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            teste
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

        )
    }
    return (
        <div className={cn("flex flex-row items-center gap-4", className)}>
            <Button className="text-sm" onClick={() => router.push("/auth/login")}>Fazer Login</Button>
        </div>
    )
}