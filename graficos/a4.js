// 1. Insira aqui os seus dados reais
const meusDados = [
    { categoria: 'Janeiro',   valor: 1200 },
    { categoria: 'Fevereiro', valor: 1900 },
    { categoria: 'Março',     valor: 3000 },
    { categoria: 'Abril',     valor: 2500 },
    { categoria: 'Maio',      valor: 4200 }
];

const labels = meusDados.map(item => item.categoria); 
const valores = meusDados.map(item => item.valor); 


const ctx = document.getElementById('meuGrafico').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Total por Mês',
            data: valores,
            backgroundColor: [
                '#6A5ACD',
                '#8A2BE2',
                '#2563EB',
                '#005F73',
                '#4B0082'
            ],
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});