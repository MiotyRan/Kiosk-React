// Configuration des options de produits type McDonald's
export const PRODUCT_OPTIONS = {
    burgers: {
        sizes: [
            { id: 'normal', name: 'Normal', price: 0 },
            { id: 'maxi', name: 'Maxi', price: 2.50 }
        ],
        extras: [
            { id: 'bacon', name: 'Bacon supplémentaire', price: 1.50 },
            { id: 'cheese', name: 'Fromage supplémentaire', price: 1.00 },
            { id: 'no_onions', name: 'Sans oignons', price: 0 },
            { id: 'no_pickles', name: 'Sans cornichons', price: 0 }
        ],
        sauces: [
            { id: 'ketchup', name: 'Ketchup', price: 0 },
            { id: 'mayo', name: 'Mayonnaise', price: 0 },
            { id: 'bbq', name: 'Sauce BBQ', price: 0.50 }
        ]
    },
    boissons: {
        sizes: [
            { id: 'small', name: 'Petit (33cl)', price: 0 },
            { id: 'medium', name: 'Moyen (50cl)', price: 0.50 },
            { id: 'large', name: 'Grand (75cl)', price: 1.00 }
        ],
        ice: [
            { id: 'normal', name: 'Glaçons normaux', price: 0 },
            { id: 'no_ice', name: 'Sans glaçons', price: 0 },
            { id: 'extra_ice', name: 'Beaucoup de glaçons', price: 0 }
        ]
    },
    pizzas: {
        sizes: [
            { id: 'small', name: 'Petite (26cm)', price: 0 },
            { id: 'medium', name: 'Moyenne (30cm)', price: 3.00 },
            { id: 'large', name: 'Grande (34cm)', price: 5.00 }
        ],
        extras: [
            { id: 'extra_cheese', name: 'Supplément fromage', price: 2.00 },
            { id: 'pepperoni', name: 'Pepperoni', price: 2.50 },
            { id: 'mushrooms', name: 'Champignons', price: 1.50 },
            { id: 'olives', name: 'Olives', price: 1.50 }
        ]
    },
    salades: {
        extras: [
            { id: 'chicken', name: 'Poulet grillé', price: 3.00 },
            { id: 'bacon_bits', name: 'Lardons', price: 2.00 },
            { id: 'croutons', name: 'Croûtons', price: 1.00 },
            { id: 'extra_dressing', name: 'Sauce supplémentaire', price: 0.50 }
        ],
        sauces: [
            { id: 'caesar', name: 'Sauce César', price: 0 },
            { id: 'vinaigrette', name: 'Vinaigrette', price: 0 },
            { id: 'ranch', name: 'Sauce Ranch', price: 0.50 }
        ]
    }
};