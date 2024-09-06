"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
// const res = await fetch("/api/auth/register", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(userInfo)
// });

// if (res.ok) {
//     setPending(false);
//     ref?.current?.reset();
//     router.push('/auth/login')
//     console.log("User registration done");
// } else {
//     const errorData = await res.json();
//     setError(errorData.message);
//     console.log('Something went wrong in else block');
//     setPending(false);
// }


export default function SignUpPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className="w-full h-screen grid grid-cols-2">
            <div className="w-full h-screen bg-card">
                        <div>
                            
                        </div>
            </div>
            <div className="w-full h-screen bg-background p-10">
                <p>teste</p>
            </div>
        </div>
    )
}