"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export interface CustomInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ className, type, ...props }, ref) => {
        const radius = 100; // change this to increase the rdaius of the hover effect
        const [visible, setVisible] = React.useState(false);
        const [togglePassword, setTogglePassword] = React.useState(type);

        let mouseX = useMotionValue(0);
        let mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: any) {
            let { left, top } = currentTarget.getBoundingClientRect();

            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }
        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-300),
          transparent 80%
        )
      `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="relative p-[2px] rounded-lg transition duration-300 group/input"
            >
                <input
                    type={togglePassword}
                    className={cn(
                        `flex h-10 w-full border-none bg-card text-primary shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-foreground 
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-muted
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--slate-700)]
           group-hover/input:shadow-none transition duration-400
           `,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {type === "password" && <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {togglePassword !== type
                        ? <EyeOff
                            className="text-foreground cursor-pointer"
                            onClick={() => setTogglePassword("password")} />
                        : <Eye
                            className="text-foreground cursor-pointer"
                            onClick={() => setTogglePassword("text")} />
                    }
                </div>}
            </motion.div>
        );
    }
);
CustomInput.displayName = "CustomInput";

export { CustomInput };
