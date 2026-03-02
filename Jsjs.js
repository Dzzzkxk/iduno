(function() {
    console.log("Iniciando script de automação (Busca por data-text)...");

    const container = document.querySelector('.blocks');

    // 1. TIPO: Sort Blocks / Criptografia
    if (container && container.hasAttribute('data-correct-order')) {
        console.log("Tipo detectado: Atividade com Criptografia");
        
        try {
            const rawOrder = container.getAttribute('data-correct-order');
            // Decodifica a string (Base64 dupla) e limpa espaços
            const decodedOrder = atob(atob(rawOrder)).split(',').map(s => s.trim());
            
            console.log("Sequência de respostas identificada:", decodedOrder);

            decodedOrder.forEach((val, index) => {
                setTimeout(() => {
                    // Tenta achar por data-id ou por data-text (valor exato)
                    let element = document.querySelector(`[data-id="${val}"]`) || 
                                  document.querySelector(`[data-text="${val}"]`) ||
                                  document.querySelector(`.blockContainer[data-id="${val}"] .block`);

                    if (element) {
                        console.log(`Clicando no item: ${val}`);
                        element.click();
                    } else {
                        console.error(`Não foi possível encontrar o elemento para: ${val}`);
                    }
                }, index * 600);
            });

            // Finalização
            setTimeout(() => {
                const submitBtn = document.getElementById('submitBlocks') || document.querySelector('.btn-submit');
                if (submitBtn) {
                    console.log("Enviando atividade...");
                    submitBtn.click();
                }
            }, (decodedOrder.length * 600) + 1000);

        } catch (e) {
            console.error("Erro na descriptografia ou seleção:", e);
        }

    } else {
        // 2. TIPO: Múltipla Escolha Simples
        const botaoCorreto = document.querySelector('[data-correct="true"]');
        if (botaoCorreto) {
            console.log("Resposta correta (booleana) encontrada.");
            botaoCorreto.click();
            setTimeout(avancar, 1000);
        } else {
            // 3. VÍDEOS OU AVANÇO AUTOMÁTICO
            gerenciarMidiaEAvanco();
        }
    }

    function gerenciarMidiaEAvanco() {
        const video = document.querySelector('video');
        const iframe = document.querySelector('iframe');

        if (video) video.play().catch(() => {});
        if (iframe) iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');

        setTimeout(avancar, 2500);
    }

    function avancar() {
        const btnNext = document.querySelector('a.content__nx-class, .next-btn, .forward-btn');
        if (btnNext) {
            console.log("Indo para a próxima...");
            btnNext.click();
        }
    }
})();
