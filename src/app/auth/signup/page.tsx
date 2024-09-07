"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldError, FieldErrors, Message, useForm } from "react-hook-form"
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserSchema, zodUserType } from '../../../zod/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-hot-toast';

export default function SignUpPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<zodUserType>({
        resolver: zodResolver(UserSchema), // Apply the zodResolver
    })

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const onSubmit = async (data: zodUserType) => {
        setLoading(true);
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const response: {
            message: string;
            errors?: FieldErrors<zodUserType>;
        } = await res.json();
        setLoading(false);

        if (res.ok) {
            toast.success("Conta criada! Redirecionando para login...");
            return setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        }

        return toast.error(response.message); // caso tenha algum erro
    }

    useEffect(() => {
        for (const error in errors) {
            const errorMessage = errors[error as keyof FieldErrors<zodUserType>]?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }, [errors])

    return (
        <div className="w-full h-screen flex flex-row justify-center items-center">
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="z-10 h-[80%] md:w-[500px] 2xl:w-1/3 p-4 rounded-2xl border border-border bg-background/80 backdrop-blur-[7px]">
                <div className="lg:p-8 h-full">
                    <div className="mx-auto flex w-full h-full flex-col items-center justify-center space-y-6 sm:w-[350px] max-w-[350px]">
                        <div className="flex flex-col items-center space-y-2 text-center">
                            <h1 className="text-3xl font-semibold tracking-tight">
                                Criar uma Conta
                            </h1>
                            <p className="text-md text-muted-foreground">
                                Insira as informações abaixo para criar sua conta.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-2">
                                <Label>Nome Completo*</Label>
                                <CustomInput {...register("fullName")} required type="text" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Nome de Usuário*</Label>
                                <CustomInput {...register("username")} required type="text" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Email*</Label>
                                <CustomInput {...register("email")} required type="email" placeholder="ex: seuemail@email.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Senha*</Label>
                                <CustomInput {...register("password")} type="password" />
                            </div>
                        </div>
                        <Separator className="w-48 max-auto" />
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                className="transition-all duration-200 relative group/btn bg-secondary text-background block w-full rounded-md h-10 font-medium"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Carregando..." : "Criar Conta"}
                                <BottomGradient />
                            </button>
                            <Link href="/auth/login">
                                <p className="text-center text-sm text-primary hover:underline">
                                    Já possui uma conta? <span className="font-bold">Faça login.</span>
                                </p>
                            </Link>
                        </div>
                        <p className="px-8 mt-auto text-center text-sm text-muted-foreground">
                            Ao clicar em criar conta, você aceita nossos{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary">
                                Termos de Serviço
                            </Link>{" "} e {" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Política de Privacidade
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </form>
            <BackgroundBeams />
        </div >
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-[5px] inset-x-0 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </>
    );
};