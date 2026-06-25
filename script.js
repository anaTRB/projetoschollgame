const btnEntrar = document.getElementById("btnEntrar");
const inicio = document.getElementById("inicio");
const principal = document.getElementById("principal");

btnEntrar.addEventListener("click", () => {
    inicio.style.display = "none";
    principal.style.display = "block";
    mostrarArea("materias");
});

function mostrarArea(id) {
    document.querySelectorAll(".area").forEach(area => {
        area.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}

async function responderPergunta() {

    const pergunta = document.getElementById("pergunta").value;
    const respostaDiv = document.getElementById("resposta");

    if (!pergunta.trim()) {
        respostaDiv.innerHTML = "Digite uma pergunta.";
        return;
    }

    respostaDiv.innerHTML = "🤖 IA pensando...";

    try {

        const resposta = await fetch(
            "http://localhost:3000/perguntar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content:
                                "Você é um professor educacional que ajuda alunos de forma simples e clara."
                        },
                        {
                            role: "user",
                            content: pergunta
                        }
                    ]
                })
            }
        );

        const dados = await resposta.json();

        console.log(dados);

        if (!dados.choices) {
            respostaDiv.innerHTML =
                "❌ Erro da API. Veja o Console (F12).";
            return;
        }

        respostaDiv.innerHTML =
            "🤖 " + dados.choices[0].message.content;

    } catch (erro) {

        console.error(erro);

        respostaDiv.innerHTML =
            "❌ Erro ao conectar com a IA.";
    }
}

function atualizarRelogio() {

    const agora = new Date();

    const relogio = document.getElementById("relogio");

    if (relogio) {
        relogio.innerHTML =
            agora.toLocaleTimeString("pt-BR");
    }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

document.getElementById("pergunta")
.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        responderPergunta();
    }

});