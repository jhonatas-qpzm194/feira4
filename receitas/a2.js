function adicionarReceita() {

    let descricao = document.getElementById("descricao").value;
    let valor = Number(document.getElementById("valor").value);

    if (descricao === "" || valor <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let lista = document.getElementById("listaReceitas");

    let item = document.createElement("li");

    item.innerHTML = `
        💰 ${descricao} - R$ ${valor.toFixed(2)}
    `;

    lista.appendChild(item);

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
}