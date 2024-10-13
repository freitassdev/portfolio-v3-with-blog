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
import { Separator } from "@/components/ui/separator";
import { LogOut, MessageCircleCode, MessageCircleHeart, MessageCirclePlus, User, UserPen } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Badge } from "@/components/ui/badge";

export default function UserMenu({ className, setIsAdmin }: {
    className?: string,
    setIsAdmin: (value: boolean) => void
}) {
    const [nameAbrev, setNameAbrev] = useState<string>("");
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && session.user) {
            const name = session.user.fullName;
            const nameAbreviation = name.split(" ").map((n) => n[0]).join("").substring(0, 2);
            setNameAbrev(nameAbreviation);
            if (session.user.role === "ADMIN") {
                setIsAdmin(true);
            }
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
                <PopoverContent className="w-80 border-border">
                    <div className="grid gap-4">
                        <div className="flex flex-row gap-3 items-center ">
                            <Avatar className="cursor-pointer w-12 h-12">
                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                <AvatarFallback>{nameAbrev.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center gap-1 h-full">
                                <h4 className="text-primary font-medium leading-none flex flex-row items-center">{session.user.fullName}
                                    <Badge className="rounded-full text-muted-foreground px-1 ml-2">
                                        {session.user.role !== "USER" && session.user.role.toLocaleUpperCase()}
                                    </Badge>
                                </h4>
                                <p className="text-sm text-foreground">
                                    @{session?.user?.username}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 w-full">
                            <Separator />
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Sua conta</Label>
                                <Button className="text-sm w-full bg-muted hover:bg-muted-foreground/30 text-primary justify-between gap-2">
                                    Meu Perfil
                                    <User className="h-5" />
                                </Button>
                                <Button className="text-sm w-full bg-muted hover:bg-muted-foreground/30 text-primary justify-between gap-2">
                                    Editar Conta
                                    <UserPen className="h-5" />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Posts</Label>
                                <Button
                                    className="text-sm w-full bg-muted hover:bg-muted-foreground/30 text-primary justify-between gap-2"
                                    onClick={() => router.push('/blog/new/post')}>
                                    Novo Post
                                    <MessageCirclePlus className="h-5" />
                                </Button>
                                <Button className="text-sm w-full bg-muted hover:bg-muted-foreground/30 text-primary justify-between gap-2">
                                    Meus Posts
                                    <MessageCircleCode className="h-5" />
                                </Button>
                                <Button className="text-sm w-full bg-muted hover:bg-muted-foreground/30 text-primary justify-between gap-2">
                                    Posts Salvos
                                    <MessageCircleHeart className="h-5" />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Outros</Label>
                                <Button
                                    className="text-sm w-full bg-muted hover:bg-muted-foreground/30 text-primary justify-between gap-2"
                                    onClick={() => signOut({ redirect: true })}>
                                    Sair
                                    <LogOut className="h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

        )
    }
    return (
        <div className={cn("flex flex-row items-center gap-4", className)}>
            <Button className="text-sm h-[33px]" onClick={() => router.push("/auth/login")}>Fazer Login</Button>
        </div>
    )
}