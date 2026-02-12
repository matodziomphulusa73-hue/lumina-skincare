
import { Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'vit-c',
    name: 'Vitamin C Serum',
    type: 'C-Glow Vitality',
    category: 'Serums',
    benefit: 'A potent 15% Vitamin C serum that brightens dark spots and defends against environmental stressors for a radiant complexion.',
    ingredients: ['L-Ascorbic Acid', 'Ferulic Acid', 'Vitamin E'],
    imagePrompt: 'High-end Vitamin C serum bottle, amber glass, on white stone, sunny morning lighting, minimalist, 8k.',
    texturePrompt: 'Macro of a lightweight orange-tinted liquid serum droplet.',
    unsplashUrl: 'https://i5.walmartimages.com/seo/Vitamin-C-Face-20-Aging-Facial-Super-Vit-C-with-Vitamin-E-Radiance-Enhancing-Firming-Revitalizing-Serum-for-Dark-Skin-Gifts-1-Fl-Oz-30ml_3d87b24d-7795-4cb9-857f-daeca71ecd3d.e09c78a8202e219bc6f19dd114436d74.jpeg'
  },
  {
    id: 'hyaluronic',
    name: 'Hyaluronic Acid',
    type: 'Deep Hydration Boost',
    category: 'Hydration',
    benefit: 'A multi-molecular weight hyaluronic complex that penetrates deep into the dermis to plump and hydrate.',
    ingredients: ['Niacidamide', 'Zinc PCA', 'Hyaluronic Acid'],
    imagePrompt: 'Minimalist glass dropper bottle on a light sage background, professional studio lighting, 8k.',
    texturePrompt: 'Macro of a crystal clear water-like serum droplet.',
    unsplashUrl: 'https://beautykitchen.net/wp-content/uploads/2021/01/Web-Hyaluronic-Acid-serum-1.jpg'
  },
  {
    id: 'retinol',
    name: 'Retinol Night Cream',
    type: 'Overnight Repair',
    category: 'Treatment',
    benefit: 'A clinical-strength retinol treatment that resurfaces skin and reduces the appearance of fine lines while you sleep.',
    ingredients: ['Retinol', 'Ceramides', 'Bakuchiol'],
    imagePrompt: 'A luxury white cosmetic jar on a light beige textured background, minimalist aesthetic, 8k.',
    texturePrompt: 'Macro close-up of a smooth, rich white cream swatch.',
    unsplashUrl: 'https://www.baar.com/Merchant2/graphics/00000001/retinol-night-cream-96303-Label_Revision.jpg'
  },
  {
    id: 'lactic-acid',
    name: 'Lactic Acid 5%',
    type: 'Resurface Polish',
    category: 'Serums',
    benefit: 'Gentle exfoliation for smoother, more even skin texture and tone. Perfect for sensitive skin.',
    ingredients: ['Lactic Acid', 'Tasmanian Pepperberry'],
    imagePrompt: 'Premium frosted glass skincare bottle labeled "Lactic Acid", elegant minimalist design, white marble background, 8k.',
    texturePrompt: 'Macro of a milky white semi-translucent serum texture.',
    unsplashUrl: 'https://cdn.mos.cms.futurecdn.net/whowhatwear/posts/307554/best-lactic-acid-serums-307554-1685479783211-main.jpg?interlace=true&quality=70'
  },
  {
    id: 'under-eye',
    name: 'Under Eye Cream',
    type: 'Revitalizing Wake-up',
    category: 'Treatment',
    benefit: 'Reduces puffiness and dark circles with a caffeine-infused botanical blend.',
    ingredients: ['Caffeine', 'Peptides', 'Green Tea'],
    imagePrompt: 'Luxury eye cream jar on a soft linen surface, morning light, high-end skincare photography.',
    texturePrompt: 'Macro of a light, cooling peach-tinted eye cream texture.',
    unsplashUrl: 'https://heavenlyhome.in/wp-content/uploads/2023/09/Under-eye-cream-1-PhotoRoom-1-PhotoRoom-1-1-1.webp'
  },
  {
    id: 'gel-cleanser',
    name: 'Pimple Eraser Gel Cleanser',
    type: 'Clear Skin Purifier',
    category: 'Cleansers',
    benefit: 'A deep-cleansing gel that targets blemishes and excess oil without stripping moisture.',
    ingredients: ['Salicylic Acid', 'Zinc', 'Witch Hazel'],
    imagePrompt: 'Sleek gel cleanser bottle in a splash of water, clean white background, clinical aesthetic.',
    texturePrompt: 'Macro of a clear bubbling gel texture with small oxygen beads.',
    unsplashUrl: 'https://myquickfx.com/wp-content/uploads/2024/06/PE-Gel-Cleanser-Upsize-Front-768x768.jpg'
  },
  {
    id: 'facial-rub',
    name: 'Smoothing Facial Rub',
    type: 'Gentle Polish',
    category: 'Exfoliants',
    benefit: 'A fine-grain facial rub that manually exfoliates for instant smoothness and refined pores.',
    ingredients: ['Bamboo Micro-particles', 'Aloe Vera', 'Vitamin B5'],
    imagePrompt: 'Skincare scrub tube on a wet stone surface, organic minimalist feel.',
    texturePrompt: 'Macro of a creamy white scrub with tiny smoothing granules.',
    unsplashUrl: 'https://www.pharmhealth.com/wp-content/uploads/simple_skin_smoothing_facial_scrub_75ml.jpg'
  },
  {
    id: 'toner',
    name: 'Facial Toner',
    type: 'pH Balancing Mist',
    category: 'Toners',
    benefit: 'Restores natural pH and prepares the surface for optimal serum absorption.',
    ingredients: ['Rose Water', 'Glycerin', 'Probiotics'],
    imagePrompt: 'Frosted glass toner bottle with mist spray, ethereal lighting, minimalist.',
    texturePrompt: 'Macro of fine water mist droplets on a cool glass surface.',
    unsplashUrl: 'https://hyalogic.com/wp-content/uploads/2019/12/Facial-Toner-Front.png'
  },
  {
    id: 'moisturiser',
    name: 'Daily Facial Moisturiser',
    type: 'Barrier Protection',
    category: 'Hydration',
    benefit: 'A lightweight cream that locks in moisture and strengthens the skin barrier.',
    ingredients: ['Ceramides', 'Squalane', 'Oat Extract'],
    imagePrompt: 'Modern pump bottle for face cream, clean professional studio setting, soft shadows.',
    texturePrompt: 'Macro of a thick, silky white moisturizing cream swirl.',
    unsplashUrl: 'https://www.byrdie.com/thmb/XTyMB49qBb656NtcNFRK9xKw4wU=/fit-in/1500x640/filters:no_upscale():max_bytes(150000):strip_icc()/11289613-1864444636907175-a79f70a13b104d2a84bc8e24f84b7a1e.jpg'
  },
  {
    id: 'dark-spot-corrector',
    name: 'Dark Spot Corrector',
    type: 'Luminous Tone Repair',
    category: 'Treatment',
    benefit: 'Targets persistent dark spots and post-acne marks for a more uniform complexion.',
    ingredients: ['Niacinamide', 'Tranexamic Acid', 'Licorice Root'],
    imagePrompt: 'Elegant bottle for dark spot treatment, clinical yet luxury aesthetic, minimalist background.',
    texturePrompt: 'Macro of a dense white creamy serum with a pearlescent sheen.',
    unsplashUrl: 'https://m.media-amazon.com/images/I/71c-VWQPprL._AC_.jpg'
  },
  {
    id: 'sun-protection',
    name: 'Sun Protection Facial Cream SPF 50+',
    type: 'Broad Spectrum Shield',
    category: 'Treatment',
    benefit: 'Ultra-high protection against UVA/UVB rays with a water-resistant, non-greasy finish.',
    ingredients: ['Zinc Oxide', 'Vitamin E', 'Thermal Water'],
    imagePrompt: 'Sleek sunscreen tube, professional suncare photography, bright outdoor lighting, minimalist.',
    texturePrompt: 'Macro of a thick white sunscreen cream, smooth and non-oily.',
    unsplashUrl: 'https://www.biobalance.com.tr/Uploads/Icerik_Kapak/24-spf-50plus-very-high-protection-water-resistant-sun-protection-cream09738052-c9c5-424f-9212-ae14e26c5da3.png'
  },
  {
    id: 'face-mask',
    name: 'Hyaluronic Acid Hydrating Face Mask',
    type: 'Instant Plump Ritual',
    category: 'Hydration',
    benefit: 'A concentrated sheet mask that delivers intense hydration and an immediate plumping effect.',
    ingredients: ['Hyaluronic Acid', 'Aloe Vera', 'Cucumber Extract'],
    imagePrompt: 'High-end sheet mask packaging, minimalist design, refreshing watery aesthetic.',
    texturePrompt: 'Macro of a serum-drenched sheet mask fabric texture.',
    unsplashUrl: 'https://facefacts.me/cdn/shop/products/HyaluronicSheetMaskproductshot.jpg?v=1635163706'
  }
];

export const CATEGORIES = [
  { 
    id: 'Serums', 
    name: 'Serums', 
    prompt: 'Elegant glass serum bottles, minimalist aesthetic, 8k.', 
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7be?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'Hydration', 
    name: 'Hydration', 
    prompt: 'Pure water droplets and glass jars, minimalist, 8k.', 
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'Treatment', 
    name: 'Treatment', 
    prompt: 'Luxury cosmetic jars on a textured surface, 8k.', 
    image: 'https://images.unsplash.com/photo-1598440448730-bd3413998822?auto=format&fit=crop&q=80&w=400' 
  }
];

export const HERO_UNSPLASH = 'https://www.heidicallender.com/cdn/shop/files/2ndthumbnail.png?v=1709705055';
export const TEXTURE_UNSPLASH = 'https://www.bellobello.my/wp-content/uploads/2022/08/boldlipessentials-2.jpg';
export const BUNDLE_IMAGE = 'https://img.freepik.com/premium-photo/elegant-minimalist-cosmetic-skincare-product-packaging-mockups_1278346-20982.jpg';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Eleanor V.',
    text: 'The Vitamin C serum has completely transformed my morning routine. My skin has never looked more alive.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 't2',
    name: 'Nandipha M.',
    text: 'The morning bundle is my holy grail. Starting with the cleanser and following through with the serum has given me results I never thought possible.',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 't3',
    name: 'Lerato N.',
    text: "Lumina's complete ritual package simplified my life. No more guessing which products work together. My skin has never been more hydrated.",
    avatar: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 't4',
    name: 'Marcus K.',
    text: 'Finally, a luxury brand that delivers clinical results. The Hyaluronic acid is a total staple for my dry skin.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  }
];

export const HERO_PROMPT = 'Premium high-resolution image of a diverse young woman with glowing natural skin, gently applying a clear serum to her cheek, calm satisfaction, minimalist background, bright soft lighting, 8k';
