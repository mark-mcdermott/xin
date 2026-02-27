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

// --- Zip Hoodie images ---
const zipGreenFront = new URL('../assets/merch/mech-zip-green-front.png', import.meta.url).href;
const zipGreenBack = new URL('../assets/merch/mech-zip-green-back.png', import.meta.url).href;
const zipBlackFront = new URL('../assets/merch/mech-zip-black-front.png', import.meta.url).href;
const zipBlackBack = new URL('../assets/merch/mech-zip-black-back.png', import.meta.url).href;
const zipNavyFront = new URL('../assets/merch/mech-zip-navy-front.png', import.meta.url).href;
const zipNavyBack = new URL('../assets/merch/mech-zip-navy-back.png', import.meta.url).href;
const zipCharcoalFront = new URL('../assets/merch/mech-zip-charcoal-front.png', import.meta.url).href;
const zipCharcoalBack = new URL('../assets/merch/mech-zip-charcoal-back.png', import.meta.url).href;

// --- Pullover Hoodie images ---
const pullLavenderFront = new URL('../assets/merch/mech-pull-lavender-front.png', import.meta.url).href;
const pullLavenderBack = new URL('../assets/merch/mech-pull-lavender-back.png', import.meta.url).href;
const pullWhiteFront = new URL('../assets/merch/mech-pull-white-front.png', import.meta.url).href;
const pullWhiteBack = new URL('../assets/merch/mech-pull-white-back.png', import.meta.url).href;
const pullMaroonFront = new URL('../assets/merch/mech-pull-maroon-front.png', import.meta.url).href;
const pullMaroonBack = new URL('../assets/merch/mech-pull-maroon-back.png', import.meta.url).href;
const pullPurpleFront = new URL('../assets/merch/mech-pull-purple-front.png', import.meta.url).href;
const pullPurpleBack = new URL('../assets/merch/mech-pull-purple-back.png', import.meta.url).href;
const pullTeamRedFront = new URL('../assets/merch/mech-pull-teamred-front.png', import.meta.url).href;
const pullTeamRedBack = new URL('../assets/merch/mech-pull-teamred-back.png', import.meta.url).href;
const pullAdobeFront = new URL('../assets/merch/mech-pull-adobe-front.png', import.meta.url).href;
const pullAdobeBack = new URL('../assets/merch/mech-pull-adobe-back.png', import.meta.url).href;
const pullDustyRoseFront = new URL('../assets/merch/mech-pull-dustyrose-front.png', import.meta.url).href;
const pullDustyRoseBack = new URL('../assets/merch/mech-pull-dustyrose-back.png', import.meta.url).href;
const pullKhakiFront = new URL('../assets/merch/mech-pull-khaki-front.png', import.meta.url).href;
const pullKhakiBack = new URL('../assets/merch/mech-pull-khaki-back.png', import.meta.url).href;
const pullTeamGoldFront = new URL('../assets/merch/mech-pull-teamgold-front.png', import.meta.url).href;
const pullTeamGoldBack = new URL('../assets/merch/mech-pull-teamgold-back.png', import.meta.url).href;
const pullSkyBlueFront = new URL('../assets/merch/mech-pull-skyblue-front.png', import.meta.url).href;
const pullSkyBlueBack = new URL('../assets/merch/mech-pull-skyblue-back.png', import.meta.url).href;

// --- Sticker images ---
const sticker3 = new URL('../assets/merch/mech-sticker-3.png', import.meta.url).href;
const sticker4 = new URL('../assets/merch/mech-sticker-4.png', import.meta.url).href;
const sticker5 = new URL('../assets/merch/mech-sticker-5.png', import.meta.url).href;

// --- Horizontal sticker images ---
const stickerH3 = new URL('../assets/merch/mech-sticker-h-3.png', import.meta.url).href;
const stickerH4 = new URL('../assets/merch/mech-sticker-h-4.png', import.meta.url).href;
const stickerH5 = new URL('../assets/merch/mech-sticker-h-5.png', import.meta.url).href;
const stickerHBumper = new URL('../assets/merch/mech-sticker-h-bumper.png', import.meta.url).href;

export const products: Product[] = [
  // ─── Xin Mech Zip Hoodie ──────────────────────────────────────────
  {
    id: 'xin-mech-zip-hoodie',
    slug: 'xin-mech-zip-hoodie',
    name: 'Xin Mech Zip Hoodie',
    description: 'Unisex fleece zip up hoodie featuring the Xin mech.',
    price: 4600, // $46.00
    images: [zipBlackFront],
    colorImages: {
      'Alpine Green': [zipGreenFront, zipGreenBack],
      'Black': [zipBlackFront, zipBlackBack],
      'Classic Navy': [zipNavyFront, zipNavyBack],
      'Charcoal Heather': [zipCharcoalFront, zipCharcoalBack],
    },
    category: 'hoodie',
    printfulProductId: 420971529,
    variants: [
      // Alpine Green
      { id: 'mech-zip-green-s', size: 'S', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '699c6b5bdb4032', inStock: true },
      { id: 'mech-zip-green-m', size: 'M', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '699c6b5bdb40b3', inStock: true },
      { id: 'mech-zip-green-l', size: 'L', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '699c6b5bdb4101', inStock: true },
      { id: 'mech-zip-green-xl', size: 'XL', color: 'Alpine Green', colorHex: '#2d4a3e', printfulSyncVariantId: '699c6b5bdb4155', inStock: true },
      // Black
      { id: 'mech-zip-black-s', size: 'S', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '699c6bdb338e19', inStock: true },
      { id: 'mech-zip-black-m', size: 'M', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '699c6bdb338ed1', inStock: true },
      { id: 'mech-zip-black-l', size: 'L', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '699c6bdb338f39', inStock: true },
      { id: 'mech-zip-black-xl', size: 'XL', color: 'Black', colorHex: '#1a1a1a', printfulSyncVariantId: '699c6bdb338f83', inStock: true },
      // Classic Navy
      { id: 'mech-zip-navy-s', size: 'S', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '699c6bdb338fd4', inStock: true },
      { id: 'mech-zip-navy-m', size: 'M', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '699c6bdb339037', inStock: true },
      { id: 'mech-zip-navy-l', size: 'L', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '699c6bdb339086', inStock: true },
      { id: 'mech-zip-navy-xl', size: 'XL', color: 'Classic Navy', colorHex: '#1e2a3a', printfulSyncVariantId: '699c6bdb3390d1', inStock: true },
      // Charcoal Heather
      { id: 'mech-zip-charcoal-s', size: 'S', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '699c6bdb339126', inStock: true },
      { id: 'mech-zip-charcoal-m', size: 'M', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '699c6bdb339179', inStock: true },
      { id: 'mech-zip-charcoal-l', size: 'L', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '699c6bdb3391c9', inStock: true },
      { id: 'mech-zip-charcoal-xl', size: 'XL', color: 'Charcoal Heather', colorHex: '#4a4a4a', printfulSyncVariantId: '699c6bdb339216', inStock: true },
    ]
  },

  // ─── Xin Mech Pullover Hoodie ─────────────────────────────────────
  {
    id: 'xin-mech-pullover-hoodie',
    slug: 'xin-mech-pullover-hoodie',
    name: 'Xin Mech Pullover Hoodie',
    description: 'Unisex heavy blend pullover hoodie featuring the Xin mech.',
    price: 4100, // $41.00 (Lavender is $36.50)
    images: [pullMaroonFront],
    colorImages: {
      'Lavender': [pullLavenderFront, pullLavenderBack],
      'White': [pullWhiteFront, pullWhiteBack],
      'Maroon': [pullMaroonFront, pullMaroonBack],
      'Purple': [pullPurpleFront, pullPurpleBack],
      'Team Red': [pullTeamRedFront, pullTeamRedBack],
      'Adobe': [pullAdobeFront, pullAdobeBack],
      'Dusty Rose': [pullDustyRoseFront, pullDustyRoseBack],
      'Khaki': [pullKhakiFront, pullKhakiBack],
      'Team Gold': [pullTeamGoldFront, pullTeamGoldBack],
      'Sky Blue': [pullSkyBlueFront, pullSkyBlueBack],
    },
    category: 'hoodie',
    printfulProductId: 420849840,
    variants: [
      // Lavender ($36.50)
      { id: 'mech-pull-lavender-s', size: 'S', color: 'Lavender', colorHex: '#b4a7d6', printfulSyncVariantId: '699b6b923bfde3', inStock: true },
      { id: 'mech-pull-lavender-m', size: 'M', color: 'Lavender', colorHex: '#b4a7d6', printfulSyncVariantId: '699b6b923bfe59', inStock: true },
      { id: 'mech-pull-lavender-l', size: 'L', color: 'Lavender', colorHex: '#b4a7d6', printfulSyncVariantId: '699b6b923bfea1', inStock: true },
      { id: 'mech-pull-lavender-xl', size: 'XL', color: 'Lavender', colorHex: '#b4a7d6', printfulSyncVariantId: '699b6b923bfee7', inStock: true },
      // White
      { id: 'mech-pull-white-s', size: 'S', color: 'White', colorHex: '#f5f5f5', printfulSyncVariantId: '699b6ccbd7c742', inStock: true },
      { id: 'mech-pull-white-m', size: 'M', color: 'White', colorHex: '#f5f5f5', printfulSyncVariantId: '699b6ccbd7c7f2', inStock: true },
      { id: 'mech-pull-white-l', size: 'L', color: 'White', colorHex: '#f5f5f5', printfulSyncVariantId: '699b6ccbd7c853', inStock: true },
      { id: 'mech-pull-white-xl', size: 'XL', color: 'White', colorHex: '#f5f5f5', printfulSyncVariantId: '699b6ccbd7c8a1', inStock: true },
      // Maroon
      { id: 'mech-pull-maroon-s', size: 'S', color: 'Maroon', colorHex: '#5c1a1a', printfulSyncVariantId: '699c6fb75b3fe3', inStock: true },
      { id: 'mech-pull-maroon-m', size: 'M', color: 'Maroon', colorHex: '#5c1a1a', printfulSyncVariantId: '699c6fb75b4088', inStock: true },
      { id: 'mech-pull-maroon-l', size: 'L', color: 'Maroon', colorHex: '#5c1a1a', printfulSyncVariantId: '699c6fb75b40f8', inStock: true },
      { id: 'mech-pull-maroon-xl', size: 'XL', color: 'Maroon', colorHex: '#5c1a1a', printfulSyncVariantId: '699c6fb75b4158', inStock: true },
      // Purple
      { id: 'mech-pull-purple-s', size: 'S', color: 'Purple', colorHex: '#6b3fa0', printfulSyncVariantId: '699c6fb75b41a6', inStock: true },
      { id: 'mech-pull-purple-m', size: 'M', color: 'Purple', colorHex: '#6b3fa0', printfulSyncVariantId: '699c6fb75b41f2', inStock: true },
      { id: 'mech-pull-purple-l', size: 'L', color: 'Purple', colorHex: '#6b3fa0', printfulSyncVariantId: '699c6fb75b4243', inStock: true },
      { id: 'mech-pull-purple-xl', size: 'XL', color: 'Purple', colorHex: '#6b3fa0', printfulSyncVariantId: '699c6fb75b4292', inStock: true },
      // Team Red
      { id: 'mech-pull-teamred-s', size: 'S', color: 'Team Red', colorHex: '#c8102e', printfulSyncVariantId: '699c6fb75b42e7', inStock: true },
      { id: 'mech-pull-teamred-m', size: 'M', color: 'Team Red', colorHex: '#c8102e', printfulSyncVariantId: '699c6fb75b4333', inStock: true },
      { id: 'mech-pull-teamred-l', size: 'L', color: 'Team Red', colorHex: '#c8102e', printfulSyncVariantId: '699c6fb75b4385', inStock: true },
      { id: 'mech-pull-teamred-xl', size: 'XL', color: 'Team Red', colorHex: '#c8102e', printfulSyncVariantId: '699c6fb75b43d6', inStock: true },
      // Adobe
      { id: 'mech-pull-adobe-s', size: 'S', color: 'Adobe', colorHex: '#bd5745', printfulSyncVariantId: '699c6fb75b4422', inStock: true },
      { id: 'mech-pull-adobe-m', size: 'M', color: 'Adobe', colorHex: '#bd5745', printfulSyncVariantId: '699c6fb75b4479', inStock: true },
      { id: 'mech-pull-adobe-l', size: 'L', color: 'Adobe', colorHex: '#bd5745', printfulSyncVariantId: '699c6fb75b44c4', inStock: true },
      { id: 'mech-pull-adobe-xl', size: 'XL', color: 'Adobe', colorHex: '#bd5745', printfulSyncVariantId: '699c6fb75b4513', inStock: true },
      // Dusty Rose
      { id: 'mech-pull-dustyrose-s', size: 'S', color: 'Dusty Rose', colorHex: '#d4a5a5', printfulSyncVariantId: '699c6fb75b4566', inStock: true },
      { id: 'mech-pull-dustyrose-m', size: 'M', color: 'Dusty Rose', colorHex: '#d4a5a5', printfulSyncVariantId: '699c6fb75b45b7', inStock: true },
      { id: 'mech-pull-dustyrose-l', size: 'L', color: 'Dusty Rose', colorHex: '#d4a5a5', printfulSyncVariantId: '699c6fb75b4605', inStock: true },
      { id: 'mech-pull-dustyrose-xl', size: 'XL', color: 'Dusty Rose', colorHex: '#d4a5a5', printfulSyncVariantId: '699c6fb75b4656', inStock: true },
      // Khaki
      { id: 'mech-pull-khaki-s', size: 'S', color: 'Khaki', colorHex: '#c3b091', printfulSyncVariantId: '699c6fb75b46a4', inStock: true },
      { id: 'mech-pull-khaki-m', size: 'M', color: 'Khaki', colorHex: '#c3b091', printfulSyncVariantId: '699c6fb75b46f4', inStock: true },
      { id: 'mech-pull-khaki-l', size: 'L', color: 'Khaki', colorHex: '#c3b091', printfulSyncVariantId: '699c6fb75b4748', inStock: true },
      { id: 'mech-pull-khaki-xl', size: 'XL', color: 'Khaki', colorHex: '#c3b091', printfulSyncVariantId: '699c6fb75b4794', inStock: true },
      // Team Gold
      { id: 'mech-pull-teamgold-s', size: 'S', color: 'Team Gold', colorHex: '#d4a843', printfulSyncVariantId: '699c6fb75b47e6', inStock: true },
      { id: 'mech-pull-teamgold-m', size: 'M', color: 'Team Gold', colorHex: '#d4a843', printfulSyncVariantId: '699c6fb75b4832', inStock: true },
      { id: 'mech-pull-teamgold-l', size: 'L', color: 'Team Gold', colorHex: '#d4a843', printfulSyncVariantId: '699c6fb75b4882', inStock: true },
      { id: 'mech-pull-teamgold-xl', size: 'XL', color: 'Team Gold', colorHex: '#d4a843', printfulSyncVariantId: '699c6fb75b48d7', inStock: true },
      // Sky Blue
      { id: 'mech-pull-skyblue-s', size: 'S', color: 'Sky Blue', colorHex: '#87ceeb', printfulSyncVariantId: '699c6fb75b4922', inStock: true },
      { id: 'mech-pull-skyblue-m', size: 'M', color: 'Sky Blue', colorHex: '#87ceeb', printfulSyncVariantId: '699c6fb75b4974', inStock: true },
      { id: 'mech-pull-skyblue-l', size: 'L', color: 'Sky Blue', colorHex: '#87ceeb', printfulSyncVariantId: '699c6fb75b49c5', inStock: true },
      { id: 'mech-pull-skyblue-xl', size: 'XL', color: 'Sky Blue', colorHex: '#87ceeb', printfulSyncVariantId: '699c6fb75b4ab3', inStock: true },
    ]
  },

  // ─── Xin Mech "Form Is Emptiness" Sticker (Vertical) ─────────────
  {
    id: 'xin-mech-sticker',
    slug: 'xin-mech-sticker',
    name: 'Xin Mech "Form Is Emptiness" Sticker',
    description: 'Kiss-cut vinyl sticker featuring the Xin mech with "Form Is Emptiness" text.',
    price: 350, // $3.50 (4″ and 5.5″ are $4.00)
    images: [sticker3],
    colorImages: {
      'White': [sticker3],
    },
    category: 'sticker',
    printfulProductId: 420973294,
    variants: [
      { id: 'mech-sticker-3', size: '3″×3″', color: 'White', colorHex: '#ffffff', printfulSyncVariantId: '699c709ca3db74', inStock: true },
      { id: 'mech-sticker-4', size: '4″×4″', color: 'White', colorHex: '#ffffff', printfulSyncVariantId: '699c709ca3dbe2', inStock: true },
      { id: 'mech-sticker-5', size: '5.5″×5.5″', color: 'White', colorHex: '#ffffff', printfulSyncVariantId: '699c709ca3dc29', inStock: true },
    ]
  },

  // ─── Xin Mech "Form Is Emptiness" Sticker (Horizontal) ───────────
  {
    id: 'xin-mech-sticker-horizontal',
    slug: 'xin-mech-sticker-horizontal',
    name: 'Xin Mech "Form Is Emptiness" Sticker (Horizontal)',
    description: 'Kiss-cut vinyl sticker in horizontal layout featuring the Xin mech with "Form Is Emptiness" text.',
    price: 350, // $3.50 (larger sizes are $4.00–$8.50)
    images: [stickerH3],
    colorImages: {
      'White': [stickerH3],
    },
    category: 'sticker',
    printfulProductId: 420850934,
    variants: [
      { id: 'mech-sticker-h-3', size: '3″×3″', color: 'White', colorHex: '#ffffff', printfulSyncVariantId: '699b6d7606f603', inStock: true },
      { id: 'mech-sticker-h-4', size: '4″×4″', color: 'White', colorHex: '#ffffff', printfulSyncVariantId: '699b6d7606f666', inStock: true },
      { id: 'mech-sticker-h-5', size: '5.5″×5.5″', color: 'White', colorHex: '#ffffff', printfulSyncVariantId: '699b6d7606f6b9', inStock: true },
      { id: 'mech-sticker-h-bumper', size: '15″×3.75″', color: 'White', colorHex: '#ffffff', printfulSyncVariantId: '699b6d7606f6f3', inStock: true },
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
