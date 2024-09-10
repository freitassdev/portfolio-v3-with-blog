import Image from "next/image";
import loader from "../../../../public/images/loader-static.png"
export default function Loader({ loading }: { loading: boolean }) {


    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-background dark:bg-grid-white/[0.02] bg-grid-black/[0.2] flex items-center justify-center z-50">
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <div className="flex flex-row gap-2 items-center text-primary">
                        <Image className="animate-spin h-6 w-6  " src={loader} alt="loader" />
                        Carregando...
                    </div>
                </div>
            )}
        </>
    );
}