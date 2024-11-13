import { Button } from "./ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowUpRight } from "lucide-react";
import { PiggyBankIcon as Logo } from "lucide-react";



const MainPage = () => {
    const data = new Date;
    const horas = data.getHours();
    let periodo = '';
    if (horas >= 0 && horas < 12) periodo = 'Bom dia!';
    if (horas >= 12 && horas < 19) periodo = 'Boa tarde!';
    if (horas >= 19 && horas < 24) periodo = 'Boa noite!';

    const redirect = () => {
        window.location.assign('/dashboard');
    }

    return (
        <>
            <div className="flex flex-col items-center h-screen w-screen gap-8">
                <div className="flex items-center gap-4 p-96 border-b-[0.15rem] border-zinc-100 w-full">
                    <Logo className="h-64 w-64 -rotate-6 stroke-zinc-100" />
                    <div className="flex flex-col gap-2">
                        <p className="h-fit w-fit text-8xl font-bold text-left text-zinc-100"> Bem-Vindo(a) ao <br></br> C.R.E.A.M. </p>
                        <p className="h-fit w-fit text-2xl font-light text-left text-zinc-100"> Se custa sua paz, já custa demais.</p>
                        <Button className="w-fit font-extralight" onClick={redirect} variant="outline">Use CREAM <ArrowUpRight /></Button>
                    </div>
                </div>
                <section className="flex flex-col items-center gap-4 p-16">
                    <div className="text-center text-zinc-100">
                        <p className="h-fit w-fit text-4xl font-semibold">{periodo} Como posso te ajudar hoje?</p>
                    </div>

                    <div className="w-full max-w-lg text-2xl">
                        <Accordion type="single" collapsible="true" className="text-zinc-100 w-full font-light">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>O que o C.R.E.A.M. pode fazer?</AccordionTrigger>
                                <AccordionContent>Definir seus compromissos do mês de maneira prática, e, posteriormente, permite consultá-los
                                    objetivamente.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>De onde advem o nome: "C.R.E.A.M."?</AccordionTrigger>
                                <AccordionContent>A ideia surgiu a partir de uma música da "Wu Tang Clan" e significa: Cash Rules Everything Around Me
                                    (O dinheiro controla tudo ao meu redor, em tradução livre).
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Qual a finalidade da criação do projeto</AccordionTrigger>
                                <AccordionContent>C.R.E.A.M. foi criado para a conclusão do curso de A.D.S. do CCPA.</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
            </div>
        </>
    )
}

export default MainPage