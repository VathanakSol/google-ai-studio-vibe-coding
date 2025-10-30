
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
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1589030343991-69ea1433b941?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1615526675250-dbe5d4302ae0?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1481189778967-d3704873d34e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578096319707-ff6b2edf0757?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1621747569404-49888b101cac?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509762774605-f07235a08f1f?w=600&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
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
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=1200&h=600&fit=crop',
];
