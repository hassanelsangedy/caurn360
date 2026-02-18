"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquarePlus } from "lucide-react";

export function FeatureRequestBoard() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            // Ideally this calls a Server Action to save feedback to Neon
            // e.g. await createFeedback(formData);
            console.log("Feedback submitted:", formData.get("title"));
            // Show toast success
        });
    };

    return (
        <Card className="h-full border-blue-100 bg-blue-50/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                    <MessageSquarePlus className="w-5 h-5" />
                    Sugestões de Melhoria
                </CardTitle>
                <CardDescription>
                    Ajude a evoluir o CAURN 360º. Sugira features para o roadmap.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Título da Ideia</label>
                        <Input name="title" placeholder="Ex: Relatório mensal via WhatsApp" required className="bg-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Descrição Detalhada</label>
                        <Textarea name="description" placeholder="Como isso ajudaria na gestão?" required className="bg-white min-h-[100px]" />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isPending}>
                        {isPending ? "Enviando..." : "Enviar Sugestão"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
