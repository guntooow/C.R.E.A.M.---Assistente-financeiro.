import { useState } from "react"
import { useEffect } from "react";
import Windowinfo from "./WindowInfo";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DialogClose } from "@radix-ui/react-dialog";
import { Separator } from "./ui/separator";
import { MoveRight, PencilLine, PlusCircle } from "lucide-react";
import ChartTest from "./ChartTeste";


const Dashboard = () => {
    const [windowName, setWindowName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [date, setDate] = useState();
    const [type, setType] = useState();
    //
    const [isOpen, setIsOpen] = useState(false);
    const [windows, setWindows] = useState([]);
    //
    const [newIsOpen, setNewIsOpen] = useState(false);
    //
    let windowsArray = []
    //
    const [renda, setRenda] = useState(0);
    const [frozenRenda, setFrozenRenda] = useState();
    //

    useEffect(() => {
        try {
            const prevRenda = localStorage.getItem('renda');
            setRenda(prevRenda);
        } catch (err) {
            console.log(`ERRO AO BUSCAR RENDA: ${err}`);
        }
    }, []);

    const [totalDevido, setTotalDevido] = useState(0);

    useEffect(() => {
        let componentList = [];
        let somaTotal = 0;

        try {
            const array = JSON.parse(localStorage.getItem("windows"));
            console.log("Dados do localStorage:", array); // Verifique o conteúdo dos dados

            if (array && Array.isArray(array)) {
                for (let obj of array) {
                    console.log("Preço atual:", obj.price); // Verifique cada preço
                    const preComponent = (
                        <Windowinfo
                            key={obj.name}
                            name={obj.name}
                            description={obj.description}
                            price={obj.price}
                            date={obj.date}
                            type={obj.type}
                        />
                    );
                    componentList.push(preComponent);

                    // Garanta que o preço é um número válido
                    somaTotal += parseFloat(obj.price) || 0;
                }

                // Atualize o estado com a lista de componentes
                setWindows((prevWindows) => [...prevWindows, ...componentList]);

                // Atualize o estado da soma total
                setTotalDevido(somaTotal);
                console.log("Soma Total calculada:", somaTotal); // Verifique o valor final da soma
            }
        } catch (error) {
            console.log("Erro, novo usuário (localStorage vazio)", error);
        }
    }, []);



    const clean = () => {
        setWindowName('');
        setDescription('');
        setPrice('');
        setDate('');
        setType('');
    }

    const componentInfoFactory = () => {
        return {
            name: windowName,
            description: description,
            price: price,
            date: date,
            type: type,
        }
    }


    function localStorageSave() {
        const existingData = JSON.parse(localStorage.getItem("windows")) || [];
        const updatedArray = [...existingData, ...windowsArray];
        localStorage.setItem("windows", JSON.stringify(updatedArray));
    }

    function createComponent(e) {
        e.preventDefault()
        const component = <Windowinfo name={windowName} description={description} price={price} date={date} type={type} setTotalDevido={setTotalDevido} />
        setWindows([...windows, component]);
        windowsArray.push(componentInfoFactory());
        localStorageSave();
        setTotalDevido((prevTotalDevido) => {
            const valorAtual = prevTotalDevido + parseFloat(price) || 0;
            console.log(valorAtual); // Agora mostra o valor correto
            return valorAtual;
        });
        clean();
        setIsOpen(false);
    }

    function closeDialog(e) {
        e.preventDefault();
        setNewIsOpen(false);
        let frozenRendaFix = Number(frozenRenda).toFixed(2)
        localStorage.setItem('renda', frozenRendaFix)
        setRenda(frozenRendaFix);
    }


    ////////////////// MESA DE EXPERIMENTAÇÃO (consts ou vars aqui devem subir quando o trabalho relativo à elas terminarem) /////////////////



    let chartData = [
        { Nome: "Receita (R$)", Dinheiro: renda, color: '#4f46e5' },
        { Nome: "Gastos (R$)", Dinheiro: totalDevido, color: '#262354' },
        { Nome: "Saldo final (R$)", Dinheiro: renda - totalDevido, color: '#262354' }
    ];


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div className="container flex gap-4">
            <section className="text-zinc-100 w-screen h-screen">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    {/* Trigger que abre o Dialog */}
                    <DialogTrigger asChild>
                        <Button variant="outline"><PlusCircle /> Novo compromisso</Button>
                    </DialogTrigger>

                    {/* Conteúdo do Dialog */}
                    <DialogContent>
                        {/* Cabeçalho do Dialog */}
                        <DialogHeader>
                            <DialogTitle><p>Criar novo compromisso no painel!</p></DialogTitle>
                            <DialogClose /> {/* O ícone de fechar (X) agora funciona */}
                        </DialogHeader>
                        <DialogDescription>
                            <p>Adicione à lista de compromissos um novo item, mantenha-se atualizado!</p>
                        </DialogDescription>

                        {/* Formulário */}
                        <form className="flex flex-col gap-2" onSubmit={createComponent}>
                            <Label htmlFor="name">Nome do compromisso:</Label>
                            <Input
                                required
                                id="name"
                                value={windowName}
                                onChange={(e) => setWindowName(e.target.value)}
                                placeholder="Ex: Disco de vinil novo..."
                            />
                            <Label htmlFor="des">Descrição:</Label>
                            <Input
                                required
                                id="des"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ex: Comprei lá no centro..."
                            />
                            <Label htmlFor="price">Valor:</Label>
                            <Input
                                required
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Ex: XXX.XX"
                            />
                            <Label htmlFor="date">Data de cobrança:</Label>
                            <Input
                                required
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Ex: XX/XX"
                            />
                            <Label htmlFor="type">Tipo de cobrança:</Label>
                            <Select
                                required
                                id="type"
                                value={type}
                                onValueChange={setType}
                                className="w-full"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fixa">Fixa</SelectItem>
                                    <SelectItem value="Variável">Variável</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button type="submit">Enviar</Button>
                        </form>
                    </DialogContent>
                </Dialog>

                <ChartTest title="Entradas X Saídas" dataArray={chartData} />
            </section>
            <section className="flex flex-col gap-4 w-screen h-screen">
                <div className="flex gap-2 justify-end">
                    <Dialog open={newIsOpen} onOpenChange={setNewIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="p-3">
                                <PencilLine />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle> Editar renda disponível</DialogTitle>
                                <DialogDescription> Atualmente {`R$${renda}`}</DialogDescription>
                            </DialogHeader>
                            <form className="flex flex-col gap-3" onSubmit={closeDialog}>
                                <Label>Nova receita:</Label>
                                <div className="flex gap-2 items-center">
                                    <p className="font-semibold">R$</p>
                                    <Input placeholder="Ex: XXX.XX" required type="number" value={frozenRenda} onChange={(e) => setFrozenRenda(e.target.value)}></Input>
                                </div>
                                <Button type="submit">Confirmar</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <h1 className="text-zinc-50 flex items-center gap-2 text-md">Receita disponível <MoveRight /> R${renda}</h1>
                </div>
                <Separator />
                {windows}
            </section>
        </div>
    )
}

export default Dashboard