"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingDown } from "lucide-react";

// Example simulation data
const data = [
    { month: 'Jan', real: 450000, ai: 420000 },
    { month: 'Fev', real: 480000, ai: 410000 },
    { month: 'Mar', real: 410000, ai: 400000 },
    { month: 'Abr', real: 520000, ai: 430000 }, // High real cost due to flu season?
    { month: 'Mai', real: 490000, ai: 440000 },
    { month: 'Jun', real: 470000, ai: 420000 },
];

export function CostSavingsChart() {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(value);
    };

    return (
        <Card className="h-full border-green-100 dark:border-green-900 bg-gradient-to-br from-white to-green-50/30">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-green-800">
                    <DollarSign className="w-5 h-5" />
                    Impacto Financeiro (Sinistralidade)
                </CardTitle>
                <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full border border-green-200">
                    <TrendingDown className="w-3 h-3" />
                    IA Estimada: -15%
                </div>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                            stroke="#64748B"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `R$${(value / 1000)}k`}
                        />
                        <Tooltip
                            formatter={(value: number) => [formatCurrency(value), 'Custo']}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line type="monotone" dataKey="real" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Custo Real" />
                        <Line type="monotone" dataKey="ai" stroke="#22C55E" strokeWidth={3} strokeDasharray="5 5" dot={false} name="Previsão IA (Otimizado)" />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-center text-xs text-slate-500 mt-4 italic">
                    *Linha pontilhada verde indica redução potencial ao aplicar intervenções preventivas sugeridas pela IA.
                </p>
            </CardContent>
        </Card>
    );
}
