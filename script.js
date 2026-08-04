// =======================================================
   SERVICE INTERNET - Dynamic JS Logic & Interactive App
   =======================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navegación por Pestañas (Ventana Única)
    const navTabLinks = document.querySelectorAll('.nav-tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function switchTab(targetTabId) {
        navTabLinks.forEach(link => {
            if (link.getAttribute('data-tab') === targetTabId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        tabPanels.forEach(panel => {
            if (panel.id === targetTabId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    navTabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetTabId = link.getAttribute('data-tab');
            switchTab(targetTabId);
        });
    });

    // Botones dinámicos que cambian de pestaña y preseleccionan planes
    document.querySelectorAll('[data-switch-tab]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.tagName === 'A' && btn.getAttribute('href')?.includes('#')) {
                e.preventDefault();
            }
            const targetTabId = btn.getAttribute('data-switch-tab');
            switchTab(targetTabId);

            // Preselección de plan si el botón incluye data-select-plan
            const selectedPlan = btn.getAttribute('data-select-plan');
            if (selectedPlan) {
                const planSelect = document.getElementById('planType');
                if (planSelect) {
                    planSelect.value = selectedPlan;
                }
            }

            // Enfocar campo de ubicación si se cambia a cotizar
            if (targetTabId === 'tab-cotizar') {
                setTimeout(() => {
                    const locationInput = document.getElementById('locationSector');
                    if (locationInput) locationInput.focus();
                }, 150);
            }
        });
    });

    // Soporte para enlaces Hash URL (#inicio, #planes, #cotizar, #cobertura, #faq)
    function checkHash() {
        const hash = window.location.hash;
        if (hash === '#inicio') switchTab('tab-inicio');
        else if (hash === '#planes') switchTab('tab-planes');
        else if (hash === '#cotizar') switchTab('tab-cotizar');
        else if (hash === '#cobertura') switchTab('tab-cobertura');
        else if (hash === '#faq') switchTab('tab-faq');
    }
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // 2. Simulador Interactivo de Medidor de Velocidad de Red
    const btnTestSpeed = document.getElementById('btnTestSpeed');
    const speedValue = document.getElementById('speedValue');
    const downSpeed = document.getElementById('downSpeed');
    const upSpeed = document.getElementById('upSpeed');

    if (btnTestSpeed && speedValue) {
        btnTestSpeed.addEventListener('click', () => {
            btnTestSpeed.disabled = true;
            btnTestSpeed.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Midiendo Latencia y Ancho de Banda...';

            let count = 0;
            const targetSpeed = 300 + Math.floor(Math.random() * 50); // Genera entre 300 y 350 Mbps
            const interval = setInterval(() => {
                count += Math.floor(Math.random() * 25) + 15;
                if (count >= targetSpeed) {
                    count = targetSpeed;
                    clearInterval(interval);
                    btnTestSpeed.disabled = false;
                    btnTestSpeed.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Medir de Nuevo';
                }
                speedValue.textContent = count;
                if (downSpeed) downSpeed.textContent = `${count} Mbps`;
                if (upSpeed) upSpeed.textContent = `${count} Mbps`;
            }, 60);
        });
    }

    // 3. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 4. Cotizador de Internet - Envío de Mensaje a WhatsApp (961843774)
    function sendWhatsAppQuote() {
        const useType = document.getElementById('useType').value;
        const planType = document.getElementById('planType').value;
        const locationSector = document.getElementById('locationSector').value.trim();
        const urgencyLevel = document.getElementById('urgencyLevel').value;

        if (!locationSector) {
            alert('Por favor ingresa tu ubicación o sector en Bagua Grande.');
            document.getElementById('locationSector').focus();
            return;
        }

        const phone = '51961843774';
        let message = `*SOLICITUD DE COTIZACIÓN DE INTERNET*\n\n`;
        message += `🌐 *Empresa:* SERVICE INTERNET\n`;
        message += `⚡ *Lema:* El internet a tu disposición\n\n`;
        message += `🔹 *Tipo de Servicio:* ${useType}\n`;
        message += `🔹 *Plan Deseado:* ${planType}\n`;
        message += `🔹 *Ubicación:* ${locationSector} (Bagua Grande)\n`;
        message += `🔹 *Urgencia:* ${urgencyLevel}\n\n`;
        message += `Hola SERVICE INTERNET, solicito información sobre disponibilidad e instalación.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    }

    const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
    if (btnSendWhatsApp) {
        btnSendWhatsApp.addEventListener('click', sendWhatsAppQuote);
    }

    // Soporte para presionar Enter en el formulario
    const internetCalcForm = document.getElementById('internetCalcForm');
    if (internetCalcForm) {
        internetCalcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sendWhatsAppQuote();
        });
    }

});
