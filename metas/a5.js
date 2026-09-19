document.addEventListener('DOMContentLoaded', () => {
    const inputDescricao = document.getElementById('inputDescricaoMeta');
    const inputValor = document.getElementById('inputValorMeta');
    const btnGuardar = document.getElementById('btnGuardarMeta');
    const containerLista = document.getElementById('containerListaMetas');

    if (inputValor) {
        inputValor.addEventListener('input', (e) => {
            let v = String(e.target.value).replace(/\D/g, '');
            v = (v / 100).toFixed(2) + '';
            v = v.replace('.', ',');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = 'R$ ' + v;
        });
    }

    async function salvarMeta() {
        const descricao = inputDescricao ? inputDescricao.value : '';
        const valor = inputValor ? inputValor.value : '';

        if (!descricao || !valor) {
            alert("Preencha todos os campos da meta.");
            return;
        }

        const emailUtilizadorAtual = localStorage.getItem('utilizadorLogadoEmail');

        if (!emailUtilizadorAtual) {
            alert("Nenhuma conta iniciada. Por favor, aceda à página de Conta.");
            return;
        }

        const dados = {
            nome: descricao,
            email: emailUtilizadorAtual,
            telefone: valor,
            dataMembro: "2026",
            plano: "Meta",
            dataRenovacao: "2026",
            fotoUrl: ""
        };

        try {
            const resposta = await fetch('http://localhost:50100/api/conta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                alert(`Meta guardada com sucesso na conta: ${emailUtilizadorAtual}`);
                if (inputDescricao) inputDescricao.value = '';
                if (inputValor) inputValor.value = '';
                carregarMetas();
            } else {
                const textoErro = await resposta.text();
                alert("Erro ao guardar meta. Detalhe: " + textoErro);
            }
        } catch (erro) {
            console.error("Erro de rede:", erro);
            alert("Falha na conexão com o servidor.");
        }
    }

    async function carregarMetas() {
        if (!containerLista) return;

        const emailUtilizadorAtual = localStorage.getItem('utilizadorLogadoEmail');
        if (!emailUtilizadorAtual) return;

        try {
            const resposta = await fetch('http://localhost:50100/api/conta');
            if (resposta.ok) {
                const dados = await resposta.json();
                const dadosDoUtilizador = dados.filter(item => item.email === emailUtilizadorAtual);

                const metasFiltradas = dadosDoUtilizador.filter(item => {
                    const plano = item.plano ? item.plano.trim().toLowerCase() : '';
                    return plano.includes('meta') || plano.includes('planea') || plano.includes('planeja');
                });

                containerLista.innerHTML = '';

                if (metasFiltradas.length === 0) {
                    containerLista.innerHTML = '<p style="color: #94a3b8;">Nenhuma meta registada nesta conta.</p>';
                    return;
                }

                metasFiltradas.forEach(meta => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'meta-card-item';
                    itemDiv.style.backgroundColor = '#334155';
                    itemDiv.style.padding = '15px';
                    itemDiv.style.borderRadius = '6px';
                    itemDiv.style.marginBottom = '10px';
                    itemDiv.innerHTML = `
                        <h4 style="margin: 0 0 5px 0; color: #fff;">${meta.nome}</h4>
                        <p style="margin: 0; color: #cbd5e1;">Valor Planeado: ${meta.telefone}</p>
                    `;
                    containerLista.appendChild(itemDiv);
                });
            }
        } catch (erro) {
            console.error("Erro ao carregar metas:", erro);
        }
    }

    if (btnGuardar) {
        btnGuardar.addEventListener('click', salvarMeta);
    }

    if (inputDescricao) {
        inputDescricao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvarMeta();
            }
        });
    }

    if (inputValor) {
        inputValor.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvarMeta();
            }
        });
    }

    carregarMetas();
});