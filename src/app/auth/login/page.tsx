"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form"
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserLoginSchema, zodUserLoginType } from '../../../zod/types';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-hot-toast';
import logo from '../../../../public/images/logo-resources/logo-light-192x192.png';
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<zodUserLoginType>({
        resolver: zodResolver(UserLoginSchema),
    })

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const onSubmit = async (data: zodUserLoginType) => {
        setLoading(true);

        if (!data.email || !data.password) {
            setLoading(false);
            return toast.error("Insira todos os campos!");
        }


        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: process.env.NEXTAUTH_URL
        });

        if (!res || !res.ok) {
            setLoading(false);
            return toast.error("Erro ao fazer login.");
        }

        if (res.error) {
            setLoading(false);
            return toast.error("Email ou senha incorretos!");
        }

        setLoading(false);
        return router.replace('/'); //caso tenha algum erro
    }

    useEffect(() => {
        for (const error in errors) {
            const errorMessage = errors[error as keyof FieldErrors<zodUserLoginType>]?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }, [errors])

    return (
        <div className="w-full h-screen flex flex-row justify-center items-center">
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="z-10 h-auto w-auto p-4 rounded-2xl border border-border bg-background/80 backdrop-blur-[7px]">
                <div className="lg:p-8 h-full">
                    <div className="mx-auto flex h-full flex-col items-center justify-center space-y-6 w-auto max-w-[350px]">
                        <div className="flex flex-col items-center space-y-2 text-center">
                            <Image className="w-20 h-20" src={logo} alt="logo" />
                            <h1 className="text-3xl font-semibold tracking-tight">
                                Fazer Login
                            </h1>
                            <p className="text-md text-muted-foreground">
                                Insira suas informações abaixo para entrar.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-2">
                                <Label>Email*</Label>
                                <CustomInput {...register("email", {
                                    required: true
                                })} required type="email" placeholder="ex: seuemail@email.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Senha*</Label>
                                <CustomInput {...register("password")} type="password" />
                                <Label className="text-muted-foreground">Esqueceu sua senha?</Label>
                            </div>
                        </div>
                        <Separator className="w-48 max-auto" />
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                className="transition-all duration-200 relative group/btn bg-secondary text-background block w-full rounded-md h-10 font-medium"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Carregando..." : "Fazer Login"}
                                <BottomGradient />
                            </button>
                            <Link href="/auth/signup">
                                <p className="text-center text-sm text-primary hover:underline">
                                    Ainda não tem uma conta? <span className="font-bold">Crie uma!</span>
                                </p>
                            </Link>
                        </div>
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