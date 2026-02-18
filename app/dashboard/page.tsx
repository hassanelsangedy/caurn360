import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MarioGamification } from "@/components/gamification/mario-level";
import { OverworldMap } from "@/components/gamification/overworld-map";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Check role to potentially redirect managers immediately to their dashboard
    const userRole = (user.publicMetadata.role as string)?.toUpperCase();

    if (userRole === "GESTOR") {
        redirect("/dashboard/gestor");
    }

    // --- Patient View (Mario World Gamification) ---
    // In a real app, calculate current level based on assessments completed
    const currentLevel = 1;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Bem-vindo ao CAURN 360º, {user.firstName || "Associado"}!
                </h1>
                <p className="text-slate-500 text-lg">
                    Sua jornada de saúde gamificada começa aqui. Complete as fases para desbloquear benefícios.
                </p>
            </div>

            {/* Gamification Map (Overworld) */}
            <div className="w-full">
                <OverworldMap />
            </div>

            {/* Action Prompt */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Próxima Missão: Anamnese Inicial</h2>
                <p className="text-blue-600 mb-4">Complete o formulário inicial para avançar para o Nível 2 e receber sua avaliação de risco.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                    Começar Agora
                </button>
            </div>
        </div>
    );
}
