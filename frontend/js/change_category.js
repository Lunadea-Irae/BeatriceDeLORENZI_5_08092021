let configData =
{
    //..........CHANGE CATEGORY HERE (avalable teddies and cameras for now)
    'category': 'teddies',
    //.....................................................................






    'categories': {
        //................................................TEDDIES
        'teddies': {
            'header': {
                ".navbar-brand": {
                    "src": "/images/orinours-logo.svg",
                    "alt": "Logo d'Orinours, la boutique d'ours en peluche faits main."
                },
                ".product-listName": 'Nos Oursons'
            },
            'index': {
                "head": {
                    'title': 'Orinours',
                    "description": "Orinours c'est des ours en peluche de première qualité n'attendant qu'à être adoptés. Quel teddy choisirez vous ? Un site Orinoco."
                },
                '.card-footer': 'Le rencontrer',
                '#quality-guarantee': ` <h2>Un gage de qualité</h2>
                                        <p>Spécialisé dans la vente de produit de qualité, les oursons Orinoco sont sélectionnés avec le plus grand
                                            soin pour être vos meilleurs amis pour la vie.</p>
                                        <h3>Faits main</h3>
                                        <p>Les Teddies Orinoco, ou Orinours, sont tous faits mains pour un plus grand soucis du détail, de la
                                            qualité et de leur durabilité. Chaque couture a été méticuleusement vérifiée afin de veiller à leur
                                            longévité à vos cotés.</p>
                                        <h3>Des matières premières de haute qualité</h3>
                                        <p>Les Orinours sont tous constitués de matières premières hypoalergéniques et garanties sans produits
                                            cancérigères, chimiques ou perturbateurs endocriniens. Ils ont tous passé leurs tests EN71-2 et EN71-3
                                            avec mention très bien ! Félicitation à eux !</p>
                                        <h3>Une norme Européenne certifiée</h3>
                                        <p>Nous nos teddies sont certifiés par les normes européennes de l'AFNOR pour pouvoir être adapté et
                                            garantis sécurisé pour les enfants dès la naissance. Ainsi en plus des normes de matières, ils ont tous
                                            réussi leur tests physiques pour une meilleure solidité à l'épreuve des petits et des grands (Norme NF
                                            EN71.1)</p>`,
                ".contact-text": "Besoin d'un renseignement ? Ou laisser un petit mot à votre ourson préféré ? N'hésitez pas à nous le transmettre, nous le ferons passer au service ou à l'ourson le plus vite possible."
            },
            'productPage': {
                'head': {
                    //In JS document title = productName + 
                    'title': ' - Orinours',
                    'description': "Chez Orinoco nous faisons main des ours en peluche de première qualité n'attendant qu'à être adoptés."
                },
                '.btn#add-product-to-cart': "Je veux l'adopter !",
                '#product-added-validation h2': "Félicitation, cet Orinours vous attend dans votre panier",
            },
            'shopping_cartPage': {
                'head': {
                    'title': "Panier - Orinours",
                    "description": "Votre panier plein d'Orinours, d'amour et de douceur à partager."
                },
                "#empty-cart": "Pour ajouter des Orinours à votre panier, allez leur rendre visite et clickez sur le bouton \"Je veux l'adopter\"",
                "#cart-table h2": "Vos Orinours"
            },
            "orderedPage": {
                "head": {
                    "title": "Commande passée !",
                    "description": "Merci d'avoir adopté un Orinours fait main chez Orinoco."
                },
                "#order-text": `<h1>Adoption confirmée !</h1>
                <p>Félicitation ! Vos nouveaux Orinours seront très heureux d'arriver chez vous très bientot.</p>
                <h2>Adoption numéro :</h2>`
            }
        },




        //................................................CAMERAS
        'cameras': {
            'serverName': 'cameras',
            'brand': 'Orinocam',
            'header': {
                ".navbar-brand": {
                    "src": '/images/orinocam-logo.svg',
                    "alt": "Logo d'Orinocam, votre expert en appareil photo."
                },
                ".product-listName": "Nos appareils"
            },
            'index': {
                'head': {
                    'title': 'Orinocam',
                    'description': "Orinocam distribue des appareils photos d'exception avec des lentilles de première qualité. Un site Orinoco."
                },
                "#product-list": "Nos appareils",
                '.card-footer': 'En savoir plus',
                '#quality-guarantee': ` <h2>Un gage de qualité</h2>
                                        <p>Spécialisé dans la vente de produit de qualité, les chassis et lentilles Orinocam sont sélectionnés avec le plus grand soin par nos experts pour vous apporter une qualité professionnelle à chaque instant.</p>
                                        <h3>Chassis testés et approuvés</h3>
                                        <p>Nos appareils photos ne sont pas le choix d'une comparaison de tests sur le net. Ici, si un modèle vous est proposé, c'est qu'il a été testé par nos équipes techniques physiquement sur plus de 50 points de contrôles demandé par les professionnels de la photographie.</p>
                                        <h3>Des lentilles haut de gamme</h3>
                                        <p>Que serait un appareil photo, même le plus performant sans une lentille de première qualité. Nous ne travaillons qu'avec des fabriquants validés par nos tests techniques pour leur qualité, pour leur précision et leur savoir faire unique et critique pour la qualité de vos images. De plus, chaque lentille proposée avec un chassi a été choisie par nos experts la synergie entre les deux qui augmente d'autant plus la qualité de vos photophraphies.</p>
                                        <h3>Paiement 4 fois sans frais !</h3>
                                        <p>Parce que vous proposer des lentilles et appareils photos au bon prix est une des valeurs d'Orinocam, nous proposons le paiement de votre commande en 4 fois sans frais ! Une opportunité à saisir pour du matériel de professionnel sans se ruiner.</p>`,
                ".contact-text": "Pour en savoir plus sur nos produits ou sur notre démarche qualité, merci de nous envoyer un message et nous y répondrons dans les plus brefs délais."
            },
            'productPage': {
                'head': {
                    //In JS document title = productName + 
                    "title": " - Orinocam",
                    'description': "Un produit Orinocam est toujours de première qualité avec sa lentille pro préférée."
                },
                '.btn#add-product-to-cart': "Ajouter à mon panier",
                '#product-added-validation h2': "Félicitation, cet appareil est à présent dans votre panier !",
            },
            'shopping_cartPage': {
                'head': {
                    'title': "- Orinocam",
                    "description": "Votre panier contenant vos duos chassis/lentille Orinocam."
                },
                "#empty-cart": "Pour ajouter des produits à votre panier, allez sur leur fiche, sélectionnez vos options et clickez sur le bouton \"Ajouter à mon panier\"",
                "#cart-table h2": "Vos Duos"
            },
            "orderedPage": {
                "head": {
                    "title": "",
                    "description": "Merci d'avoir choisis de faire confiance à Orinocam."
                },
                "#order-text": `<h1>Commande confirmée !</h1>
                <p>Félicitation ! Vos appareils photos arriveront chez vous très bientot.</p>
                <h2>Commande numéro :</h2>`

            }
        }





    }
}

function fillHtml(page) {
    document.querySelector('.navbar-brand').src = configData.categories[configData.category].header['.navbar-brand'].src;
    document.querySelector('.navbar-brand').alt = configData.categories[configData.category].header['.navbar-brand'].alt;
    document.querySelector("[href='/index.html#product-list']").innerHTML = configData.categories[configData.category].header[".product-listName"];
    for (const [key, value] of Object.entries(configData.categories[configData.category][page])) {
        if (key === 'head') {
            document.title += value.title;
            document.querySelector('meta[name="description"]').content = value.description;
        } else {
            for (element of document.querySelectorAll(key))
                element.innerHTML = value;
        }
    }
}