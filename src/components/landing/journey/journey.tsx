import BoxReveal from "@/components/magicui/box-reveal";
import { Timeline } from "@/components/ui/timeline";
import { timelineItems } from "./data/timeline-items"
export default function JourneySection() {

    return (
        <div className="flex flex-col max-w-full mx-auto w-full items-center justify-start mt-20">
            <div className="flex flex-row gap-2 justify-between">
                <BoxReveal boxColor={"#89cff0"} duration={0.5}>
                    <h1 className="max-sm:text-xl text-4xl font-semibold text-primary text-center">
                        Acompanhe os momentos da<br />
                        <span className="max-sm:text-5xl text-4xl md:text-[6rem] font-bold mt-1 leading-none whitespace-nowrap">
                            Minha Trajetória
                        </span>
                    </h1>
                </BoxReveal>
            </div>
            <div>
                <Timeline data={timelineItems}/>
            </div>
        </div>
    )
}