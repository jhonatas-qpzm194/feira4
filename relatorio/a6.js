document.addEventListener('DOMContentLoaded', () => {
    const btnAtualizar = document.getElementById('btnAtualizarRelatorio');
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    const elReceitas = document.getElementById('totalReceitas');
    const elDespesas = document.getElementById('totalDespesas');
    const elSaldo = document.getElementById('saldoConsolidado');

    async function carregarRelatorio() {
        try {
            const resposta = await fetch('http://localhost:50100/api/conta');
            if (!resposta.ok) {
                throw new Error("Erro ao buscar dados do servidor.");
            }

            const dados = await resposta.json();
            
            tabelaCorpo.innerHTML = '';
            let somaReceitas = 0;
            let somaDespesas = 0;

            if (dados.length === 0) {
                tabelaCorpo.innerHTML = `<tr><td colspan="4" class="vazio">Nenhum registo encontrado.</td></tr>`;
                return;
            }

            dados.forEach(item => {
                const tr = document.createElement('tr');
                
                const tipo = item.plano || 'Outros';
                let valorNumerico = 0;

                if (item.telefone) {
                    let limpo = String(item.telefone).replace('R$', '').trim();
                    limpo = limpo.replace(/\./g, '').replace(',', '.');
                    valorNumerico = parseFloat(limpo) || 0;
                }

                if (tipo === 'Despesa') {
                    somaDespesas += valorNumerico;
                } else if (tipo === 'Receita') {
                    somaReceitas += valorNumerico;
                }

                tr.innerHTML = `
                    <td>${item.nome || '-'}</td>
                    <td><span class="badge">${tipo}</span></td>
                    <td>${item.telefone || 'R$ 0,00'}</td>
                    <td>${item.dataMembro || '-'}</td>
                `;
                tabelaCorpo.appendChild(tr);
            });

            elReceitas.textContent = `R$ ${somaReceitas.toFixed(2).replace('.', ',')}`;
            elDespesas.textContent = `R$ ${somaDespesas.toFixed(2).replace('.', ',')}`;
            
            const saldo = somaReceitas - somaDespesas;
            elSaldo.textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;

        } catch (erro) {
            console.error("Erro:", erro);
            tabelaCorpo.innerHTML = `<tr><td colspan="4" class="vazio">Falha ao conectar com a API.</td></tr>`;
        }
    }

    if (btnAtualizar) {
        btnAtualizar.addEventListener('click', carregarRelatorio);
    }

    carregarRelatorio();
});