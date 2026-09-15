const ctx = document.getElementById('meuGrafico').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr'],
        datasets: [
            {
                label: 'Realizado (R$)',
                data: [8000, 9500, 7000, 10500],
                backgroundColor: '#2563eb',
                borderRadius: 6
            },
            {
                label: 'Meta (R$)',
                data: [10000, 10000, 10000, 10000],
                backgroundColor: '#c5d0e6',
                borderRadius: 6
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Progresso das Metas por Mês'
            }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});