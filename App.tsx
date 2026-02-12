
import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, TESTIMONIALS, HERO_UNSPLASH, TEXTURE_UNSPLASH, CATEGORIES, BUNDLE_IMAGE } from './constants';
import { Product, GeneratedImages } from './types';
import { generateBrandImage } from './services/geminiService';
import { Search, Menu, X, Instagram, Facebook, Twitter, ArrowRight, Droplets, Sparkles, CheckCircle2, Package, ShoppingBag, Info, Eye, Zap, ShieldCheck, ChevronLeft } from 'lucide-react';

const CACHE_KEY = 'lumina_ai_images_cache_v2';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'experience'>('home');
  
  const [aiImages, setAiImages] = useState<GeneratedImages>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : { products: {}, ingredients: {} };
    } catch {
      return { products: {}, ingredients: {} };
    }
  });
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY + '_categories');
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });
  const [loading, setLoading] = useState(true);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchVisuals = async () => {
      try {
        let updatedCategories = { ...categoryImages };
        let updatedAiImages = { ...aiImages };

        for (const cat of CATEGORIES) {
          if (!updatedCategories[cat.id]) {
            try {
              const img = await generateBrandImage(cat.prompt);
              if (img) {
                updatedCategories[cat.id] = img;
                setCategoryImages({ ...updatedCategories });
                localStorage.setItem(CACHE_KEY + '_categories', JSON.stringify(updatedCategories));
                await sleep(3000);
              }
            } catch (e: any) {
              if (e.message === "QUOTA_EXHAUSTED") return;
              throw e;
            }
          }
        }
        
        for (const p of PRODUCTS) {
          const needsMain = !updatedAiImages.products[p.id]?.main;
          const needsTexture = !updatedAiImages.products[p.id]?.texture;

          if (needsMain || needsTexture) {
            if (needsMain) {
              try {
                const res = await generateBrandImage(p.imagePrompt);
                if (res) {
                  updatedAiImages.products[p.id] = { ...updatedAiImages.products[p.id], main: res };
                  setAiImages({ ...updatedAiImages });
                  localStorage.setItem(CACHE_KEY, JSON.stringify(updatedAiImages));
                  await sleep(3000);
                }
              } catch (e: any) {
                if (e.message === "QUOTA_EXHAUSTED") return;
                throw e;
              }
            }

            if (needsTexture) {
              try {
                const res = await generateBrandImage(p.texturePrompt);
                if (res) {
                  updatedAiImages.products[p.id] = { 
                    ...updatedAiImages.products[p.id], 
                    texture: res,
                    main: updatedAiImages.products[p.id]?.main || ''
                  };
                  setAiImages({ ...updatedAiImages });
                  localStorage.setItem(CACHE_KEY, JSON.stringify(updatedAiImages));
                  await sleep(3000);
                }
              } catch (e: any) {
                if (e.message === "QUOTA_EXHAUSTED") return;
                throw e;
              }
            }
          }
        }
      } catch (err) {
        console.warn("Visual generation paused: Using fallbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchVisuals();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => {
      if (selectedCategory === 'Hydration') {
        return p.category === 'Hydration' || p.id === 'face-mask' || p.id === 'hyaluronic' || p.id === 'moisturiser';
      }
      if (selectedCategory === 'Treatment') {
        return p.category === 'Treatment' || p.id === 'dark-spot-corrector' || p.id === 'sun-protection' || p.id === 'under-eye' || p.id === 'retinol';
      }
      if (selectedCategory === 'Serums') {
        return p.category === 'Serums' || p.id === 'vit-c' || p.id === 'lactic-acid' || p.id === 'dark-spot-corrector';
      }
      return p.category === selectedCategory;
    });
  }, [selectedCategory]);

  const handleCategoryClick = (catId: string) => {
    setCurrentView('home');
    setSelectedCategory(catId);
    setTimeout(() => {
      const element = document.getElementById('collections');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const Nav = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || currentView === 'experience' ? 'bg-brand-bg/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-serif tracking-widest font-semibold text-brand-text cursor-pointer" 
          onClick={() => { setCurrentView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
        >
          LUMINA
        </div>
        
        <div className="hidden md:flex space-x-10 text-xs uppercase tracking-[0.2em] font-medium text-brand-text/80">
          <button 
            onClick={() => handleCategoryClick('all')} 
            className={`${selectedCategory === 'all' && currentView === 'home' ? 'text-brand-accent' : ''} hover:text-brand-accent transition-colors`}
          >
            Collections
          </button>
          <button 
            onClick={() => setCurrentView('experience')} 
            className={`${currentView === 'experience' ? 'text-brand-accent' : ''} hover:text-brand-accent transition-colors`}
          >
            The Experience
          </button>
          <a href="#rituals" className="hover:text-brand-accent transition-colors">Rituals</a>
          <a href="#footer" className="hover:text-brand-accent transition-colors">About</a>
        </div>

        <div className="flex items-center space-x-5">
          <Search size={18} className="text-brand-text cursor-pointer hover:text-brand-accent" />
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-brand-bg absolute top-full left-0 right-0 border-t border-brand-muted p-8 space-y-6 flex flex-col text-xs uppercase tracking-widest font-medium animate-fade-in">
          <button onClick={() => { handleCategoryClick('all'); setIsMenuOpen(false); }}>Collections</button>
          <button onClick={() => { setCurrentView('experience'); setIsMenuOpen(false); }}>The Experience</button>
          <a href="#rituals" onClick={() => setIsMenuOpen(false)}>Rituals</a>
          <a href="#footer" onClick={() => setIsMenuOpen(false)}>About</a>
        </div>
      )}
    </nav>
  );

  const ProductCard: React.FC<{ product: Product; idx: number }> = ({ product, idx }) => (
    <div className="group animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-muted rounded-sm mb-6 cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img 
          src={aiImages.products[product.id]?.main || product.unsplashUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-text/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform">
            <Info size={20} className="text-brand-text" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-serif text-brand-text leading-tight">{product.name}</h3>
          <span className="text-sm font-sans font-medium">$85.00</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-brand-accent font-semibold">{product.type}</p>
        <button 
          onClick={() => setSelectedProduct(product)}
          className="mt-4 w-full border border-brand-text/10 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-text hover:text-white transition-all flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  const ProductModal = () => {
    if (!selectedProduct) return null;
    const p = selectedProduct;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 animate-fade-in">
        <div className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
        <div className="relative bg-brand-bg w-full max-w-5xl overflow-y-auto max-h-[90vh] rounded-sm shadow-2xl flex flex-col md:row-span-1">
          <div className="flex flex-col md:flex-row">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-brand-bg/50 backdrop-blur hover:bg-brand-accent hover:text-white transition-all rounded-full"
            >
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
              <img 
                src={aiImages.products[p.id]?.main || p.unsplashUrl} 
                className="w-full h-full object-cover" 
                alt={p.name} 
              />
            </div>
            
            <div className="w-full md:w-1/2 p-10 sm:p-16 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-bold mb-4">{p.category} — {p.type}</span>
              <h2 className="text-4xl font-serif text-brand-text mb-6">{p.name}</h2>
              <p className="text-sm text-brand-text/70 leading-relaxed mb-10 italic">"{p.benefit}"</p>
              
              <div className="space-y-8 mb-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-text/40 mb-3">Key Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {p.ingredients.map(ing => (
                      <span key={ing} className="bg-brand-muted/50 px-3 py-1 text-[10px] uppercase tracking-widest font-medium border border-brand-muted">{ing}</span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-text/40 mb-3">Texture Experience</h4>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-brand-muted border border-brand-accent/20 ring-4 ring-brand-bg">
                       {aiImages.products[p.id]?.texture ? (
                         <img src={aiImages.products[p.id]?.texture} className="w-full h-full object-cover" alt="texture" />
                       ) : (
                         <div className="w-full h-full bg-brand-accent/10 flex items-center justify-center">
                           <Droplets size={16} className="text-brand-accent" />
                         </div>
                       )}
                    </div>
                    <p className="text-xs italic text-brand-text/60">Lightweight, fast-absorbing and clinically potent sensorial finish.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-8 border-t border-brand-muted">
                <span className="text-2xl font-sans font-medium text-brand-text">$85.00</span>
                <button className="bg-brand-text text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all flex items-center space-x-3">
                  <ShoppingBag size={16} />
                  <span>Add to Ritual</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ExperienceView = () => (
    <div className="animate-fade-in bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 mb-24 flex items-center justify-between">
        <button 
          onClick={() => setCurrentView('home')} 
          className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-brand-accent hover:text-brand-text transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back to Collections</span>
        </button>
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">The Sensorial Journey</span>
          <h2 className="text-5xl md:text-7xl font-serif text-brand-text mt-4 italic">The Lumina Experience</h2>
        </div>
        <div className="w-24 hidden md:block"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-48">
        {/* Soft & Smooth Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl relative group">
            <img 
              src="https://img.freepik.com/premium-photo/portrait-beautiful-woman-with-clear-skin-washing-face-with-foam-cleanser_23-2149207854.jpg?w=2000" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              alt="Soft Smooth Skin" 
            />
            <div className="absolute inset-0 bg-brand-text/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="space-y-8 max-w-lg">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent">Step 01: Purify</span>
            <h3 className="text-4xl md:text-6xl font-serif text-brand-text leading-tight">Soft, Smooth, <br/><span className="italic">Transformative</span></h3>
            <p className="text-lg text-brand-text/70 leading-relaxed font-light italic">
              Our cleansing ritual is the first step toward radiance. Experience a silk-like touch as our botanical foam gently lifts impurities while preserving your skin's natural moisture barrier.
            </p>
            <p className="text-brand-text/80 leading-relaxed">
              Formulated with micro-lipids, our cleansers ensure your skin feels incredibly soft and refined from the very first wash. No stripping, just pure, glowing smoothness that lasts all day. Your face won't just look cleaner; it will feel fundamentally restored and hydrated.
            </p>
            <div className="flex items-center space-x-3 text-brand-accent pt-4 border-t border-brand-muted">
              <Sparkles size={20} />
              <span className="text-xs uppercase tracking-widest font-bold">Instant Refinement Technology</span>
            </div>
          </div>
        </div>

        {/* Dark Spot Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 space-y-8 max-w-lg">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent">Step 02: Treat</span>
            <h3 className="text-4xl md:text-6xl font-serif text-brand-text leading-tight">Reveal a <br/><span className="italic">Flawless Glow</span></h3>
            <p className="text-lg text-brand-text/70 leading-relaxed font-light italic">
              Advanced targeted therapy for hyperpigmentation and persistent dark marks.
            </p>
            <p className="text-brand-text/80 leading-relaxed">
              Our clinical dark spot corrector doesn't just hide marks; it actively brightens your overall complexion. Using high-potency Tranexamic Acid and Licorice Root, it breaks down existing melanin clusters and prevents future discoloration for a perfectly uniform tone. Watch as years of environmental damage and post-acne marks fade away into a luminous, even canvas.
            </p>
            <div className="flex items-center space-x-3 text-brand-accent pt-4 border-t border-brand-muted">
              <Zap size={20} />
              <span className="text-xs uppercase tracking-widest font-bold">Clinical Tone Correction</span>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-[4/3] overflow-hidden rounded-sm shadow-2xl relative group">
            <img 
              src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/4968c6d0-91fe-44dc-b05c-073101fd47bf.__CR0,0,970,600_PT0_SX970_V1___.jpg" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              alt="Dark Spot Results" 
            />
          </div>
        </div>

        {/* Eye Care Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-2xl relative group">
            <img 
              src="https://i5.walmartimages.com/asr/70b87d85-2b15-4d58-acdd-65bd526ff1a7.54d9ab67a0e5f4fbf9802139d9f8af20.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              alt="Under Eye Care" 
            />
          </div>
          <div className="space-y-8 max-w-lg">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent">Step 03: Awaken</span>
            <h3 className="text-4xl md:text-6xl font-serif text-brand-text leading-tight">Awaken <br/><span className="italic">Tired Eyes</span></h3>
            <p className="text-lg text-brand-text/70 leading-relaxed font-light italic">
              Erase puffiness and banish dark circles with our caffeine-charged awakening cream.
            </p>
            <p className="text-brand-text/80 leading-relaxed">
              Our under-eye ritual targets the delicate skin with surgical precision. It instantly cools on contact, reducing the appearance of "eye bags" and fine lines. Peptides and antioxidants work overnight to strengthen the skin structure, giving you a refreshed, wide-awake look every single morning. Say goodbye to the signs of fatigue and hello to vibrant, revitalized eyes.
            </p>
            <div className="flex items-center space-x-3 text-brand-accent pt-4 border-t border-brand-muted">
              <Eye size={20} />
              <span className="text-xs uppercase tracking-widest font-bold">Deep Depuffing Technology</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_UNSPLASH} 
            className="w-full h-full object-cover animate-slide-in-hero"
            alt="Skin Radiance"
          />
          <div className="absolute inset-0 bg-brand-bg/20"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-serif text-brand-text mb-8 leading-tight animate-fade-in-up">
            The Science of <br />
            <span className="italic">Radiance</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-text/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
            Discover our meticulously crafted botanical formulations designed for unparalleled glow and clinical efficacy.
          </p>
          <div className="flex justify-center animate-fade-in-up delay-400">
            <button 
              onClick={() => handleCategoryClick('all')}
              className="bg-brand-accent text-white px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold hover:bg-brand-text transition-all shadow-lg hover:shadow-xl"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Visual Collections Navigation */}
      <section id="collections-nav" className="py-24 bg-brand-bg border-y border-brand-muted overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">Shop by Need</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-text mt-4 italic">Our Collections</h2>
        </div>
        
        <div className="relative">
          <div className="flex space-x-8 animate-marquee whitespace-nowrap">
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, idx) => (
              <button 
                key={`${cat.id}-${idx}`} 
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative flex-shrink-0 w-80 h-96 overflow-hidden rounded-sm bg-brand-muted flex items-center justify-center text-center transition-all duration-500 hover:scale-[1.02]"
              >
                <img 
                  src={categoryImages[cat.id] || cat.image} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                  alt={cat.name} 
                />
                <div className="absolute inset-0 bg-brand-text/20 group-hover:bg-brand-text/10 transition-colors"></div>
                <div className="relative z-10 p-6 whitespace-normal">
                  <h3 className="text-3xl font-serif text-white tracking-widest">{cat.name}</h3>
                  <div className={`w-8 h-px bg-white/60 mx-auto mt-4 transition-all ${selectedCategory === cat.id ? 'w-16 bg-white' : 'group-hover:w-16'}`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="collections" className="py-24 md:py-32 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">The Core Collection</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-text italic">
            {selectedCategory === 'all' ? 'Clinical Foundations' : `${selectedCategory} Collection`}
          </h2>
          <div className="flex justify-center space-x-6 mt-10 flex-wrap gap-y-4">
            <button 
              onClick={() => setSelectedCategory('all')} 
              className={`text-[10px] uppercase tracking-[0.2em] font-bold pb-2 transition-all ${selectedCategory === 'all' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-brand-text/40 hover:text-brand-text/60'}`}
            >
              All Products
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold pb-2 transition-all ${selectedCategory === cat.id ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-brand-text/40 hover:text-brand-text/60'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 min-h-[400px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <ProductCard key={`${product.id}-${selectedCategory}`} product={product} idx={idx} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-brand-text/40 italic font-serif">
              New formulations arriving soon.
            </div>
          )}
        </div>
      </section>

      {/* Texture Section */}
      <section id="texture" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 order-2 md:order-1">
              <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">The Sensorial Ritual</span>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-text leading-tight">A Velvety Feel <br />Like No Other</h2>
              <p className="text-lg text-brand-text/70 leading-relaxed font-light">
                At Lumina, we believe skincare is a sensorial experience. Our formulations are crafted with a unique lipid-matrix that ensures a velvety, weightless absorption. Every touch is a promise of clinical potency and sheer luxury.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Micro-encapsulated active delivery",
                  "Non-comedogenic silk finish",
                  "Instantly cooling botanical extracts",
                  "Light-diffusing mineral complex"
                ].map(item => (
                  <li key={item} className="flex items-center space-x-3 text-brand-text/80 italic text-sm">
                    <CheckCircle2 size={16} className="text-brand-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative order-1 md:order-2">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src={TEXTURE_UNSPLASH} 
                  className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
                  alt="Product Texture Swatch"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-bg p-10 hidden lg:block shadow-xl border border-brand-muted">
                <Droplets size={32} className="text-brand-accent mb-4" />
                <p className="text-xs font-serif italic text-brand-text leading-relaxed">
                  "The most elegant <br />texture I've ever felt."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUNDLE/PACKAGE PRODUCTS SECTION */}
      <section id="rituals" className="py-24 md:py-32 bg-brand-bg/50 border-y border-brand-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-3xl">
                <img 
                  src={BUNDLE_IMAGE} 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  alt="Lumina Ritual Packages"
                />
              </div>
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-sm p-6 shadow-lg border border-brand-muted flex items-center space-x-4">
                <Package className="text-brand-accent" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Better Together</span>
              </div>
            </div>
            
            <div className="space-y-10">
              <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">Optimized Results</span>
              <h2 className="text-4xl md:text-7xl font-serif text-brand-text italic leading-tight">Complete Ritual <br />Packages</h2>
              <p className="text-lg text-brand-text/70 leading-relaxed font-light">
                Unlock the true potential of your skin by layering clinical synergy. Our curated bundles are designed to work in harmony—from the deep-purifying face wash and balancing toner to our high-potency serums and repair creams. 
              </p>
              
              <div className="space-y-6">
                <div className="p-6 border border-brand-accent/20 bg-white/50 rounded-sm hover:bg-white transition-all cursor-pointer group" onClick={() => handleCategoryClick('Hydration')}>
                  <h4 className="text-lg font-serif mb-2 group-hover:text-brand-accent transition-colors">The Morning Glow Set</h4>
                  <p className="text-sm text-brand-text/60 italic">Face Wash + Toner + Vit-C Serum</p>
                </div>
                <div className="p-6 border border-brand-accent/20 bg-white/50 rounded-sm hover:bg-white transition-all cursor-pointer group" onClick={() => handleCategoryClick('Treatment')}>
                  <h4 className="text-lg font-serif mb-2 group-hover:text-brand-accent transition-colors">The Evening Repair Ritual</h4>
                  <p className="text-sm text-brand-text/60 italic">Cleanser + Retinol + Repair Cream</p>
                </div>
              </div>
              
              <button onClick={() => handleCategoryClick('all')} className="bg-brand-text text-white px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold hover:bg-brand-accent transition-all shadow-xl group flex items-center space-x-4">
                <span>View All Bundles</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl font-serif text-brand-text italic">Real Results, Real Confidence</h2>
        </div>
        
        <div className="relative">
          <div className="flex space-x-8 animate-marquee-reverse whitespace-nowrap">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div 
                key={`${t.id}-${idx}`} 
                className="flex-shrink-0 w-[450px] bg-white p-12 rounded-sm shadow-sm space-y-6 whitespace-normal transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-brand-muted"
              >
                <div className="flex items-center space-x-4">
                  <img src={t.avatar} className="w-12 h-12 rounded-full object-cover grayscale" alt={t.name} />
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest font-bold">{t.name}</p>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(s => <Sparkles key={s} size={10} className="text-brand-accent" />)}
                    </div>
                  </div>
                </div>
                <p className="text-lg font-serif italic text-brand-text/80 leading-relaxed">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="bg-brand-bg font-sans selection:bg-brand-accent/30 overflow-x-hidden min-h-screen flex flex-col">
      <Nav />
      <ProductModal />

      <main className="flex-grow">
        {currentView === 'home' ? <HomeView /> : <ExperienceView />}
      </main>

      {/* Footer / Newsletter */}
      <footer id="footer" className="bg-brand-text text-brand-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-24 border-b border-white/10">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-serif italic">Join the Radiance Community</h2>
              <p className="text-brand-bg/60 font-light max-w-md leading-relaxed">
                Be the first to experience our newest clinical breakthroughs and receive expert skincare rituals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent border-b border-white/20 py-4 px-2 flex-grow focus:outline-none focus:border-brand-accent transition-colors uppercase tracking-widest text-xs"
                />
                <button className="bg-brand-accent text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-brand-text transition-all">
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-xs uppercase tracking-[0.3em] font-medium">
              <div className="space-y-6">
                <h5 className="text-brand-accent">Shop</h5>
                <ul className="space-y-4 text-brand-bg/50">
                  <li className="cursor-pointer hover:text-brand-bg" onClick={() => handleCategoryClick('Serums')}>All Serums</li>
                  <li className="cursor-pointer hover:text-brand-bg" onClick={() => handleCategoryClick('Hydration')}>Moisturizers</li>
                  <li className="cursor-pointer hover:text-brand-bg" onClick={() => handleCategoryClick('all')}>Cleansers</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="text-brand-accent">Support</h5>
                <ul className="space-y-4 text-brand-bg/50">
                  <li><a href="#" className="hover:text-brand-bg">Contact</a></li>
                  <li><a href="#" className="hover:text-brand-bg">Shipping</a></li>
                  <li><a href="#" className="hover:text-brand-bg">Returns</a></li>
                </ul>
              </div>
              <div className="space-y-6 col-span-2 md:col-span-1">
                <h5 className="text-brand-accent">Connect</h5>
                <div className="flex space-x-6">
                  <Instagram size={20} className="hover:text-brand-accent transition-colors cursor-pointer" />
                  <Facebook size={20} className="hover:text-brand-accent transition-colors cursor-pointer" />
                  <Twitter size={20} className="hover:text-brand-accent transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-[0.4em] uppercase text-brand-bg/30 font-bold">
            <p>&copy; {new Date().getFullYear()} LUMINA SKINCARE. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-12">
              <a href="#" className="hover:text-brand-bg">Privacy Policy</a>
              <a href="#" className="hover:text-brand-bg">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes slideInHero {
          0% {
            transform: translateX(10%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 50s linear infinite;
        }
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
        .animate-slide-in-hero {
          animation: slideInHero 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>
    </div>
  );
};

export default App;
