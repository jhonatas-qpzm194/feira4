document.addEventListener('DOMContentLoaded', () => {
    const inputReceita = document.querySelectorAll('.input-dash')[0];
    const inputDespesa = document.querySelectorAll('.input-dash')[1]; 

    
    const formatarMoeda = (valor) => {
        let v = String(valor).replace(/\D/g, ''); 
        v = (v / 100).toFixed(2) + ''; 
        v = v.replace('.', ','); 
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); 
        return 'R$ ' + v; 
    };

    
    [inputReceita, inputDespesa].forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    e.target.value = formatarMoeda(e.target.value); 
                }
            });
        }
    });

    
    const ctx = document.getElementById('meuGrafico');
    if (ctx) {
        new Chart(ctx.getContext('2d'), { 
            type: 'doughnut', 
            data: {
                labels: ['Moradia', 'Alimentação', 'Transporte', 'Lazer'], 
                datasets: [{
                    data: [1500, 1200, 600, 450], 
                    backgroundColor: ['#2563eb', '#8a2be2', '#005f73', '#6a5acd'], 
                    borderWidth: 2, 
                    borderColor: '#ffffff' 
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: {
                    legend: { position: 'bottom' } 
                }
            }
        });
    }
});