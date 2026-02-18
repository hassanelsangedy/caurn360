"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartDataPoint {
    month: string;
    patients: number;
}

interface PatientsChartProps {
    data?: ChartDataPoint[];
}

const defaultChartData = [
    { month: "January", patients: 186 },
    { month: "February", patients: 305 },
    { month: "March", patients: 237 },
    { month: "April", patients: 73 },
    { month: "May", patients: 209 },
    { month: "June", patients: 214 },
]

const chartConfig = {
    patients: {
        label: "Patients",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function PatientsChart({ data = defaultChartData }: PatientsChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Novos Pacientes</CardTitle>
                <CardDescription>Janeiro - Junho 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="patients" fill="var(--color-patients)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
