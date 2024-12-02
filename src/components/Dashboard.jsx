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
import { BadgeAlert, ChevronDown, MoveRight, PencilLine, PlusCircle, TrendingUp } from "lucide-react";
import ChartTest from "./ChartTeste";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";


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
                            setTotalDevido={setTotalDevido}
                            totalDevido={totalDevido}
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
        { Nome: "Saldo final (R$)", Dinheiro: renda - totalDevido, color: '#38a169' } 
    ];


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div className=" flex w-screen h-screen">
            <ScrollArea>
                <section className="text-zinc-100 rounded-xl flex flex-col gap-6 p-8 shadow-xl shadow-black">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="text-md p-2 h-32 w-full text-2xl"><PlusCircle className="scale-125"/> Novo compromisso</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle><p>Criar novo compromisso no painel!</p></DialogTitle>
                                <DialogClose />
                            </DialogHeader>
                            <DialogDescription>
                                <p>Adicione à lista de compromissos um novo item, mantenha-se atualizado!</p>
                            </DialogDescription>
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
                    
                    <div className="flex flex-col items-center gap-4 font-semibold">
                        <h1 className="text-3xl font-thin text-center">Análises gráficas</h1>
                        <ChevronDown className="scale-125 stroke-1"/>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {(renda - totalDevido > 0) && (totalDevido > 0) &&
                        <Alert className="bg-green-200">
                            <TrendingUp className="h-5 w-5" />
                            <AlertTitle>Tudo dentro dos conformes!</AlertTitle>
                            <AlertDescription className="flex gap-1">
                                Você ainda tem <p className="font-bold">R${(renda - totalDevido).toFixed(2)}</p> para gastar após as dívidas!
                            </AlertDescription>
                        </Alert>
                        }
                        {renda - totalDevido < 0 &&
                        <Alert className="bg-red-200">
                            <TrendingUp className="h-5 w-5" />
                            <AlertTitle>Ai... ultrapassamos o orçamento!</AlertTitle>
                            <AlertDescription className="flex gap-1 items-center">
                                Você deve <p className="font-bold">R${((renda - totalDevido) * -1).toFixed(2)}</p> à mais que sua receita...
                            </AlertDescription>
                        </Alert>
                        }
                        {(renda - totalDevido == 0 )&& (totalDevido > 0) &&
                        <Alert className="bg-yellow-200">
                            <BadgeAlert className="h-5 w-5" />
                            <AlertTitle>Na beira do precipício, atenção!</AlertTitle>
                            <AlertDescription className="flex gap-1 items-center">
                                Sua receita cobre integralmente sua dívida, sem nenhum centavo de sobra...
                            </AlertDescription>
                        </Alert>
                        }
                        {totalDevido == 0 &&
                        <Alert className="bg-blue-200">
                            <BadgeAlert className="h-5 w-5" />
                            <AlertTitle>Parece até começo de mês!</AlertTitle>
                            <AlertDescription className="flex gap-1 items-center">
                                    Ainda sem dívidas por enquanto, ufa...
                            </AlertDescription>
                        </Alert>
                        }
                        <ChartTest title="Entradas X Saídas" className="bg-offwhite" dataArray={chartData} />
                    </div>
                </section>
            </ScrollArea>
            <section className="flex flex-col gap-4 w-full h-full bg-offwhite p-4 overflow-scroll">
                <div className="flex justify-end">
                    <Dialog open={newIsOpen} onOpenChange={setNewIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="p-3 border-zinc-950 text-zinc-950">
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
                    <h1 className=" flex items-center gap-2 text-md p-2 text-zinc-950">Receita disponível <MoveRight /> R${renda}</h1>
                </div>
                <Separator className="border-t-2 border-zinc-950" />
                <div className="flex flex-col gap-4	items-center">
                 {windows}
                </div>
            </section>
        </div>
    )
}

export default Dashboard