import Navbar from "@/components/shared/navbar/Navbar";

import dynamic from "next/dynamic";
export default function App() {
    //precisamos importar o editor dinamicamente para que o bundle do editor não seja carregado no bundle principal
    const Editor = dynamic(() => import("./(editor)/editor"), { ssr: false });

    return (
        <div className="h-screen w-full bg-background relative flex items-center justify-center">
            <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[700px] xl:w-[700px] 2xl:w-[900px]">
                <Navbar active="blog" />
                <div className="flex flex-col mt-24">
                    <Editor /> 
                </div>
            </div>
        </div>
    );
}
