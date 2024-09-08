import { Analytics } from "@vercel/analytics/react"

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Analytics />
        </>
    )
}