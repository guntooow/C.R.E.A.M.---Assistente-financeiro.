// ChartComponent.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";

const MODELO = [
    { name: "Jan", vendas: 4000 },
    { name: "Feb", vendas: 3000 },
    { name: "Mar", vendas: 2000 },
    { name: "Apr", vendas: 2780 },
    { name: "May", vendas: 1890 },
    { name: "Jun", vendas: 2390 },
];

const colors = ["#1E3A8A", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#8B5CF6"];

const ChartTest = ({ title, dataArray }) => {
    return (

        <Card className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <BarChart width={700} height={300} data={dataArray}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Nome" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Dinheiro" className="fill-zinc-900" radius={[10, 10, 0, 0]} fill={({ payload }) => payload.color || "#4f46e5"} />
            </BarChart>
        </Card>
    );
};

export default ChartTest;
