let receitas = 0;
let despesas = 0;

function adicionarReceita() {
    let valor = Number(document.getElementById("receita").value);

    if (valor <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    receitas = receitas + valor;

    atualizarSaldo();

    document.getElementById("receita").value = "";
}

function adicionarDespesa() {
    let valor = Number(document.getElementById("despesa").value);

    if (valor <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    despesas = despesas + valor;

    atualizarSaldo();

    document.getElementById("despesa").value = "";
}

function atualizarSaldo() {
    let saldo = receitas - despesas;

    document.getElementById("resultado").innerHTML =
        "Saldo: R$ " + saldo.toFixed(2);
}

