import Image from "next/image";

export default function CardContent() {
    return (
        <Image
            src="/images/linear.webp"
            alt="dummy image"
            width="1000"
            height="700"
            className="aspect-video object-cover object-left-top h-[60%] max-sm:h-[80%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    )
}