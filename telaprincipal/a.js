document.addEventListener('DOMContentLoaded', () => {
    const inputReceita = document.getElementById('inputReceita');
    const inputDespesa = document.getElementById('inputDespesa');
    const btnSalvarReceita = document.getElementById('btnSalvarReceita');

    const formatarMoeda = (valor) => {
        let v = String(valor).replace(/\D/g, '');
        v = (v / 100).toFixed(2) + '';
        v = v.replace('.', ',');
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return 'R$ ' + v;
    };

    [inputReceita, inputDespesa].forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    e.target.value = formatarMoeda(e.target.value);
                }
            });
        }
    });

    if (btnSalvarReceita) {
        btnSalvarReceita.addEventListener('click', async () => {
            const valorInformado = inputReceita.value;

            if (!valorInformado) {
                alert("Por favor, preencha o valor da receita.");
                return;
            }

            try {
                const resposta = await fetch('http://localhost:50100/api/conta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: "Utilizador Principal",
                        email: "utilizador@email.com",
                        telefone: "(11) 99999-9999",
                        dataMembro: "Outubro de 2026",
                        plano: "FinanceDash Premium",
                        dataRenovacao: "18/10/2027",
                        fotoUrl: ""
                    })
                });

                if (resposta.ok) {
                    alert("Informação guardada com sucesso!");
                    inputReceita.value = '';
                } else {
                    alert("Erro ao guardar na base de dados.");
                }
            } catch (erro) {
                console.error("Erro:", erro);
                alert("Falha na ligação com o servidor da API.");
            }
        });
    }

    const ctx = document.getElementById('meuGrafico');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Moradia', 'Alimentação', 'Transporte', 'Lazer'],
                datasets: [{
                    data: [1500, 1200, 600, 450],
                    backgroundColor: ['#2563eb', '#8a2be2', '#005f73', '#6a5acd'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
});