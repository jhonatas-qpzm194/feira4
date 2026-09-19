let meuGrafico = null;

let dadosFinanceiros = {
    totalReceitas: 0,
    totalDespesas: 0
};

document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    inicializarGrafico();
});

function carregarDados() {
    atualizarDashboard(dadosFinanceiros.totalReceitas, dadosFinanceiros.totalDespesas);
}

function atualizarDashboard(receitas, despesas) {
    dadosFinanceiros.totalReceitas = receitas;
    dadosFinanceiros.totalDespesas = despesas;

    const saldo = receitas - despesas;

    document.getElementById("totalReceitas").textContent = formatarMoeda(receitas);
    document.getElementById("totalDespesas").textContent = formatarMoeda(despesas);
    document.getElementById("saldoTotal").textContent = formatarMoeda(saldo);

    const elementoSaldo = document.getElementById("saldoTotal");
    if (saldo < 0) {
        elementoSaldo.style.color = "#ef4444";
    } else {
        elementoSaldo.style.color = "#0f172a";
    }

    atualizarTagStatus(receitas, despesas);
    atualizarGrafico(receitas, despesas);
}

function atualizarTagStatus(receitas, despesas) {
    const statusTag = document.getElementById("statusSaude");

    if (receitas === 0 && despesas === 0) {
        statusTag.textContent = "Sem dados";
        statusTag.className = "tag-status";
        return;
    }

    if (receitas >= despesas) {
        statusTag.textContent = "Situação Estável";
        statusTag.className = "tag-status saudavel";
    } else {
        statusTag.textContent = "Atenção ao Saldo";
        statusTag.className = "tag-status alerta";
    }
}

function inicializarGrafico() {
    const ctx = document.getElementById("graficoFinanceiro").getContext("2d");

    meuGrafico = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Receitas", "Despesas"],
            datasets: [{
                data: [dadosFinanceiros.totalReceitas, dadosFinanceiros.totalDespesas],
                backgroundColor: ["#10b981", "#ef4444"],
                borderWidth: 2,
                borderColor: "#ffffff"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom"
                }
            },
            cutout: "70%"
        }
    });
}

function atualizarGrafico(receitas, despesas) {
    if (!meuGrafico) return;

    if (receitas === 0 && despesas === 0) {
        meuGrafico.data.datasets[0].data = [1, 0];
        meuGrafico.data.datasets[0].backgroundColor = ["#e2e8f0", "#e2e8f0"];
    } else {
        meuGrafico.data.datasets[0].data = [receitas, despesas];
        meuGrafico.data.datasets[0].backgroundColor = ["#10b981", "#ef4444"];
    }

    meuGrafico.update();
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}