document.addEventListener('DOMContentLoaded', () => {
    const inputValor = document.getElementById('inputValorReceita');
    const inputDescricao = document.getElementById('inputDescricao');
    const btnGuardar = document.getElementById('btnGuardarReceita');

    if (inputValor) {
        inputValor.addEventListener('input', (e) => {
            let v = String(e.target.value).replace(/\D/g, '');
            v = (v / 100).toFixed(2) + '';
            v = v.replace('.', ',');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = 'R$ ' + v;
        });
    }

    if (btnGuardar) {
        btnGuardar.addEventListener('click', async () => {
            const descricao = inputDescricao.value;
            const valor = inputValor.value;

            if (!descricao || !valor) {
                alert("Preencha todos os campos da receita.");
                return;
            }

            try {
                const resposta = await fetch('http://localhost:50100/api/conta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: descricao,
                        email: "receita@email.com",
                        telefone: valor,
                        dataMembro: "2026",
                        plano: "Receita",
                        dataRenovacao: "2026",
                        fotoUrl: ""
                    })
                });

                if (resposta.ok) {
                    alert("Receita guardada com sucesso!");
                    inputDescricao.value = '';
                    inputValor.value = '';
                } else {
                    alert("Erro ao guardar receita.");
                }
            } catch (erro) {
                console.error("Erro:", erro);
                alert("Falha na conexão com o servidor.");
            }
        });
    }
});