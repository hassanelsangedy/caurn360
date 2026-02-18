import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/neon";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PatientsChart } from "@/components/dashboard/patients-chart";
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart";
import { CostSavingsChart } from "@/components/dashboard/cost-savings-chart";
import { Suspense } from "react";
import { FeatureRequestBoard } from "@/components/dashboard/feature-request-board";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Helper to get month name
const getMonthName = (monthIndex: number) => {
    const date = new Date();
    date.setMonth(monthIndex);
    return date.toLocaleString('default', { month: 'long' });
};

async function getDashboardData() {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    // Parallel data fetching for performance
    const [totalPatients, assessmentsCount, highRiskCount, allPatientsThisYear] = await Promise.all([
        db.patientProfile.count(),
        db.assessment.count(),
        db.patientProfile.count({
            where: {
                riskLevel: "VERMELHA",
            },
        }),
        db.patientProfile.findMany({
            where: {
                createdAt: {
                    gte: startOfYear,
                    lte: endOfYear,
                }
            },
            select: {
                createdAt: true
            }
        })
    ]);

    // Engagement logic (placeholder or real logic)
    const engagement = totalPatients > 0 ? Math.round((assessmentsCount / totalPatients) * 100) : 0;

    // Process Chart Data
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
        return { month: getMonthName(i), patients: 0 };
    });

    allPatientsThisYear.forEach(p => {
        const month = p.createdAt.getMonth();
        if (month < 6) {
            monthlyData[month].patients += 1;
        }
    });

    return {
        stats: {
            totalPatients,
            assessmentsCount,
            highRiskCount,
            engagement,
        },
        chartData: monthlyData
    };
}

export default async function ManagerDashboard() {
    const user = await currentUser();

    if (!user) return redirect("/sign-in");

    // Verify Role
    const role = (user.publicMetadata?.role as string)?.toUpperCase();
    if (role !== "GESTOR") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <div className="bg-red-100 p-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Acesso Restrito</h1>
                <p className="text-slate-500 max-w-md text-center">
                    Esta área é exclusiva para gestores do CAURN 360º. Se você acredita que deveria ter acesso, contate o administrador.
                </p>
                <a href="/dashboard" className="text-blue-600 hover:underline">Voltar ao Painel Principal</a>
            </div>
        );
    }

    const { stats, chartData } = await getDashboardData();

    return (
        <div className="flex flex-col space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard de Gestão</h1>
                    <p className="text-slate-500">Visão geral da saúde da população e alertas.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full border shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-600">
                        Dados em Tempo Real
                    </span>
                </div>
            </div>

            {/* Dashboard Tabs Structure */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="analytics">Análise de Risco</TabsTrigger>
                    <TabsTrigger value="features">Sugestões (Roadmap)</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    {/* Stats Cards Row */}
                    <Suspense fallback={<div className="h-32 bg-slate-100 rounded animate-pulse"></div>}>
                        <StatsCards stats={stats} />
                    </Suspense>

                    {/* Main Overview Charts */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4 shadow-sm border rounded-xl bg-white overflow-hidden p-4">
                            <Suspense fallback={<div className="h-[300px] bg-slate-100 rounded animate-pulse"></div>}>
                                <PatientsChart data={chartData} />
                            </Suspense>
                        </div>

                        {/* Cost Savings Chart - Compact View */}
                        <div className="col-span-3 shadow-sm border rounded-xl bg-white overflow-hidden p-4">
                            <Suspense fallback={<div className="h-[300px] bg-slate-100 rounded animate-pulse"></div>}>
                                <CostSavingsChart />
                            </Suspense>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-1 h-[400px]">
                            <RiskDistributionChart />
                        </div>
                        <div className="col-span-2 shadow-sm border rounded-xl bg-white p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Detalhamento dos Grupos de Risco</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                                    <h4 className="font-bold text-red-800">Grupo Vermelho (Urgente)</h4>
                                    <p className="text-sm text-red-700">Idosos com sarcopenia confirmada e sinais de depressão (DASS-21 {'>'} 14). Necessitam intervención multidisciplinar.</p>
                                </div>
                                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                                    <h4 className="font-bold text-yellow-800">Grupo Amarelo (Atenção)</h4>
                                    <p className="text-sm text-yellow-700">Início de perda de força ou isolamento social. Recomendação: Grupos de atividade da CAURN.</p>
                                </div>
                                <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                                    <h4 className="font-bold text-green-800">Grupo Verde (Manutenção)</h4>
                                    <p className="text-sm text-green-700">Autônomos e ativos. Monitoramento anual apenas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="features">
                    <div className="grid gap-6 md:grid-cols-2">
                        <FeatureRequestBoard />
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4">Roadmap de Desenvolvimento</h3>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                                <li>Integração com WhatsApp via Evolution API (Em andamento)</li>
                                <li>Módulo de Telemedicina (Planejado - Q3 2026)</li>
                                <li>App Mobile Nativo (Planejado - Q4 2026)</li>
                            </ul>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
