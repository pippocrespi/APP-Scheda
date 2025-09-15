if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/APP-Scheda/service-worker.js')
        .then(reg => console.log('✅ Service Worker registrato'))
        .catch(err => console.error('❌ Errore Service Worker:', err));
}

//Codice che mostra banner se c'è una nuova versione 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {

            // Forza il controllo di aggiornamento quando l'app viene aperta
            registration.update();

            function showUpdateBanner(worker) {
                // Se non c’è connessione, non mostrare nulla
                if (!navigator.onLine) return;

                // Se il banner esiste già, non ricrearlo
                if (document.getElementById('updateBanner')) return;

                const banner = document.createElement('div');
                banner.id = 'updateBanner';
                banner.style = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          max-width: 300px;
          background: #1e88e5;
          color: #fff;
          padding: 14px 18px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          font-family: sans-serif;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 9999;
        `;
                banner.innerHTML = `
          <span>🔄 Nuova versione disponibile</span>
          <button id="updateAppBtn" style="
            margin-left: 10px;
            padding: 6px 12px;
            background: #004e98;
            color: #1e88e5;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s ease;
          ">Aggiorna</button>
        `;
                document.body.appendChild(banner);

                // Animazione comparsa
                requestAnimationFrame(() => {
                    banner.style.opacity = 1;
                    banner.style.transform = 'translateY(0)';
                });

                // Azione al clic
                document.getElementById('updateAppBtn').addEventListener('click', () => {
                    worker.postMessage({ type: 'SKIP_WAITING' });
                });
            }

            if (registration.waiting) {
                showUpdateBanner(registration.waiting);
            }

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBanner(newWorker);
                    }
                });
            });

            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    window.location.reload();
                    refreshing = true;
                }
            });

            // Nascondi il banner se si va offline
            window.addEventListener('offline', () => {
                const banner = document.getElementById('updateBanner');
                if (banner) banner.remove();
            });

            // Se si torna online, rimostra il banner se c'è un update in attesa
            window.addEventListener('online', () => {
                if (registration.waiting) {
                    showUpdateBanner(registration.waiting);
                }
            });

        });
}

