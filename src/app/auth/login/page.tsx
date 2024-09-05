import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import LoginForm from "@/components/auth/login-form/login-form"
import { Meteors } from "@/components/shared/meteors/meteors"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Login - Michel de Freitas",
  description: "Login page",
}

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-row w-full h-screen">
        <div className="flex flex-col w-1/2 h-full bg-muted/60">
        <Meteors number={50} />
        </div>
        <div className="w-1/2 h-full">

        </div>
      </div>
    </>
  )
}