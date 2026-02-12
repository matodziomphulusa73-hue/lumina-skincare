
export interface Product {
  id: string;
  name: string;
  type: string;
  benefit: string;
  ingredients: string[];
  imagePrompt: string;
  texturePrompt: string;
  category: string;
  unsplashUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  avatar: string;
}

export interface GeneratedImages {
  hero?: string;
  philosophy?: string;
  guide?: string;
  diverseRepresentation?: string;
  products: Record<string, { main: string; texture: string }>;
  ingredients: Record<string, string>;
}
