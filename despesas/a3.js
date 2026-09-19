document.addEventListener('DOMContentLoaded', () => {
    const inputValor = document.getElementById('inputValorDespesa');
    const inputDescricao = document.getElementById('inputDescricaoDespesa');
    const btnGuardar = document.getElementById('btnGuardarDespesa');

    if (inputValor) {
        inputValor.addEventListener('input', (e) => {
            let v = String(e.target.value).replace(/\D/g, '');
            v = (v / 100).toFixed(2) + '';
            v = v.replace('.', ',');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = 'R$ ' + v;
        });
    }

    async function salvar() {
        const descricao = inputDescricao ? inputDescricao.value : '';
        const valor = inputValor ? inputValor.value : '';

        if (!descricao || !valor) {
            alert("Preencha todos os campos da despesa.");
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
            plano: "Despesa",
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
                alert(`Despesa guardada com sucesso na conta: ${emailUtilizadorAtual}\nDescrição: ${descricao}\nValor: ${valor}`);
                if (inputDescricao) inputDescricao.value = '';
                if (inputValor) inputValor.value = '';
            } else {
                const textoErro = await resposta.text();
                alert("Erro ao guardar despesa. Detalhe: " + textoErro);
            }
        } catch (erro) {
            console.error("Erro de rede:", erro);
            alert("Falha na conexão com o servidor.");
        }
    }

    if (btnGuardar) {
        btnGuardar.addEventListener('click', salvar);
    }

    if (inputDescricao) {
        inputDescricao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvar();
            }
        });
    }

    if (inputValor) {
        inputValor.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvar();
            }
        });
    }
});