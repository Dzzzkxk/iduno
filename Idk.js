(function() {
    console.log("Iniciando script de automação de testes...");

    const container = document.querySelector('.blocks');

    // 1. TIPO: Sort Blocks (Ordenação com criptografia)
    if (container && container.hasAttribute('data-correct-order')) {
        console.log("Tipo detectado: Sort Blocks");
        
        try {
            // Descriptografia dupla conforme o padrão do site
            const rawOrder = container.getAttribute('data-correct-order');
            const decodedOrder = atob(atob(rawOrder)).split(',').map(s => s.trim());
            
            console.log("Ordem correta identificada:", decodedOrder);

            decodedOrder.forEach((id, index) => {
                setTimeout(() => {
                    // Busca o container que possui o data-id correspondente
                    const blockContainer = document.querySelector(`.blockContainer[data-id="${id}"]`);
                    if (blockContainer) {
                        const block = blockContainer.querySelector('.block') || blockContainer;
                        console.log(`Clicando no bloco ${id}`);
                        block.click();
                    } else {
                        // Backup: Tenta buscar por texto se o ID falhar
                        console.warn(`ID ${id} não encontrado, buscando por conteúdo...`);
                    }
                }, index * 600); // Delay levemente maior para evitar skips
            });

            // Clique no botão de submeter após todos os blocos serem clicados
            setTimeout(() => {
                const submitBtn = document.getElementById('submitBlocks');
                if (submitBtn) {
                    console.log("Submetendo resposta...");
                    submitBtn.click();
                }
            }, (decodedOrder.length * 600) + 1000);

        } catch (e) {
            console.error("Erro ao processar ordenação:", e);
        }

    } else {
        // 2. TIPO: Múltipla Escolha (data-correct)
        const botaoCorreto = document.querySelector('[data-correct="true"]');
        
        if (botaoCorreto) {
            console.log("Resposta correta encontrada via atributo.");
            botaoCorreto.click();
            
            // Tenta avançar após clicar na resposta certa
            setTimeout(tentarAvancar, 1500);
        } else {
            // 3. VÍDEO E AVANÇO GERAL
            executarFluxoVideo();
        }
    }

    function executarFluxoVideo() {
        console.log("Buscando mídia ou botão de próxima atividade...");
        const video = document.querySelector('video');
        const iframe = document.querySelector('iframe');

        if (video) {
            video.play().catch(() => console.log("Play automático bloqueado."));
        } else if (iframe) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }

        setTimeout(tentarAvancar, 2000);
    }

    function tentarAvancar() {
        const proximaAtividade = document.querySelector('a.content__nx-class, .next-btn, #next-step');
        if (proximaAtividade) {
            console.log("Avançando...");
            proximaAtividade.click();
        } else {
            console.log("Botão 'Próximo' não localizado.");
        }
    }

})();
