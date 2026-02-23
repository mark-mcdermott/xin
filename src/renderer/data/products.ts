export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  printfulSyncVariantId: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // in cents
  images: string[];
  colorImages?: Record<string, string[]>; // color name -> array of image URLs
  category: 'tshirt' | 'hoodie' | 'sticker';
  printfulProductId: number;
  variants: ProductVariant[];
}

export const products: Product[] = [
  {
    id: 'xin-zipup-hoodie',
    slug: 'xin-zipup-hoodie',
    name: 'Cleanroom Skull Zip Up Hoodie',
    description: 'Unisex fleece zip up hoodie with the cleanroom skull on the front and wombat on the back.',
    price: 4600, // $46.00 (2XL is $48.00)
    images: [
      new URL('../assets/merch/zipup-black-front.png', import.meta.url).href,
    ],
    colorImages: {
      'Black': [
        new URL('../assets/merch/zipup-black-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-back.png', import.meta.url).href,
      ],
      'Classic Navy': [
        new URL('../assets/merch/zipup-navy-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-back.png', import.meta.url).href,
      ],
      'Charcoal Heather': [
        new URL('../assets/merch/zipup-charcoal-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-back.png', import.meta.url).href,
      ],
      'Alpine Green': [
        new URL('../assets/merch/zipup-green-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-front.png', import.meta.url).href,
        new URL('../assets/merch/zipup-design-back.png', import.meta.url).href,
      ],
    },
    category: 'hoodie',
    printfulProductId: 409474006,
    variants: [
      // Black
      { id: 'zipup-black-s', size: 'S', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '694f5a135165a4', inStock: true },
      { id: 'zipup-black-m', size: 'M', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '694f5a13516642', inStock: true },
      { id: 'zipup-black-l', size: 'L', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '694f5a135166c8', inStock: true },
      { id: 'zipup-black-xl', size: 'XL', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '694f5a13516757', inStock: true },
      { id: 'zipup-black-2xl', size: '2XL', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '694f5a135167d4', inStock: true },
      // Classic Navy
      { id: 'zipup-navy-s', size: 'S', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '694f5a13516861', inStock: true },
      { id: 'zipup-navy-m', size: 'M', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '694f5a135168e1', inStock: true },
      { id: 'zipup-navy-l', size: 'L', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '694f5a13516964', inStock: true },
      { id: 'zipup-navy-xl', size: 'XL', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '694f5a135169e8', inStock: true },
      { id: 'zipup-navy-2xl', size: '2XL', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '694f5a13516a69', inStock: true },
      // Charcoal Heather
      { id: 'zipup-charcoal-s', size: 'S', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '694f5a13516ae1', inStock: true },
      { id: 'zipup-charcoal-m', size: 'M', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '694f5a13516b73', inStock: true },
      { id: 'zipup-charcoal-l', size: 'L', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '694f5a13516bf1', inStock: true },
      { id: 'zipup-charcoal-xl', size: 'XL', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '694f5a13516c73', inStock: true },
      { id: 'zipup-charcoal-2xl', size: '2XL', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '694f5a13516cf4', inStock: true },
      // Alpine Green
      { id: 'zipup-green-s', size: 'S', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '694f5a13516d87', inStock: true },
      { id: 'zipup-green-m', size: 'M', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '694f5a13516e11', inStock: true },
      { id: 'zipup-green-l', size: 'L', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '694f5a13516e92', inStock: true },
      { id: 'zipup-green-xl', size: 'XL', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '694f5a13516f18', inStock: true },
      { id: 'zipup-green-2xl', size: '2XL', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '694f5a13516f93', inStock: true },
    ]
  },
];

// Helper functions
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductVariant(productId: string, variantId: string): ProductVariant | undefined {
  const product = products.find((p) => p.id === productId);
  return product?.variants.find((v) => v.id === variantId);
}

export function getAvailableSizes(product: Product): string[] {
  return [...new Set(product.variants.filter((v) => v.inStock).map((v) => v.size))];
}

export function getAvailableColors(product: Product): { color: string; hex: string }[] {
  const colors = new Map<string, string>();
  product.variants
    .filter((v) => v.inStock)
    .forEach((v) => colors.set(v.color, v.colorHex));
  return Array.from(colors.entries()).map(([color, hex]) => ({ color, hex }));
}

export function getVariantByOptions(product: Product, size: string, color: string): ProductVariant | undefined {
  return product.variants.find((v) => v.size === size && v.color === color && v.inStock);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}
