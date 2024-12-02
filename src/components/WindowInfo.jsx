import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

function generateUUID() { return Math.random().toString(36).substr(2, 6).toUpperCase(); };

const Windowinfo = ({ name, description, price, date, type, setTotalDevido, totalDevido }) => {
    const UUID = generateUUID();    
    const today = new Date();
    const [year, month, day] = date.split("-"); // Imput type=date retorna => YYYY-MM-DD não DD-MM-YYYY
    const deadline = new Date(year, month - 1, day);
    const msLeft = deadline - today;
    let daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
        daysLeft = `${daysLeft} dias`;
    } else if (daysLeft === 0) {
        daysLeft = "Hoje";
    } else {
        daysLeft = `A data já passou - ${daysLeft * (-1)} dia(s) `;
    }

    const [isOpen, setIsOpen] = useState(false);

    const preco = Number(price).toFixed(2);

    function deleteWindow(e, name, price) {
        e.preventDefault();

        let main = document.getElementById(UUID);
        if (main) {
            main.remove();
        }

        try {
            const array = JSON.parse(localStorage.getItem('windows')) || [];
            const updatedArray = array.filter((item) => item.name !== name);
            localStorage.setItem('windows', JSON.stringify(updatedArray));

            setTotalDevido((prevTotalDevido) => {
                return prevTotalDevido - parseFloat(price) || 0;
            });
        } catch (error) {
            console.error('Erro ao atualizar o localStorage:', error);
        } finally {
            setIsOpen(false);
        }
    }


    return (
        <div id={UUID} className="text-zinc-900 border-[0.1rem] border-zinc-900 p-6 rounded-lg flex flex-col w-96 gap-1 relative">
            <div className="flex justify-between">
                <h1 id="name" className="text-zinc-900 text-2xl font-semibold overflow-ellipsis">{name}</h1>
                <h1 className="font-bold">{type}</h1>
            </div>
            <p className="text-zinc-900 text-sm font-light overflow-ellipsis">{description}</p>
            <h1 className="text-4xl font-bold">R${preco}</h1>
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <h1 className="text-md font-semibold flex items-end gap-2"><Clock className="stroke-2" /> {daysLeft}</h1>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="border-zinc-900" variant="outline"><Trash className="text-zinc-900"/></Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tem certeza que quer excluir esse compromisso?</DialogTitle>
                            <DialogDescription>Não é possível recuperar uma janela excluída.</DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={(e) => { deleteWindow(e, name, price) }}>Excluir</Button>
                            <DialogClose>
                                <Button>Cancelar</Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Windowinfo;
