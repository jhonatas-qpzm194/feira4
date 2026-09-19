document.addEventListener('DOMContentLoaded', () => {
    const inputNome = document.getElementById('inputNome');
    const inputEmail = document.getElementById('inputEmail');
    const inputTelefone = document.getElementById('inputTelefone');
    const inputArquivoFoto = document.getElementById('inputArquivoFoto');
    const btnTrocarFoto = document.querySelector('.btn-trocar-foto');
    
    const nomeTopo = document.getElementById('nomeUsuarioTopo');
    const emailTopo = document.getElementById('emailUsuarioTopo');
    const badgePlano = document.getElementById('badgePlanoTopo');
    const infoPlanoNome = document.getElementById('infoPlanoNome');
    const infoMembro = document.getElementById('infoMembroDesde');
    const infoRenovacao = document.getElementById('infoRenovacao');
    const fotoPreview = document.getElementById('fotoPerfilPreview');
    
    const btnGuardar = document.getElementById('btnGuardarConta');
    const statusSalvamento = document.querySelector('.status-salvamento');

    let base64FotoTemp = '';

    if (inputArquivoFoto) {
        inputArquivoFoto.style.display = 'none';
    }

    if (btnTrocarFoto && inputArquivoFoto) {
        btnTrocarFoto.addEventListener('click', () => {
            inputArquivoFoto.click();
        });
    }

    async function carregarConta() {
        try {
            const resposta = await fetch('http://localhost:50100/api/conta');
            if (!resposta.ok) {
                throw new Error("Erro ao buscar dados da conta.");
            }

            const dados = await resposta.json();
            const emailSalvo = localStorage.getItem('utilizadorLogadoEmail');
            
            let contaAtual = null;
            if (emailSalvo) {
                contaAtual = dados.find(item => item.email === emailSalvo);
            }

            if (!contaAtual && dados.length > 0) {
                contaAtual = dados[dados.length - 1];
            }

            if (contaAtual) {
                inputNome.value = contaAtual.nome || '';
                inputEmail.value = contaAtual.email || '';
                inputTelefone.value = contaAtual.telefone || '';

                if (contaAtual.email) {
                    localStorage.setItem('utilizadorLogadoEmail', contaAtual.email);
                }

                if (nomeTopo) nomeTopo.textContent = contaAtual.nome || 'Utilizador';
                if (emailTopo) emailTopo.textContent = contaAtual.email || 'utilizador@email.com';
                
                const planoTexto = contaAtual.plano || 'Pro';
                if (badgePlano) badgePlano.textContent = `Plano ${planoTexto}`;
                if (infoPlanoNome) infoPlanoNome.textContent = `FinanceDash ${planoTexto}`;
                
                if (infoMembro) infoMembro.textContent = contaAtual.dataMembro || '2026';
                if (infoRenovacao) infoRenovacao.textContent = contaAtual.dataRenovacao || '31/12/2026';

                if (contaAtual.fotoUrl && fotoPreview) {
                    fotoPreview.src = contaAtual.fotoUrl;
                    base64FotoTemp = contaAtual.fotoUrl;
                }
            }
        } catch (erro) {
            console.error("Erro:", erro);
        }
    }

    if (inputArquivoFoto) {
        inputArquivoFoto.addEventListener('change', (e) => {
            const ficheiro = e.target.files[0];
            if (ficheiro) {
                const leitor = new FileReader();
                leitor.onload = function(evento) {
                    base64FotoTemp = evento.target.result;
                    if (fotoPreview) {
                        fotoPreview.src = base64FotoTemp;
                    }
                };
                leitor.readAsDataURL(ficheiro);
            }
        });
    }

    if (btnGuardar) {
        btnGuardar.addEventListener('click', async () => {
            const novoEmail = inputEmail.value.trim();
            if (!novoEmail) {
                alert("O campo de e-mail é obrigatório.");
                return;
            }

            localStorage.setItem('utilizadorLogadoEmail', novoEmail);

            try {
                const resposta = await fetch('http://localhost:50100/api/conta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: inputNome.value,
                        email: novoEmail,
                        telefone: inputTelefone.value,
                        dataMembro: infoMembro ? infoMembro.textContent : '2026',
                        plano: "Pro",
                        dataRenovacao: infoRenovacao ? infoRenovacao.textContent : '31/12/2026',
                        fotoUrl: base64FotoTemp || (fotoPreview ? fotoPreview.src : '')
                    })
                });

                if (resposta.ok) {
                    if (nomeTopo) nomeTopo.textContent = inputNome.value;
                    if (emailTopo) emailTopo.textContent = novoEmail;
                    if (statusSalvamento) {
                        statusSalvamento.textContent = "✅ Dados e foto atualizados com sucesso";
                        statusSalvamento.style.color = "#10b981";
                    }
                    alert("Dados da conta e foto de perfil guardados com sucesso!");
                } else {
                    alert("Erro ao guardar dados.");
                }
            } catch (erro) {
                console.error("Erro:", erro);
                alert("Falha na conexão com o servidor.");
            }
        });
    }

    carregarConta();
});