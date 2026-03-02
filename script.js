(function() {
    const container = document.querySelector('.blocks');

    if (container && container.hasAttribute('data-correct-order')) {
        console.log("Tipo detectado: Sort Blocks (ordem)");

        const encodedOrder = container.getAttribute('data-correct-order');
        console.log("Encoded 1:", encodedOrder);

        const firstDecode = atob(encodedOrder);
        console.log("Encoded 2:", firstDecode);

        const correctOrderString = atob(firstDecode);
        console.log("Ordem Correta:", correctOrderString);

        const order = correctOrderString.split(',').map(Number);
        const origin = document.getElementById('sortBlocksOrigin');

        order.forEach((id, index) => {
            setTimeout(() => {
                const block = origin.querySelector(`.blockContainer[data-id="${id}"] .block`);
                if (block) {
                    console.log(`Clicando no bloco: ${block.getAttribute('data-text')} (ID: ${id})`);
                    block.click();
                }
            }, index * 500);
        });

        setTimeout(() => {
            const submitBtn = document.getElementById('submitBlocks');
            if (submitBtn) {
                submitBtn.click();
                console.log("Submetido!");
            }
        }, order.length * 500 + 500);

    } else {
        const botaoCorreto = document.querySelector('[data-correct="true"]');

        if (botaoCorreto) {
            console.log("Tipo detectado: botão com data-correct=true");
            botaoCorreto.click();
        } else {
            console.log("Nenhum tipo reconhecido (data-correct-order ou data-correct=true).");
        }
    }
})();
