let relatorioFinanceiro = [];

document.addEventListener("DOMContentLoaded", () => {
    const inputPesquisa = document.getElementById("inputPesquisa");
    const filtroTipo = document.getElementById("filtroTipo");

    if (inputPesquisa) inputPesquisa.addEventListener("input", renderizarLista);
    if (filtroTipo) filtroTipo.addEventListener("change", renderizarLista);

    carregarRelatorioDoBanco();
});

function carregarRelatorioDoBanco() {
    atualizarResumo();
    renderizarLista();
}

function atualizarResumo() {
    const balancoEl = document.getElementById("balancoTotal");
    const receitasEl = document.getElementById("totalReceitas");
    const despesasEl = document.getElementById("totalDespesas");
    const lancamentosEl = document.getElementById("totalLancamentos");

    let totalReceitas = 0;
    let totalDespesas = 0;

    relatorioFinanceiro.forEach(item => {
        const valor = parseFloat(item.valor) || 0;
        if (item.tipo === 'receita') {
            totalReceitas += valor;
        } else if (item.tipo === 'despesa') {
            totalDespesas += valor;
        }
    });

    const balancoTotal = totalReceitas - totalDespesas;

    if (balancoEl) balancoEl.textContent = formatarMoeda(balancoTotal);
    if (receitasEl) receitasEl.textContent = formatarMoeda(totalReceitas);
    if (despesasEl) despesasEl.textContent = formatarMoeda(totalDespesas);
    if (lancamentosEl) lancamentosEl.textContent = relatorioFinanceiro.length;
}

function renderizarLista() {
    const listaElemento = document.getElementById("listaRelatorio");
    if (!listaElemento) return;

    const textoPesquisa = (document.getElementById("inputPesquisa")?.value || "").toLowerCase();
    const tipoSelecionado = document.getElementById("filtroTipo")?.value || "todos";

    const dadosFiltrados = relatorioFinanceiro.filter(item => {
        const correspondeTipo = tipoSelecionado === 'todos' || item.tipo === tipoSelecionado;
        const correspondeTexto = (item.descricao || "").toLowerCase().includes(textoPesquisa) || 
                                 (item.categoria || "").toLowerCase().includes(textoPesquisa);
        return correspondeTipo && correspondeTexto;
    });

    listaElemento.innerHTML = "";

    if (dadosFiltrados.length === 0) {
        listaElemento.innerHTML = `
            <div class="lista-vazia">
                <i class="fa-solid fa-chart-line"></i>
                <p>Nenhuma transação encontrada no relatório.</p>
            </div>
        `;
    } else {
        dadosFiltrados.forEach(item => {
            const div = document.createElement("div");
            div.className = "item-historico";

            const icone = item.tipo === 'receita' ? 'fa-solid fa-arrow-up-long' : 'fa-solid fa-arrow-down-long';
            const sinal = item.tipo === 'receita' ? '+' : '-';

            div.innerHTML = `
                <div class="item-esquerda">
                    <div class="icone-tipo ${item.tipo}">
                        <i class="${icone}"></i>
                    </div>
                    <div class="info-acao">
                        <h4>${item.descricao}</h4>
                        <p>${item.categoria || 'Geral'}</p>
                    </div>
                </div>
                <div class="item-direita">
                    <span class="valor-transacao ${item.tipo}">${sinal} ${formatarMoeda(item.valor)}</span>
                    <span class="data-hora">${item.data}</span>
                </div>
            `;
            listaElemento.appendChild(div);
        });
    }
}

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}