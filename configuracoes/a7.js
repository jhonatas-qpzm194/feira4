const formConfig = document.getElementById('formConfig');

if (formConfig) {
    formConfig.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const corTema = document.getElementById('corTema').value;
        const notifEmail = document.getElementById('notifEmail').checked;

        // Exemplo de salvamento simples no localStorage
        localStorage.setItem('usuarioNome', nome);
        localStorage.setItem('temaCor', corTema);
        localStorage.setItem('notifEmail', notifEmail);

        alert('Configurações salvas com sucesso!');
    });
}