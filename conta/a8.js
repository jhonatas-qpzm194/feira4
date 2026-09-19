document.addEventListener("DOMContentLoaded", () => {
    carregarDadosContaBD();
});

async function carregarDadosContaBD() {
    try {
        const resposta = await fetch("/api/conta");
        if (!resposta.ok) throw new Error("Erro ao carregar os dados da conta");

        const dados = await resposta.json();
        preencherDadosConta(dados);
    } catch (erro) {
        console.error("Erro ao obter dados da base de dados:", erro);
        // Em caso de erro, define um avatar padrao para nao quebrar a imagem
        const fotoPerfil = document.getElementById("fotoPerfil");
        if (fotoPerfil) {
            fotoPerfil.src = "https://ui-avatars.com/api/?name=Usuario&background=6366f1&color=fff";
        }
    }
}

function preencherDadosConta(dados) {
    if (!dados) return;

    // Perfil Topo
    const exibicaoNome = document.getElementById("exibicaoNome");
    const exibicaoEmail = document.getElementById("exibicaoEmail");
    const fotoPerfil = document.getElementById("fotoPerfil");
    const badgeTextoPlano = document.getElementById("badgeTextoPlano");

    if (exibicaoNome) exibicaoNome.textContent = dados.nome || "";
    if (exibicaoEmail) exibicaoEmail.textContent = dados.email || "";
    if (badgeTextoPlano) badgeTextoPlano.textContent = dados.plano || "";
    
    // Define a foto vinda do BD ou um avatar padrão baseado no nome
    if (fotoPerfil) {
        if (dados.fotoUrl) {
            fotoPerfil.src = dados.fotoUrl;
        } else {
            const nomeAvatar = dados.nome || "Usuario";
            fotoPerfil.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeAvatar)}&background=6366f1&color=fff`;
        }
    }

    // Detalhes Pessoais
    const infoNome = document.getElementById("infoNome");
    const infoEmail = document.getElementById("infoEmail");
    const infoTelefone = document.getElementById("infoTelefone");
    const infoDataMembro = document.getElementById("infoDataMembro");

    if (infoNome) infoNome.textContent = dados.nome || "";
    if (infoEmail) infoEmail.textContent = dados.email || "";
    if (infoTelefone) infoTelefone.textContent = dados.telefone || "";
    if (infoDataMembro) infoDataMembro.textContent = dados.dataMembro || "";

    // Plano e Subscrição
    const nomePlano = document.getElementById("nomePlano");
    const dataRenovacao = document.getElementById("dataRenovacao");

    if (nomePlano) nomePlano.textContent = dados.plano || "";
    if (dataRenovacao) dataRenovacao.textContent = dados.dataRenovacao || "";
}