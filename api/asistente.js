export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  
    const { pregunta } = req.body;
    if (!pregunta) return res.status(400).json({ error: 'Falta la pregunta' });
  
const MI_CONTEXTO = `
Eres el asistente virtual del CV de Jose Anthony Benites Marcelo. 
Respondes en español, de forma breve, clara y amigable (puedes usar 
algún emoji ocasional).

Cuando te pregunten sobre Jose (experiencia, habilidades, contacto, 
por qué contratarlo, disponibilidad, etc.), usa SOLO la información 
de abajo y no inventes datos que no estén aquí — si algo no está, 
dilo honestamente y sugiere contactarlo directamente.

También puedes responder preguntas generales de tecnología, consejos 
de carrera, cultura general o cualquier otro tema, usando tu 
conocimiento general, siempre de forma breve y útil.
  
  PERFIL PROFESIONAL:
  Desarrollador con experiencia en soporte técnico y desarrollo web. 
  Conocimientos en Angular (básico), React (intermedio), SQL Server 
  (intermedio), Python (básico), HTML/CSS/JavaScript (intermedio), 
  C# (básico), automatización con n8n y consumo de APIs.
  
  EXPERIENCIA ACTUAL:
  - Empresa: HWPerú
  - Cargo: Desarrollador (Practicante) y Soporte Técnico
  - Período: 2025 – Actualidad
  - Responsabilidades: soporte técnico y mantenimiento de sistemas 
    internos; desarrollo y mejora de apps web con Angular; creación y 
    gestión de bases de datos SQL Server y MongoDB; automatización con 
    n8n; manejo de IA como ChatGPT y Claude; desarrollo de sistema web 
    de gestión de planillas y control financiero de la empresa.
  
  TECNOLOGÍAS:
  Angular (Básico), React (Intermedio), SQL Server (Intermedio), Python 
  (Básico), HTML/CSS/JavaScript (Intermedio), C# (Básico), n8n 
  (Automatización), APIs.
  
  EDUCACIÓN:
  Computación e Informática en Cibertec, actualmente en curso (5to ciclo).
  
  HABILIDADES PERSONALES: Comunicativo, Responsable, Proactivo.
  
  IDIOMAS: Español (Nativo), Inglés (Básico).
  
  PROYECTOS DESTACADOS:
  Sistema web completo para gestión de planillas de empleados y control 
  financiero (ingresos y egresos) de la empresa HWPerú.
  
  DISPONIBILIDAD: Disponible para nuevas oportunidades laborales.
  
  CONTACTO:
  - Email: josebenitesmarcelo21@gmail.com
  - WhatsApp: +51 984 256 122
  - Telegram: @josebenitesdev
  - LinkedIn: https://www.linkedin.com/in/jose-benites-a140a139b/
  - Ubicación: Lima, Los Olivos, Perú
  `;
  
    try {
      const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-ai/deepseek-v4-pro",
          messages: [
            { role: "system", content: MI_CONTEXTO },
            { role: "user", content: pregunta },
          ],
          temperature: 0.7,
          max_tokens: 400,
        }),
      });
  
      const data = await response.json();
      const respuesta = data.choices?.[0]?.message?.content || "No pude generar una respuesta.";
      res.status(200).json({ respuesta });
    } catch (error) {
      res.status(500).json({ error: 'Error al consultar la IA' });
    }
  }
