document.addEventListener('DOMContentLoaded', () => {
    const botoesTab = document.querySelectorAll('.tab-btn');
    const paineisTab = document.querySelectorAll('.painel-tab');
    const btnGuardar = document.getElementById('btnGuardarConfig');
    const statusSalvamento = document.querySelector('.status-salvamento');
    const selectTema = document.getElementById('selectTema');
    const selectMoeda = document.getElementById('selectMoeda');
    const selectIdioma = document.getElementById('selectIdioma');
    const btnLimparDados = document.getElementById('btnLimparDados');

    const tituloCardGeral = document.getElementById('tituloCardGeral');
    const subTextoGeral = document.getElementById('subTextoGeral');
    const lblMoeda = document.getElementById('lblMoeda');
    const lblData = document.getElementById('lblData');
    const lblTema = document.getElementById('lblTema');
    const lblIdioma = document.getElementById('lblIdioma');

    botoesTab.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesTab.forEach(b => b.classList.remove('ativo'));
            paineisTab.forEach(p => p.classList.remove('ativo'));

            botao.classList.add('ativo');
            const alvoId = botao.getAttribute('data-alvo');
            const painelAlvo = document.getElementById(alvoId);
            if (painelAlvo) {
                painelAlvo.classList.add('ativo');
            }
        });
    });

    const temaSalvo = localStorage.getItem('utilizadorTema') || 'midnight';
    if (selectTema) selectTema.value = temaSalvo;
    aplicarTema(temaSalvo);

    function aplicarTema(tema) {
        document.body.classList.remove('theme-midnight', 'theme-light', 'theme-dark');
        if (tema === 'light') {
            document.body.classList.add('theme-light');
        } else {
            document.body.classList.add('theme-midnight');
        }
    }

    if (selectTema) {
        selectTema.addEventListener('change', (e) => {
            aplicarTema(e.target.value);
        });
    }

    const traducoes = {
        pt: {
            titulo: "Preferências Regionais e Aparência",
            sub: "Personalize a forma como os dados são exibidos no seu painel.",
            m: "Moeda Padrão do Sistema",
            d: "Formato de Data",
            t: "Tema da Interface",
            i: "Idioma Principal",
            btn: "Salvar Todas as Configurações"
        },
        en: {
            titulo: "Regional Preferences and Appearance",
            sub: "Customize how data is displayed on your dashboard.",
            m: "System Default Currency",
            d: "Date Format",
            t: "Interface Theme",
            i: "Primary Language",
            btn: "Save All Settings"
        }
    };

    function aplicarIdioma(lang) {
        const txt = traducoes[lang] || traducoes.pt;

        if (tituloCardGeral) tituloCardGeral.textContent = txt.titulo;
        if (subTextoGeral) subTextoGeral.textContent = txt.sub;
        if (lblMoeda) lblMoeda.textContent = txt.m;
        if (lblData) lblData.textContent = txt.d;
        if (lblTema) lblTema.textContent = txt.t;
        if (lblIdioma) lblIdioma.textContent = txt.i;
        if (btnGuardar) btnGuardar.textContent = txt.btn;
    }

    const idiomaSalvo = localStorage.getItem('utilizadorIdioma') || 'pt';
    if (selectIdioma) {
        selectIdioma.value = idiomaSalvo;
        aplicarIdioma(idiomaSalvo);

        selectIdioma.addEventListener('change', (e) => {
            const novoIdioma = e.target.value;
            localStorage.setItem('utilizadorIdioma', novoIdioma);
            aplicarIdioma(novoIdioma);
        });
    }

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            if (statusSalvamento) {
                statusSalvamento.textContent = "⚠️ Alterações não guardadas";
                statusSalvamento.style.color = "#f59e0b";
            }
        });
    });

    if (btnLimparDados) {
        btnLimparDados.addEventListener('click', async () => {
            const confirmar = confirm("Tem certeza absoluta de que deseja apagar todas as receitas, despesas e dados do banco de dados para esta conta?");
            if (!confirmar) return;

            const emailUtilizadorAtual = localStorage.getItem('utilizadorLogadoEmail');
            if (!emailUtilizadorAtual) {
                alert("Nenhum utilizador ativo encontrado.");
                return;
            }

            try {
                const resDespesas = await fetch(`http://localhost:50100/api/despesas?email=${encodeURIComponent(emailUtilizadorAtual)}`, {
                    method: 'DELETE'
                });

                const resReceitas = await fetch(`http://localhost:50100/api/receitas?email=${encodeURIComponent(emailUtilizadorAtual)}`, {
                    method: 'DELETE'
                });

                if (resDespesas.ok && resReceitas.ok) {
                    localStorage.removeItem('utilizadorTema');
                    localStorage.removeItem('utilizadorIdioma');

                    alert("Dados apagados do banco de dados com sucesso!");
                    if (statusSalvamento) {
                        statusSalvamento.textContent = "✅ Dados apagados do banco";
                        statusSalvamento.style.color = "#10b981";
                    }

                    setTimeout(() => {
                        window.location.href = '../telaprincipal/a.html';
                    }, 1000);
                } else {
                    alert("O servidor não conseguiu concluir a exclusão dos dados.");
                }

            } catch (erro) {
                console.error("Erro ao limpar dados:", erro);
                alert("Falha de comunicação com a API ao tentar apagar os dados.");
            }
        });
    }

    if (btnGuardar) {
        btnGuardar.addEventListener('click', async () => {
            const moeda = selectMoeda ? selectMoeda.value : 'BRL';
            const tema = selectTema ? selectTema.value : 'midnight';
            const idioma = selectIdioma ? selectIdioma.value : 'pt';

            localStorage.setItem('utilizadorTema', tema);
            localStorage.setItem('utilizadorIdioma', idioma);

            const emailUtilizadorAtual = localStorage.getItem('utilizadorLogadoEmail') || "config@email.com";

            try {
                const resposta = await fetch('http://localhost:50100/api/conta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: `Config: ${moeda} / ${tema} / ${idioma}`,
                        email: emailUtilizadorAtual,
                        telefone: tema,
                        dataMembro: "2026",
                        plano: "ConfiguracaoAvancada",
                        dataRenovacao: "2026",
                        fotoUrl: ""
                    })
                });

                if (resposta.ok) {
                    if (statusSalvamento) {
                        statusSalvamento.textContent = "✅ Todas as configurações foram guardadas";
                        statusSalvamento.style.color = "#10b981";
                    }
                    alert("Configurações avançadas salvas com sucesso!");
                } else {
                    alert("Erro ao comunicar com o servidor.");
                }
            } catch (erro) {
                console.error("Erro:", erro);
                alert("Falha na conexão com a API.");
            }
        });
    }
});