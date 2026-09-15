function adicionarDespesa() {

    let descricao = document.getElementById("descricao").value;

    let categoria = document.getElementById("categoria").value;

    let valor = Number(document.getElementById("valor").value);


    if (descricao === "" || categoria === "" || valor <= 0) {

        alert("Preencha todos os campos corretamente!");

        return;
    }


    let lista = document.getElementById("listaDespesas");


    let item = document.createElement("li");


    item.innerHTML = `
        💸 ${descricao}
        <br>
        Categoria: ${categoria}
        <br>
        Valor: R$ ${valor.toFixed(2)}
    `;


    lista.appendChild(item);


    document.getElementById("descricao").value = "";

    document.getElementById("categoria").value = "";

    document.getElementById("valor").value = "";
}