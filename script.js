document.addEventListener('DOMContentLoaded', () => {
    // 1. SÉLECTION DES ÉLÉMENTS CLÉS
    const articleList = document.getElementById('article-list');
    const mannequinWrapper = document.getElementById('mannequin-wrapper');
    const resetLookButton = document.getElementById('reset-look');
    const categoryButtons = document.querySelectorAll('.cat-btn');

    // --- LOGIQUE D'HABILLAGE (Étape 1) ---

    // Écoute les clics sur tous les articles dans le panneau de sélection
    articleList.addEventListener('click', (event) => {
        const item = event.target.closest('.article-item');

        if (item) {
            const imagePath = item.dataset.image; // Chemin de la grande image à afficher
            const itemType = item.dataset.type; // Type de l'article (robe, sac, etc.)

            // Crée un ID unique pour le calque basé sur le type d'article
            const layerId = `layer-${itemType}`;

            // 1. Cherche si ce type de calque existe déjà
            let existingLayer = document.getElementById(layerId);

            if (existingLayer) {
                // Si le calque existe, met à jour simplement la source de l'image
                existingLayer.src = imagePath;
                existingLayer.style.display = 'block'; // Assurez-vous qu'il est visible
            } else {
                // Si le calque n'existe pas, crée une nouvelle image
                const newLayer = document.createElement('img');
                newLayer.id = layerId;
                newLayer.src = imagePath;
                newLayer.alt = `Calque ${itemType}`;
                newLayer.classList.add('vetement-calque'); // Classe CSS pour le positionnement

                // Ajoute le nouveau calque au conteneur du mannequin
                mannequinWrapper.appendChild(newLayer);
            }
        }
    });

    // --- LOGIQUE DE RÉINITIALISATION (Étape 2) ---

    // Écoute le clic sur le bouton de réinitialisation
    resetLookButton.addEventListener('click', () => {
        // Sélectionne tous les calques de vêtements
        const allLayers = document.querySelectorAll('.vetement-calque');

        // Supprime chaque calque (sauf la base du mannequin)
        allLayers.forEach(layer => {
            layer.remove();
        });
        
        alert("Le look a été réinitialisé !");
    });

    // --- LOGIQUE DE FILTRAGE DES CATÉGORIES (Étape 3) ---

    // Ajout d'articles de test dans l'HTML par JavaScript (utile pour la démo)
    // NOTE : Idéalement, les articles devraient être chargés depuis une source de données (JSON/API)
    const allArticlesData = [
        { type: 'robes', brand: 'Dior', mini: 'images/mini_robe_dior.png', full: 'images/vetement_robe_dior.png' },
        { type: 'robes', brand: 'Versace', mini: 'images/mini_robe_versace.png', full: 'images/vetement_robe_versace.png' },
        { type: 'sacs', brand: 'Chanel', mini: 'images/mini_sac_chanel.png', full: 'images/accessoire_sac_chanel.png' },
        { type: 'manteaux', brand: 'YSL', mini: 'images/mini_manteau_ysl.png', full: 'images/vetement_manteau_ysl.png' },
        // ... ajoutez d'autres articles ...
    ];

    function displayArticles(category) {
        articleList.innerHTML = ''; // Vide la liste actuelle
        const filteredArticles = allArticlesData.filter(item => category === 'all' || item.type === category);

        filteredArticles.forEach(article => {
            const img = document.createElement('img');
            img.src = article.mini;
            img.alt = `Miniature ${article.brand} ${article.type}`;
            img.classList.add('article-item');
            img.dataset.type = article.type;
            img.dataset.image = article.full;
            articleList.appendChild(img);
        });
    }

    // Gestion du clic sur les boutons de catégorie
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour de la classe "active"
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Affichage des articles filtrés
            const category = button.dataset.cat;
            displayArticles(category);
        });
    });

    // Afficher les articles par défaut au chargement (ici, les robes)
    displayArticles('robes');
});
