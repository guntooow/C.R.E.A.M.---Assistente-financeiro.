// PieChartComponent.jsx
import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { Card } from "@/components/ui/card";

const PieChartComponent = ({ title, dataArray }) => {
    const COLORS = ['#4f46e5', '#3b82f6', '#10b981', '#ef4444', '#f59e0b'];

    return (
        <Card className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <PieChart width={700} height={300}>
                <Pie
                    data={dataArray}
                    dataKey="value"  // Define o valor que será representado em cada fatia
                    nameKey="name"   // Define o nome para cada fatia
                    cx="50%"         // Posiciona o centro da pizza no meio
                    cy="50%"         // Posiciona o centro da pizza no meio
                    innerRadius={60} // Raio interno (para criar o gráfico de "rosquinha" se desejar)
                    outerRadius={80} // Raio externo
                    paddingAngle={5} // Ângulo entre as fatias
                    label
                >
                    {/* Definir cores das fatias */}
                    {dataArray.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </Card>
    );
};

export default PieChartComponent;