export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            erro: "Método não permitido."
        });
    }

    try {

        const resposta = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization":
                        `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: req.body.messages
                })
            }
        );

        const dados = await resposta.json();

        return res.status(200).json(dados);

    } catch (erro) {

        return res.status(500).json({
            erro: "Erro ao conectar com o Groq."
        });
    }
}