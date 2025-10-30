
import { Category, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p101',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-fidelity audio with comfortable ear cups.',
    longDescription: 'Immerse yourself in crystal-clear audio with these advanced wireless Bluetooth headphones. Featuring active noise cancellation, a long-lasting battery, and ergonomic design for extended wear. Perfect for commuting, workouts, or just relaxing at home. Comes with a carrying case and USB-C charging cable.',
    price: 99.99,
    category: Category.Electronics,
    imageUrls: [
      'https://picsum.photos/600/400?random=1',
      'https://picsum.photos/600/400?random=2',
      'https://picsum.photos/600/400?random=3',
    ],
    stock: 15
  },
  {
    id: 'p102',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with precision.',
    longDescription: 'A sleek and powerful smart fitness watch that monitors your heart rate, sleep patterns, steps, and calories burned. Integrated GPS for outdoor activities, waterproof design, and a vibrant AMOLED display. Syncs seamlessly with your smartphone to receive notifications.',
    price: 79.99,
    category: Category.Electronics,
    imageUrls: [
      'https://picsum.photos/600/400?random=4',
      'https://picsum.photos/600/400?random=5',
      'https://picsum.photos/600/400?random=6',
    ],
    stock: 20
  },
  {
    id: 'p103',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft and breathable, made from 100% organic cotton.',
    longDescription: 'Experience ultimate comfort with our eco-friendly organic cotton t-shirt. Made from 100% sustainably sourced organic cotton, it\'s incredibly soft, breathable, and gentle on your skin. A classic fit suitable for everyday wear, available in multiple sizes and colors.',
    price: 25.00,
    category: Category.Apparel,
    imageUrls: [
      'https://picsum.photos/600/400?random=7',
      'https://picsum.photos/600/400?random=8',
      'https://picsum.photos/600/400?random=9',
    ],
    stock: 50
  },
  {
    id: 'p104',
    name: 'Men\'s Running Shoes',
    description: 'Lightweight and comfortable, perfect for daily runs.',
    longDescription: 'Engineered for performance and comfort, these men\'s running shoes feature a lightweight design with responsive cushioning. The breathable mesh upper keeps your feet cool, while the durable rubber outsole provides excellent traction. Ideal for both casual jogs and serious training.',
    price: 120.00,
    category: Category.Apparel,
    imageUrls: [
      'https://picsum.photos/600/400?random=10',
      'https://picsum.photos/600/400?random=11',
      'https://picsum.photos/600/400?random=12',
    ],
    stock: 10
  },
  {
    id: 'p105',
    name: 'The Alchemist by Paulo Coelho',
    description: 'An inspirational novel about following your dreams.',
    longDescription: 'Journey with Santiago, an Andalusian shepherd boy, as he travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Along the way, he meets a Romani woman, a king, and an alchemist, all of whom point Santiago in the direction of his quest. No one knows what the treasure is, or if Santiago will be able to surmount the obstacles along the way. But what starts out as a journey to find worldly goods turns into a discovery of the treasure found within.',
    price: 15.99,
    category: Category.Books,
    imageUrls: [
      'https://picsum.photos/600/400?random=13',
      'https://picsum.photos/600/400?random=14',
      'https://picsum.photos/600/400?random=15',
    ],
    stock: 30
  },
  {
    id: 'p106',
    name: 'Wireless Charging Pad',
    description: 'Fast and convenient charging for compatible devices.',
    longDescription: 'Say goodbye to tangled cables with this sleek wireless charging pad. Compatible with all Qi-enabled devices, it provides fast and efficient charging. Its minimalist design blends perfectly with any desk or nightstand. Features intelligent temperature control and foreign object detection for safety.',
    price: 29.99,
    category: Category.Electronics,
    imageUrls: [
      'https://picsum.photos/600/400?random=16',
      'https://picsum.photos/600/400?random=17',
      'https://picsum.photos/600/400?random=18',
    ],
    stock: 25
  },
  {
    id: 'p107',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 stylish ceramic mugs for your favorite beverages.',
    longDescription: 'Start your day right with this elegant set of four ceramic coffee mugs. Each mug holds 12oz, is dishwasher and microwave safe, and features a comfortable handle. Their timeless design makes them a perfect addition to any kitchen or office.',
    price: 35.00,
    category: Category.Home,
    imageUrls: [
      'https://picsum.photos/600/400?random=19',
      'https://picsum.photos/600/400?random=20',
      'https://picsum.photos/600/400?random=21',
    ],
    stock: 40
  },
  {
    id: 'p108',
    name: 'Modern Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness settings.',
    longDescription: 'Illuminate your workspace with this modern LED desk lamp. Featuring touch controls for adjustable brightness and color temperature, it provides customizable lighting for reading, working, or relaxing. Its flexible neck allows for precise light positioning, and the sleek design adds a contemporary touch to any desk.',
    price: 55.00,
    category: Category.Home,
    imageUrls: [
      'https://picsum.photos/600/400?random=22',
      'https://picsum.photos/600/400?random=23',
      'https://picsum.photos/600/400?random=24',
    ],
    stock: 12
  },
  {
    id: 'p109',
    name: 'Adventure Backpack',
    description: 'Durable and spacious backpack for hiking and travel.',
    longDescription: 'Designed for the adventurer, this rugged backpack offers ample storage and comfortable carrying. Made from water-resistant material, it features multiple compartments, padded shoulder straps, and a ventilated back panel. Ideal for hiking, camping, or weekend getaways.',
    price: 85.00,
    category: Category.Apparel,
    imageUrls: [
      'https://picsum.photos/600/400?random=25',
      'https://picsum.photos/600/400?random=26',
      'https://picsum.photos/600/400?random=27',
    ],
    stock: 8
  },
  {
    id: 'p110',
    name: 'Fiction Novel: The Midnight Library',
    description: 'A captivating story about life choices and parallel universes.',
    longDescription: 'Between life and death, there is a library. When Nora Seed finds herself faced with the possibility of changing her life for a new one, she must decide what is truly fulfilling. A profound and moving novel about finding happiness and embracing life.',
    price: 12.50,
    category: Category.Books,
    imageUrls: [
      'https://picsum.photos/600/400?random=28',
      'https://picsum.photos/600/400?random=29',
      'https://picsum.photos/600/400?random=30',
    ],
    stock: 22
  },
];

export const ALL_CATEGORIES: Category[] = [
  Category.All,
  Category.Electronics,
  Category.Apparel,
  Category.Books,
  Category.Home,
];

export const CAROUSEL_IMAGES: string[] = [
  'https://picsum.photos/1200/600?random=31',
  'https://picsum.photos/1200/600?random=32',
  'https://picsum.photos/1200/600?random=33',
  'https://picsum.photos/1200/600?random=34',
];
