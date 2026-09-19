document.addEventListener('DOMContentLoaded', async () => {
    let meuGrafico = null;

    async function carregarDashboardReal() {
        try {
            const resposta = await fetch('http://localhost:50100/api/conta');
            if (!resposta.ok) {
                throw new Error("Erro ao obter dados da API.");
            }

            const dados = await resposta.json();

            let totalReceitas = 0;
            let totalDespesas = 0;

            dados.forEach(item => {
                const tipo = item.plano ? item.plano.trim().toLowerCase() : '';
                let valor = 0;

                if (item.telefone) {
                    let limpo = String(item.telefone).replace('R$', '').trim();
                    limpo = limpo.replace(/\./g, '').replace(',', '.');
                    valor = parseFloat(limpo) || 0;
                }

                if (tipo === 'receita') {
                    totalReceitas += valor;
                } else if (tipo === 'despesa') {
                    totalDespesas += valor;
                }
            });

            const saldo = totalReceitas - totalDespesas;

            const cardSaldo = document.getElementById('cardSaldo');
            const cardReceitas = document.getElementById('cardReceitas');
            const cardDespesas = document.getElementById('cardDespesas');

            if (cardSaldo) cardSaldo.textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;
            if (cardReceitas) cardReceitas.textContent = `R$ ${totalReceitas.toFixed(2).replace('.', ',')}`;
            if (cardDespesas) cardDespesas.textContent = `R$ ${totalDespesas.toFixed(2).replace('.', ',')}`;

            renderizarGrafico(totalReceitas, totalDespesas);
            carregarMetas(dados);

        } catch (erro) {
            console.error("Erro ao carregar dados do dashboard:", erro);
        }
    }

    function renderizarGrafico(receitas, despesas) {
        const elementoCanvas = document.getElementById('graficoInicioReal');
        if (!elementoCanvas) return;
        const ctx = elementoCanvas.getContext('2d');

        if (meuGrafico) {
            meuGrafico.destroy();
        }

        meuGrafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Receitas', 'Despesas'],
                datasets: [{
                    label: 'Valor em R$',
                    data: [receitas, despesas],
                    backgroundColor: ['#10b981', '#ef4444'],
                    borderRadius: 8,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }

    function carregarMetas(dados) {
        const containerMetasInicio = document.getElementById('containerMetasInicio');
        if (!containerMetasInicio) return;

        const metasFiltradas = dados.filter(item => {
            const plano = item.plano ? item.plano.trim().toLowerCase() : '';
            return plano.includes('meta') || plano.includes('planea') || plano.includes('planeja');
        });

        containerMetasInicio.innerHTML = '';

        if (metasFiltradas.length === 0) {
            containerMetasInicio.innerHTML = '<p>Nenhuma meta planejada registada.</p>';
            return;
        }

        metasFiltradas.forEach(meta => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'meta-card-item';
            itemDiv.innerHTML = `
                <h4>${meta.nome}</h4>
                <p>Valor Planeado: ${meta.telefone}</p>
                <p>Data: ${meta.data_membro}</p>
            `;
            containerMetasInicio.appendChild(itemDiv);
        });
    }

    carregarDashboardReal();
});