"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: 'Baixo Risco (Verde)', value: 1800, color: '#22c55e' }, // Green-500
    { name: 'Médio Risco (Amarelo)', value: 450, color: '#eab308' }, // Yellow-500
    { name: 'Alto Risco (Vermelho)', value: 120, color: '#ef4444' }, // Red-500
];

export function RiskDistributionChart() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Distribuição de Risco (Evoque)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => [`${value} Pacientes`, 'Quantidade']}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 text-xs text-slate-500 mt-4">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
