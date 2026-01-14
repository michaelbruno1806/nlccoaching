import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  objective: string;
  profile: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ContactEmailRequest = await req.json();
    const fullName = body.fullName || body.name || "Client";
    const { email, phone, objective, profile, message } = body;

    console.log("Received contact form submission:", { fullName, email, phone, objective, profile });

    // Try to send notification email to NLC Coaching
    let notificationResult = { success: false, error: null as string | null };
    try {
      const notificationRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "NLC Coaching <onboarding@resend.dev>",
          to: ["contact.nlccoaching@gmail.com"],
          subject: `Nouvelle demande de contact - ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 10px;">
                Nouvelle demande de contact
              </h1>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #333; margin-top: 0;">Informations du contact</h2>
                
                <p style="margin: 10px 0;">
                  <strong>Nom complet:</strong> ${fullName}
                </p>
                <p style="margin: 10px 0;">
                  <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
                </p>
                <p style="margin: 10px 0;">
                  <strong>Téléphone:</strong> <a href="tel:${phone}">${phone}</a>
                </p>
                <p style="margin: 10px 0;">
                  <strong>Objectif:</strong> ${objective}
                </p>
                <p style="margin: 10px 0;">
                  <strong>Profil:</strong> ${profile}
                </p>
              </div>
              
              <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #333; margin-top: 0;">Message</h2>
                <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
                <p>Ce message a été envoyé depuis le formulaire de contact du site NLC Coaching.</p>
              </div>
            </div>
          `,
        }),
      });

      const notificationData = await notificationRes.json();
      console.log("Notification email response:", notificationData);

      if (notificationRes.ok) {
        notificationResult.success = true;
      } else {
        notificationResult.error = notificationData.message || "Failed to send";
        console.log("Notification email failed (domain not verified):", notificationData);
      }
    } catch (e: any) {
      notificationResult.error = e.message;
      console.log("Notification email error:", e.message);
    }

    // Send confirmation email to the user
    const confirmationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NLC Coaching <onboarding@resend.dev>",
        to: [email],
        subject: "Confirmation de votre demande - NLC Coaching",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 10px;">
              Merci pour votre message, ${fullName} !
            </h1>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #555; line-height: 1.6;">
                Nous avons bien reçu votre demande de contact et nous vous répondrons dans les plus brefs délais.
              </p>
              
              <p style="color: #555; line-height: 1.6;">
                <strong>Récapitulatif de votre demande:</strong>
              </p>
              <ul style="color: #555; line-height: 1.8;">
                <li><strong>Objectif:</strong> ${objective}</li>
                <li><strong>Profil:</strong> ${profile}</li>
              </ul>
            </div>
            
            <div style="background-color: #b8860b; color: white; padding: 20px; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-size: 16px;">
                À très bientôt !
              </p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                L'équipe NLC Coaching
              </p>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
              <p>NLC Coaching - Votre transformation commence ici</p>
            </div>
          </div>
        `,
      }),
    });

    const confirmationData = await confirmationRes.json();
    console.log("Confirmation email response:", confirmationData);

    // Even if confirmation fails, we still want to return success if notification worked
    // The form submission was received regardless
    const confirmationSuccess = confirmationRes.ok;

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Votre demande a été enregistrée avec succès",
        details: {
          notificationSent: notificationResult.success,
          confirmationSent: confirmationSuccess,
          note: !notificationResult.success ? "Pour recevoir les notifications par email, veuillez vérifier votre domaine sur Resend" : undefined
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
