import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, TrendingUp, AlertTriangle } from "lucide-react"

interface Stats {
    totalPatients: number;
    assessmentsCount: number;
    highRiskCount: number;
    engagement: number;
}

export function StatsCards({ stats }: { stats: Stats }) {
    // If stats is undefined, provide defaults or loading state
    const { totalPatients, assessmentsCount, highRiskCount, engagement } = stats || { totalPatients: 0, assessmentsCount: 0, highRiskCount: 0, engagement: 0 };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total de Pacientes
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalPatients}</div>
                    <p className="text-xs text-muted-foreground">
                        +180 este mês
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Avaliações Realizadas
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{assessmentsCount}</div>
                    <p className="text-xs text-muted-foreground">
                        +201 desde a última semana
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Risco Evoque (Alto)</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{highRiskCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Necessitam atenção imediata
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Engajamento (Ativos)
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{engagement}%</div>
                    <p className="text-xs text-muted-foreground">
                        +4% em relação ao mês anterior
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
