// Base de données produits simulée
export const mockProducts = [
  {
    id: 1,
    name: 'Burger Classic',
    description: 'Pain de bœuf, salade, tomates, cornichons',
    price: 12.50,
    category: 'burgers',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    allergens: [1, 3, 7],
    emoji: '🍔'
  },
  {
    id: 2,
    name: 'Burger Bacon',
    description: 'Pain de bœuf, bacon croustillant, fromage, salade',
    price: 14.50,
    category: 'burgers',
    image_url: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop',
    allergens: [1, 3, 7],
    emoji: '🥓'
  },
  {
    id: 3,
    name: 'Salade César',
    description: 'Salade, poulet grillé, parmesan, croûtons',
    price: 9.90,
    category: 'salades',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
    allergens: [1, 3, 4, 7],
    emoji: '🥗'
  },
  {
    id: 4,
    name: 'Salade Chèvre',
    description: 'Mesclun, chèvre chaud, noix, miel',
    price: 11.50,
    category: 'salades',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    allergens: [7, 8],
    emoji: '🐐'
  },
  {
    id: 5,
    name: 'Pizza Margherita',
    description: 'Sauce tomate, mozzarella, basilic frais',
    price: 14.00,
    category: 'pizzas',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    allergens: [1, 7],
    emoji: '🍕'
  },
  {
    id: 6,
    name: 'Pizza Pepperoni',
    description: 'Sauce tomate, mozzarella, pepperoni',
    price: 16.00,
    category: 'pizzas',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop',
    allergens: [1, 7],
    emoji: '🍕'
  },
  {
    id: 7,
    name: 'Coca-Cola',
    description: 'Boisson gazeuse rafraîchissante',
    price: 2.50,
    category: 'boissons',
    image_url: 'https://images.unsplash.com/photo-1581636625402-29d2d0b5c9c0?w=300&h=200&fit=crop',
    allergens: [],
    emoji: '🥤'
  },
  {
    id: 8,
    name: 'Bière Pression',
    description: 'Bière blonde fraîche du moment',
    price: 4.50,
    category: 'boissons',
    image_url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=200&fit=crop',
    allergens: [1],
    emoji: '🍺'
  },
  {
    id: 9,
    name: 'Jus d\'Orange',
    description: 'Jus d\'orange frais pressé',
    price: 3.50,
    category: 'boissons',
    image_url: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop',
    allergens: [],
    emoji: '🍊'
  }
]

export const mockCategories = [
  { id: 'all', name: 'Tout voir', icon: '✨', active: true },
  { id: 'burgers', name: 'Burgers', icon: '🍔', active: true },
  { id: 'salades', name: 'Salades', icon: '🥗', active: true },
  { id: 'pizzas', name: 'Pizzas', icon: '🍕', active: true },
  { id: 'boissons', name: 'Boissons', icon: '🥤', active: true }
]