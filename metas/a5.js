let metas = [];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formMeta");
    form.addEventListener("submit", manipularEnvio);
    renderizarInterface();
});

function manipularEnvio(evento) {
    evento.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const valorAtual = parseFloat(document.getElementById("valorAtual").value);
    const valorObjetivo = parseFloat(document.getElementById("valorObjetivo").value);

    if (!descricao || isNaN(valorAtual) || isNaN(valorObjetivo) || valorObjetivo <= 0) {
        return;
    }

    const novaMeta = {
        id: Date.now(),
        descricao: descricao,
        valorAtual: valorAtual,
        valorObjetivo: valorObjetivo
    };

    adicionarMeta(novaMeta);

    document.getElementById("formMeta").reset();
    document.getElementById("descricao").focus();
}

function adicionarMeta(item) {
    metas.push(item);
    renderizarInterface();
}

function removerMeta(id) {
    metas = metas.filter(item => item.id !== id);
    renderizarInterface();
}

function calcularProgressoGeral() {
    if (metas.length === 0) return 0;

    const somaAtual = metas.reduce((acc, item) => acc + item.valorAtual, 0);
    const somaObjetivo = metas.reduce((acc, item) => acc + item.valorObjetivo, 0);

    const percentual = (somaAtual / somaObjetivo) * 100;
    return Math.min(percentual, 100).toFixed(1);
}

function renderizarInterface() {
    const listaElemento = document.getElementById("listaMetas");
    const progressoElemento = document.getElementById("totalProgresso");

    listaElemento.innerHTML = "";

    if (metas.length === 0) {
        listaElemento.innerHTML = `
            <div class="lista-vazia">
                <i class="fa-solid fa-folder-open"></i>
                <p>Nenhuma meta cadastrada até ao momento.</p>
            </div>
        `;
    } else {
        metas.forEach(item => {
            const pct = Math.min(((item.valorAtual / item.valorObjetivo) * 100), 100).toFixed(1);
            
            const div = document.createElement("div");
            div.className = "card-item-meta";
            div.innerHTML = `
                <div class="info-topo-meta">
                    <div class="detalhes-meta">
                        <h4>${item.descricao}</h4>
                        <p>${formatarMoeda(item.valorAtual)} de ${formatarMoeda(item.valorObjetivo)}</p>
                    </div>
                    <div class="lado-direito-meta">
                        <span class="badge-percentual">${pct}%</span>
                        <button type="button" class="btn-remover-meta" onclick="removerMeta(${item.id})" title="Remover">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div class="trilho-progresso">
                    <div class="preenchimento-progresso" style="width: ${pct}%;"></div>
                </div>
            `;
            listaElemento.appendChild(div);
        });
    }

    progressoElemento.textContent = `${calcularProgressoGeral()}%`;
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}