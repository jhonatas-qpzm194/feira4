let despesas = [];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formDespesa");
    form.addEventListener("submit", manipularEnvio);
    renderizarInterface();
});

function manipularEnvio(evento) {
    evento.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const categoria = document.getElementById("categoria").value;
    const valor = parseFloat(document.getElementById("valor").value);

    if (!descricao || !categoria || isNaN(valor) || valor <= 0) {
        return;
    }

    const novaDespesa = {
        id: Date.now(),
        descricao: descricao,
        categoria: categoria,
        valor: valor
    };

    adicionarDespesa(novaDespesa);

    document.getElementById("formDespesa").reset();
    document.getElementById("descricao").focus();
}

function adicionarDespesa(item) {
    despesas.push(item);
    renderizarInterface();
}

function removerDespesa(id) {
    despesas = despesas.filter(item => item.id !== id);
    renderizarInterface();
}

function calcularTotal() {
    return despesas.reduce((acumulado, item) => acumulado + item.valor, 0);
}

function renderizarInterface() {
    const listaElemento = document.getElementById("listaDespesas");
    const totalElemento = document.getElementById("totalDespesas");

    listaElemento.innerHTML = "";

    if (despesas.length === 0) {
        listaElemento.innerHTML = `<li class="lista-vazia">Nenhuma despesa cadastrada.</li>`;
    } else {
        despesas.forEach(item => {
            const li = document.createElement("li");
            li.className = "item-despesa";
            li.innerHTML = `
                <div class="info-item">
                    <h4>${item.descricao}</h4>
                    <span>${item.categoria}</span>
                </div>
                <div class="valor-item">
                    <strong>- ${formatarMoeda(item.valor)}</strong>
                    <button type="button" class="btn-remover" onclick="removerDespesa(${item.id})" title="Remover">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            listaElemento.appendChild(li);
        });
    }

    totalElemento.textContent = formatarMoeda(calcularTotal());
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}