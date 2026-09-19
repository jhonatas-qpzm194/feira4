document.addEventListener('DOMContentLoaded', () => {
    const inputRotulo = document.getElementById('inputRotulo');
    const inputValor = document.getElementById('inputValorDado');
    const btnAdicionar = document.getElementById('btnAdicionarDado');
    const ctxDinamico = document.getElementById('graficoDinamico');

    let meuGrafico = null;

    if (ctxDinamico) {
        meuGrafico = new Chart(ctxDinamico, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Valores Inseridos',
                    data: [],
                    backgroundColor: '#10b981',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    if (inputValor) {
        inputValor.addEventListener('input', (e) => {
            let v = String(e.target.value).replace(/\D/g, '');
            v = (v / 100).toFixed(2) + '';
            v = v.replace('.', ',');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = 'R$ ' + v;
        });
    }

    if (btnAdicionar && meuGrafico) {
        btnAdicionar.addEventListener('click', () => {
            const rotulo = inputRotulo.value;
            const valorTexto = inputValor.value;

            if (!rotulo || !valorTexto) {
                alert("Preencha todos os campos para atualizar o gráfico.");
                return;
            }

            const valorNumerico = parseFloat(
                valorTexto.replace('R$', '').replace(/\./g, '').replace(',', '.')
            );

            meuGrafico.data.labels.push(rotulo);
            meuGrafico.data.datasets[0].data.push(valorNumerico);
            meuGrafico.update();

            inputRotulo.value = '';
            inputValor.value = '';
        });
    }
});