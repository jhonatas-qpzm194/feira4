document.addEventListener("DOMContentLoaded", () => {
    carregarConfiguracoes();
    inicializarModalSenha();

    const btnSalvar = document.getElementById("btnSalvarConfig");
    if (btnSalvar) {
        btnSalvar.addEventListener("click", salvarConfiguracoes);
    }
});

/* Configurações Gerais */
function carregarConfiguracoes() {
    const usuarioMock = {
        nome: "",
        email: "",
        moeda: "BRL",
        limiteAlerta: 80,
        notifEmail: true,
        notifVencimento: true
    };

    const nomeEl = document.getElementById("nomeUsuario");
    const emailEl = document.getElementById("emailUsuario");
    const moedaEl = document.getElementById("moedaPadrao");
    const limiteEl = document.getElementById("limiteAlerta");
    const notifEmailEl = document.getElementById("notifEmail");
    const notifVencEl = document.getElementById("notifVencimento");

    if (nomeEl) nomeEl.value = usuarioMock.nome;
    if (emailEl) emailEl.value = usuarioMock.email;
    if (moedaEl) moedaEl.value = usuarioMock.moeda;
    if (limiteEl) limiteEl.value = usuarioMock.limiteAlerta;
    if (notifEmailEl) notifEmailEl.checked = usuarioMock.notifEmail;
    if (notifVencEl) notifVencEl.checked = usuarioMock.notifVencimento;
}

function salvarConfiguracoes() {
    const config = {
        nome: document.getElementById("nomeUsuario")?.value,
        email: document.getElementById("emailUsuario")?.value,
        moeda: document.getElementById("moedaPadrao")?.value,
        limiteAlerta: document.getElementById("limiteAlerta")?.value,
        notifEmail: document.getElementById("notifEmail")?.checked,
        notifVencimento: document.getElementById("notifVencimento")?.checked
    };

    console.log("Configurações salvas:", config);
}

/* Lógica do Modal de Senha Integrado */
function inicializarModalSenha() {
    const modal = document.getElementById("modalSenha");
    const btnAbrir = document.getElementById("btnAlterarSenha");
    const btnFechar = document.getElementById("btnFecharModal");
    const btnCancelar = document.getElementById("btnCancelar");
    const formSenha = document.getElementById("formAlterarSenha");

    // Abrir e fechar modal
    if (btnAbrir) btnAbrir.addEventListener("click", () => modal.classList.add("ativo"));
    
    const fecharModal = () => {
        modal.classList.remove("ativo");
        if (formSenha) formSenha.reset();
        resetarIndicadorForca();
    };

    [btnFechar, btnCancelar].forEach(btn => btn?.addEventListener("click", fecharModal));

    // Alternar visibilidade da senha (ícone de olho)
    document.querySelectorAll(".toggle-senha").forEach(icone => {
        icone.addEventListener("click", () => {
            const idAlvo = icone.getAttribute("data-target");
            const input = document.getElementById(idAlvo);
            if (input.type === "password") {
                input.type = "text";
                icone.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                input.type = "password";
                icone.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    });

    // Medidor de força da senha
    const inputNovaSenha = document.getElementById("novaSenha");
    inputNovaSenha?.addEventListener("input", () => {
        const val = inputNovaSenha.value;
        const barraForca = document.getElementById("barraForca");
        const textoForca = document.getElementById("textoForca");

        if (!val) {
            resetarIndicadorForca();
            return;
        }

        let forca = 0;
        if (val.length >= 8) forca += 25;
        if (/[A-Z]/.test(val)) forca += 25;
        if (/[0-9]/.test(val)) forca += 25;
        if (/[^A-Za-z0-9]/.test(val)) forca += 25;

        barraForca.style.width = forca + "%";

        if (forca <= 25) {
            barraForca.style.backgroundColor = "#f87171";
            textoForca.textContent = "Senha Fraca";
        } else if (forca <= 75) {
            barraForca.style.backgroundColor = "#fbbf24";
            textoForca.textContent = "Senha Média";
        } else {
            barraForca.style.backgroundColor = "#34d399";
            textoForca.textContent = "Senha Forte";
        }
    });

    // Submissão do formulário de senha
    if (formSenha) {
        formSenha.addEventListener("submit", (e) => {
            e.preventDefault();
            const novaSenha = document.getElementById("novaSenha").value;
            const confirmarSenha = document.getElementById("confirmarSenha").value;
            const erroConfirmacao = document.getElementById("erroConfirmacao");

            if (novaSenha !== confirmarSenha) {
                erroConfirmacao.style.display = "block";
                return;
            }

            erroConfirmacao.style.display = "none";
            alert("Senha alterada com sucesso!");
            fecharModal();
        });
    }
}

function resetarIndicadorForca() {
    const barraForca = document.getElementById("barraForca");
    const textoForca = document.getElementById("textoForca");
    const erroConfirmacao = document.getElementById("erroConfirmacao");

    if (barraForca) barraForca.style.width = "0%";
    if (textoForca) textoForca.textContent = "Força da senha";
    if (erroConfirmacao) erroConfirmacao.style.display = "none";
}