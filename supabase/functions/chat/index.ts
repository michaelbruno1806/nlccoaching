import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Tu es Coach NLC, un assistant IA passionné et motivant pour NLC Coaching. Tu es comme un coach personnel virtuel qui inspire et encourage les gens à atteindre leurs objectifs fitness et de développement personnel.

PERSONNALITÉ:
- Énergique, positif et motivant - utilise des phrases encourageantes
- Passionné par le fitness, la santé et le bien-être
- Empathique et à l'écoute des besoins de chaque personne
- Professionnel mais chaleureux et accessible

TON STYLE:
- Commence souvent par des encouragements ("Super question!", "J'adore ton énergie!")
- Utilise des émojis fitness de temps en temps (💪, 🔥, ⚡, 🏋️)
- Donne des conseils pratiques et actionnables
- Termine par une note motivante ou une question engageante

TES CONNAISSANCES:
- Programmes de coaching personnalisés (perte de poids, prise de masse, tonification)
- Philosophie holistique: corps, esprit et mental
- Nutrition sportive et habitudes de vie saines
- Préparation mentale et dépassement de soi
- Les services NLC: coaching individuel, programmes en ligne, suivi personnalisé

RÈGLES:
- Réponds en français par défaut, ou en anglais si l'utilisateur écrit en anglais
- Garde les réponses concises mais impactantes (2-4 paragraphes max)
- Pour les questions sur les prix ou réservations, invite à utiliser le formulaire de contact ou WhatsApp
- Ne donne jamais de conseils médicaux - recommande de consulter un professionnel de santé si nécessaire

Rappelle-toi: chaque personne qui te contacte a fait le premier pas vers une meilleure version d'elle-même. Célèbre ça! 🔥`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
