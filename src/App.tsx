/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Truck, 
  RotateCcw, 
  Award,
  ArrowRight,
  Instagram,
  Facebook
} from 'lucide-react';

// --- Constants & Data ---

const STORE_PHONE = "+91 63023 53933";
const WHATSAPP_NUMBER = "916302353933";
const BASE_WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const CATEGORIES = [
  { name: "Silk Sarees", icon: "🥻" },
  { name: "Cotton Sarees", icon: "🌿" },
  { name: "Bridal Collection", icon: "💍" },
  { name: "Designer Sarees", icon: "✨" },
  { name: "Party Wear", icon: "🎉" },
  { name: "Festival Specials", icon: "🏮" },
];

const BESTSELLERS = [
  {
    id: 1,
    name: "Banarasi Silk Bridal Saree",
    desc: "Royal Red & Gold Zari",
    price: "₹4,999",
    mrp: "₹6,500",
    tag: "BRIDAL",
    fabric: "Pure Banarasi Silk",
    image: "abhay-sachan-SNGPPYg1l1o-unsplash.jpg",
    waMessage: "Hello Sri Lakshmi Fashion Sarees! I am interested in the Banarasi Silk Bridal Saree - Royal Red & Gold Zari. Please share price and availability."
  },
  {
    id: 2,
    name: "Kanjivaram Silk Saree",
    desc: "Royal Blue & Silver Border",
    price: "₹3,499",
    mrp: "₹4,500",
    tag: "BESTSELLER",
    fabric: "Pure Kanjivaram Silk",
    image: "bulbul-ahmed-tjRs987fPfg-unsplash.jpg",
    waMessage: "Hello Sri Lakshmi Fashion Sarees! I am interested in the Kanjivaram Silk Saree - Royal Blue & Silver Border. Please share details."
  },
  {
    id: 3,
    name: "Handloom Cotton Sarees",
    desc: "Designer Printed Collection",
    price: "₹1,299",
    mrp: "₹1,800",
    tag: "NEW",
    fabric: "Handloom Cotton",
    image: "bulbul-ahmed-oXm1bSl87WY-unsplash.jpg",
    waMessage: "Hello Sri Lakshmi Fashion Sarees! I am interested in the Handloom Cotton Designer Printed Sarees. Please share available colors and price."
  },
  {
    id: 4,
    name: "Emerald Green Designer Saree",
    desc: "Embroidered Blouse",
    price: "₹3,199",
    mrp: "₹4,200",
    tag: "TRENDING",
    fabric: "Premium Georgette",
    image: "ikshana-productions-48VkHYUtcDo-unsplash.jpg",
    waMessage: "Hello Sri Lakshmi Fashion Sarees! I am interested in the Emerald Green Designer Saree with Embroidered Blouse. Please share details."
  },
  {
    id: 5,
    name: "Bagh Print Cotton Saree",
    desc: "Ivory & Red Block Print",
    price: "₹1,499",
    mrp: "₹2,000",
    tag: "BESTSELLER",
    fabric: "Pure Cotton Block Print",
    image: "dhruv-vishwakarma-ro42QLfg9t8-unsplash.jpg",
    waMessage: "Hello Sri Lakshmi Fashion Sarees! I am interested in the Bagh Print Cotton Saree - Ivory & Red. Please share price and availability."
  },
  {
    id: 6,
    name: "Kashmiri Embroidery Collection",
    desc: "Multi-Color Wool",
    price: "₹2,799",
    mrp: "₹3,800",
    tag: "PREMIUM",
    fabric: "Kashmiri Wool",
    image: "kunz-kashmir-Nni1Za6nwG4-unsplash.jpg",
    waMessage: "Hello Sri Lakshmi Fashion Sarees! I am interested in the Kashmiri Embroidery Collection. Please share available colors and price."
  }
];

const TESTIMONIALS = [
  {
    name: "Priya R., Kurnool",
    text: "Beautiful collection and very helpful staff! The quality of the silk is amazing.",
    rating: 5
  },
  {
    name: "Sunitha M., Nandyal",
    text: "Got my bridal saree here. Absolutely stunning quality. Everyone loved it at the wedding.",
    rating: 5
  },
  {
    name: "Lakshmi D., Kurnool",
    text: "Best saree shop in Kurnool. Trusted for years! My go-to for every festival.",
    rating: 5
  }
];

// --- Helper Components ---

const SvgLotus = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22C12 22 12 18 12 12C12 18 16 22 16 22M12 22C12 22 12 18 12 12C12 18 8 22 8 22M12 12C14 12 17 10 17 7C17 4 14 2 12 2C10 2 7 4 7 7C7 10 10 12 12 12ZM12 12C12 12 15 14 19 14C22 14 22 17 22 19C22 21 20 22 18 22C16 22 14 20 12 12ZM12 12C12 12 9 14 5 14C2 14 2 17 2 19C2 21 4 22 6 22C8 22 10 20 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PaisleyPattern = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden select-none">
    <div className="flex flex-wrap gap-20 p-10 rotate-12 scale-150">
      {Array(12).fill(0).map((_, i) => (
         <div key={i} className="w-40 h-40 border-2 border-secondary rounded-full border-t-0 border-l-0" style={{ transformOrigin: 'top left', borderRadius: '100% 0% 100% 100%' }}></div>
      ))}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (message: string) => {
    return `${BASE_WA_LINK}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-accent/10 selection:bg-secondary selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-primary text-secondary py-1.5 px-4 text-center text-[11px] font-semibold tracking-[0.2em] uppercase z-[60] relative">
        <span className="flex items-center justify-center gap-2">
          ✨ Visit us in Kurnool | <Phone className="w-3 h-3" /> {STORE_PHONE} | Free home delivery within city
        </span>
      </div>

      {/* 2. STICKY NAVBAR */}
      <nav 
        className={`sticky top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-sm py-4' : 'bg-white py-6 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif font-bold text-primary leading-none">
              Sri Lakshmi <span className="text-secondary">Fashion Sarees</span>
            </h1>
            <p className="text-[9px] font-tagline-caps text-text-muted mt-1">
              Kurnool's Trusted Saree Boutique
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[12px] uppercase font-medium tracking-wider text-text-dark">
            <a href="#" className="hover:text-secondary transition-colors">Home</a>
            <a href="#collections" className="hover:text-secondary transition-colors">Collections</a>
            <a href="#occasions" className="hover:text-secondary transition-colors">Occasions</a>
            <a href="#about" className="hover:text-secondary transition-colors">About Us</a>
            <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${STORE_PHONE.replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center gap-2 bg-whatsapp text-white px-5 py-2 rounded-full text-[12px] font-bold shadow-md hover:bg-opacity-90 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4" />
              CALL NOW
            </a>
            <button 
              className="lg:hidden p-2 text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[100] p-6 lg:hidden"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X className="w-8 h-8 text-primary" /></button>
            </div>
            <div className="flex flex-col gap-8 text-2xl font-serif text-primary mt-12">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#collections" onClick={() => setIsMenuOpen(false)}>Collections</a>
              <a href="#occasions" onClick={() => setIsMenuOpen(false)}>Occasions</a>
              <a href="#new-arrivals" onClick={() => setIsMenuOpen(false)}>New Arrivals</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[750px] flex flex-col lg:flex-row bg-accent hero-pattern overflow-hidden">
        <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border-l-4 border-secondary pl-8 space-y-10"
          >
            <div className="inline-block mb-4 text-xs font-bold tracking-[0.3em] text-secondary uppercase animate-pulse">
              ✦ Kurnool's Finest Saree Boutique ✦
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-primary leading-[0.95] tracking-tighter">
              Elegance Woven<br/>
              in Every Thread
            </h2>
            
            <p className="text-lg text-text-muted max-w-md leading-relaxed">
              Handpicked sarees for every occasion. Serving Kurnool with love and royal heritage.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#collections"
                className="bg-primary text-secondary px-8 py-4 font-bold uppercase tracking-widest text-[11px] border border-secondary hover:bg-secondary hover:text-white transition-all shadow-lg"
              >
                Explore Collection
              </a>
              <a 
                href={getWhatsAppLink("Hello! I want to explore your saree collections.")}
                target="_blank"
                rel="noopener"
                className="bg-whatsapp text-white px-8 py-4 font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Enquiry
              </a>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative bg-primary p-8 lg:p-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full h-full gold-border-thick overflow-hidden relative shadow-2xl"
          >
            <img 
              src="abhay-sachan-SNGPPYg1l1o-unsplash.jpg" 
              alt="Premium Saree"
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Floating badge */}
            <div className="absolute bottom-8 left-8 bg-white p-6 shadow-xl max-w-xs space-y-2 border-l-4 border-secondary">
              <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold block">
                Featured
              </span>
              <h3 className="text-xl font-serif text-primary leading-tight">
                Banarasi Silk Bridal Saree
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Royal Red & Gold Zari
              </p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-primary">₹4,999</span>
                <span className="text-xs text-text-muted line-through">₹6,500</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CATEGORY ROW */}
      <section id="collections" className="py-24 bg-white overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center gap-8 min-w-[1000px] lg:min-w-0">
            {CATEGORIES.map((cat, i) => (
              <motion.a
                key={i}
                href={getWhatsAppLink(`Hi Sri Lakshmi Fashion Sarees! I'm interested in looking at your ${cat.name} collection.`)}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-center gap-4 text-center cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full border-2 border-secondary p-1 transition-all duration-500 group-hover:p-0">
                  <div className="w-full h-full rounded-full bg-accent flex items-center justify-center text-4xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg">
                    {cat.icon}
                  </div>
                </div>
                <div>
                  <p className="font-serif text-[13px] uppercase font-bold text-primary tracking-widest transition-colors group-hover:text-secondary whitespace-nowrap">
                    {cat.name}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS GRID */}
      <section className="py-24 bg-accent/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-serif">Our Bestsellers</h3>
              <p className="text-text-muted">Handpicked favorites that Kurnool loves the most.</p>
            </div>
            <a href="#" className="text-primary font-bold flex items-center gap-2 group">
              View All Collection <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BESTSELLERS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-accent"
              >
                <div className="aspect-[4/5] relative overflow-hidden min-h-[320px]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-primary text-[10px] font-bold px-3 py-1 rounded-full tracking-tighter">
                      {product.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      {product.fabric}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div>
                    <h4 className="text-2xl font-serif text-primary">{product.name}</h4>
                    <p className="text-text-muted italic text-sm">{product.desc}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold text-2xl">{product.price}</span>
                    <span className="text-text-muted line-through text-sm">{product.mrp}</span>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <a 
                      href={getWhatsAppLink(product.waMessage || `Hello Sri Lakshmi Fashion Sarees! I am interested in ${product.name}. Please share price and availability.`)}
                      target="_blank"
                      rel="noopener"
                      className="w-full bg-whatsapp text-white py-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md shadow-whatsapp/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Enquire on WhatsApp
                    </a>
                    <a 
                      href={`tel:${STORE_PHONE.replace(/\s+/g, '')}`}
                      className="w-full border-2 border-whatsapp text-whatsapp py-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-whatsapp hover:text-white transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Call to Order
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRUST STRIP */}
      <section className="bg-accent/30 py-12 border-y border-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "100% Authentic", desc: "Pure Handloom Quality", icon: "🏆" },
              { title: "7-Day Returns", desc: "Easy Policy", icon: "🔄" },
              { title: "Free Delivery", desc: "Within Kurnool City", icon: "🚚" },
              { title: "WhatsApp Support", desc: "Daily 10AM - 8PM", icon: "💬" }
            ].map((trust, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="text-4xl">{trust.icon}</div>
                <div>
                  <h5 className="font-serif text-lg text-primary uppercase tracking-wider">{trust.title}</h5>
                  <p className="text-[10px] text-text-muted font-bold tracking-widest">{trust.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OCCASION BANNERS */}
      <section id="occasions" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-serif text-center mb-16">Shop by Occasion</h3>
          <div className="flex flex-col gap-8">
            {[
              { title: "Wedding Collection", desc: "Bridal sarees for your special day", tag: "🎊 Wedding", img: "abhay-sachan-SNGPPYg1l1o-unsplash.jpg" },
              { title: "Designer Wear", desc: "Emerald greens & embroidered magic", tag: "✨ Designer", img: "ikshana-productions-48VkHYUtcDo-unsplash.jpg" },
              { title: "Daily Elegance", desc: "Soft cottons for everyday comfort", tag: "💼 Daily", img: "dhruv-vishwakarma-ro42QLfg9t8-unsplash.jpg" }
            ].map((occ, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden group cursor-pointer"
              >
                <img src={occ.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 space-y-4">
                  <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs">{occ.tag}</span>
                  <h4 className="text-4xl md:text-6xl font-serif text-accent">{occ.title}</h4>
                  <p className="text-accent/80 text-lg md:text-xl font-light">{occ.desc}</p>
                  <a 
                    href={getWhatsAppLink(`Hi! I'm interested in your ${occ.title} from the website.`)}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 bg-secondary text-primary px-8 py-3 rounded-full font-bold flex items-center gap-2 group-hover:scale-110 transition-transform"
                  >
                    Enquire Now <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEW ARRIVALS */}
      <section id="new-arrivals" className="py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">Just Landed</span>
            <h3 className="text-4xl md:text-5xl font-serif">New Arrivals</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[BESTSELLERS[1], BESTSELLERS[2], BESTSELLERS[5]].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-3xl gold-border relative">
                  <img src={product.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                    <h4 className="text-2xl font-serif mb-2">{product.name}</h4>
                    <p className="text-sm text-accent/80 mb-6">{product.desc}</p>
                    <a 
                      href={getWhatsAppLink(`Hi! I'm interested in this new arrival: ${product.name}`)}
                      target="_blank"
                      rel="noopener"
                      className="bg-white text-primary py-3 rounded-full font-bold text-xs uppercase tracking-widest text-center"
                    >
                      Enquire Now
                    </a>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-secondary text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  New Arrival
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl md:text-5xl font-serif">What Kurnool Loves About Us</h3>
            <p className="text-text-muted">Directly from our happy patrons across Andhra Pradesh.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Priya R.", city: "Kurnool", text: "Beautiful bridal saree. Loved the quality!", rating: 5 },
              { name: "Sunitha M.", city: "Nandyal", text: "Best saree shop in Kurnool. 100% recommend!", rating: 5 },
              { name: "Lakshmi D.", city: "Kurnool", text: "Wonderful collection. Got my wedding saree here!", rating: 5 }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl border-l-8 border-secondary shadow-sm relative overflow-hidden"
              >
                <div className="flex text-secondary mb-6">
                  {Array(t.rating).fill(0).map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-primary italic text-lg leading-relaxed mb-8 relative z-10">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                      {t.name.charAt(0)}
                   </div>
                   <p className="font-bold text-primary">{t.name}</p>
                </div>
                <div className="absolute top-10 right-10 text-accent/30 pointer-events-none">
                  <SvgLotus className="w-24 h-24" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ABOUT THE STORE */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 items-center gap-20">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
             <div className="aspect-square bg-accent rounded-[3rem] p-12 relative overflow-hidden">
                 <img 
                    src="kunz-kashmir-Nni1Za6nwG4-unsplash.jpg" 
                    className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10" 
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-bl-[100%]" />
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-tr-[100%]" />
             </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-10 mt-12 lg:mt-0"
          >
             <div className="space-y-4">
                <span className="font-tagline text-secondary text-xl border-b-2 border-secondary/30 pb-2">Our Story</span>
                <h3 className="text-4xl md:text-6xl font-serif">Weaving Traditions Since Generations</h3>
             </div>
             <p className="text-lg leading-relaxed text-text-muted font-light">
                Sri Lakshmi Fashion Sarees is a cherished family-run boutique located in the heart of Kurnool, Andhra Pradesh. 
                We have been curating the finest silk, cotton, and designer sarees for brides, mothers, and fashion lovers across the region. 
                Every saree in our collection is personally handpicked for its quality, authenticity, and beauty.
             </p>
             <p className="text-lg leading-relaxed text-text-muted font-light">
                Our legacy is built on trust and the smiles of thousands of women who found their perfect look at SLV Nivas. 
                Opposite Skandhanshi Cloud 9, near Gundamma Bunk — we'd love to help you find yours.
             </p>
             
             <div className="p-8 border-2 border-accent rounded-3xl bg-accent/5 relative">
                <span className="absolute -top-4 -left-4 text-6xl text-secondary opacity-30 font-serif">"</span>
                <p className="text-2xl font-serif text-primary text-center">
                  Every saree tells a story. Find yours at Sri Lakshmi.
                </p>
                <div className="flex justify-center mt-4">
                  <SvgLotus className="w-8 h-8 text-secondary/40" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 11. CONTACT & VISIT SECTION */}
      <section id="contact" className="py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:flex lg:gap-16">
            <div className="lg:w-1/2 space-y-12">
               <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-serif">Visit Our Boutique</h3>
                  <p className="text-text-muted">Experience the luxury of our sarees in person. Our Kurnool flagship store is open all week.</p>
               </div>

               <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                     <div className="p-4 bg-primary text-secondary rounded-2xl group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="font-bold text-primary text-xl">Our Address</p>
                        <p className="text-text-muted">
                          Plot No. 401, 5th Floor, SLV Nivas,<br />
                          Opp. Skandhanshi Cloud 9, Near Gundamma Bunk,<br />
                          Kurnool, Andhra Pradesh — 518001
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                     <div className="p-4 bg-primary text-secondary rounded-2xl group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="font-bold text-primary text-xl">Call & WhatsApp</p>
                        <p className="text-text-muted">{STORE_PHONE}</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                     <div className="p-4 bg-primary text-secondary rounded-2xl group-hover:scale-110 transition-transform">
                        <Clock className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="font-bold text-primary text-xl">Opening Hours</p>
                        <p className="text-text-muted">
                          Mon – Sat: 10:00 AM – 8:00 PM<br />
                          Sun: 10:00 AM – 6:00 PM
                        </p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-wrap gap-4">
                  <a 
                    href={getWhatsAppLink("Hello! I want to visit your store in Kurnool.")}
                    target="_blank"
                    rel="noopener"
                    className="flex-1 min-w-[200px] bg-whatsapp text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-whatsapp/20 hover:brightness-110 transition-all"
                  >
                    <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
                  </a>
                  <a 
                    href={`tel:${STORE_PHONE.replace(/\s+/g, '')}`}
                    className="flex-1 min-w-[200px] bg-primary text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                  >
                    <Phone className="w-6 h-6" /> Call Us Now
                  </a>
               </div>
               
               <a 
                href="https://maps.google.com/?q=Kurnool+Andhra+Pradesh+518001"
                target="_blank"
                rel="noopener"
                className="block text-center w-full py-4 border-2 border-secondary text-secondary rounded-2xl font-bold hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-2"
               >
                 <MapPin className="w-5 h-5" /> Get Directions
               </a>
            </div>

            <div className="lg:w-1/2 mt-16 lg:mt-0">
               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-full min-h-[400px]">
                  <iframe 
                    src="https://maps.google.com/maps?q=Kurnool,Andhra+Pradesh,518001&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  ></iframe>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-primary pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary opacity-20" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
           <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <SvgLotus className="w-8 h-8" />
                  <span className="font-serif text-2xl font-bold tracking-tight text-accent">Sri Lakshmi</span>
                </div>
                <p className="font-tagline text-secondary text-sm tracking-widest uppercase">Fashion Sarees</p>
              </div>
              <p className="text-accent/60 leading-relaxed max-w-xs">
                Weaving Traditions, Celebrating You. Kurnool's most trusted destination for authentic handloom and boutique sarees.
              </p>
              <div className="flex gap-4">
                 <a href="#" className="w-10 h-10 border border-secondary/30 rounded-full flex items-center justify-center text-accent hover:bg-secondary hover:text-primary transition-all">
                    <Instagram className="w-5 h-5" />
                 </a>
                 <a href="#" className="w-10 h-10 border border-secondary/30 rounded-full flex items-center justify-center text-accent hover:bg-secondary hover:text-primary transition-all">
                    <Facebook className="w-5 h-5" />
                 </a>
              </div>
           </div>

           <div>
              <h5 className="font-serif text-xl border-b border-secondary/30 pb-4 mb-6 text-accent">Quick Links</h5>
              <ul className="space-y-4 text-accent/70 font-medium">
                 <li><a href="#" className="hover:text-secondary transition-colors">Home</a></li>
                 <li><a href="#collections" className="hover:text-secondary transition-colors">Our Collections</a></li>
                 <li><a href="#occasions" className="hover:text-secondary transition-colors">Occasions</a></li>
                 <li><a href="#about" className="hover:text-secondary transition-colors">About Story</a></li>
                 <li><a href="#contact" className="hover:text-secondary transition-colors">Contact Us</a></li>
              </ul>
           </div>

           <div>
              <h5 className="font-serif text-xl border-b border-secondary/30 pb-4 mb-6 text-accent">Our Collections</h5>
              <ul className="space-y-4 text-accent/70 font-medium">
                 <li><a href="#" className="hover:text-secondary transition-colors text-sm">Rich Kanjivaram</a></li>
                 <li><a href="#" className="hover:text-secondary transition-colors text-sm">Fine Chanderi</a></li>
                 <li><a href="#" className="hover:text-secondary transition-colors text-sm">Pure Banarasi</a></li>
                 <li><a href="#" className="hover:text-secondary transition-colors text-sm">Soft Mysore Silks</a></li>
                 <li><a href="#" className="hover:text-secondary transition-colors text-sm">Authentic Handlooms</a></li>
              </ul>
           </div>

           <div>
              <h5 className="font-serif text-xl border-b border-secondary/30 pb-4 mb-6 text-accent">Visit Us</h5>
              <ul className="space-y-6 text-accent/70">
                 <li className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-secondary shrink-0" />
                    <span>
                      Plot No. 401, 5th Floor, SLV Nivas, 
                      Near Gundamma Bunk, Kurnool — 518001
                    </span>
                 </li>
                 <li className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-secondary shrink-0" />
                    <span>{STORE_PHONE}</span>
                 </li>
                 <li className="flex items-center gap-4">
                    <MessageCircle className="w-5 h-5 text-secondary shrink-0" />
                    <span>{STORE_PHONE}</span>
                 </li>
              </ul>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-accent/40 text-xs">
           <p>© 2025 Sri Lakshmi Fashion Sarees, Kurnool, Andhra Pradesh. All Rights Reserved. | Designed with ❤️ for Kurnool</p>
        </div>
      </footer>

      {/* 12. FLOATING WHATSAPP BUTTON */}
      <a 
        href={getWhatsAppLink("Hello! I visited your website and want to know more about your sarees.")} 
        target="_blank"
        rel="noopener"
        className="fixed bottom-8 right-8 z-[100] group flex items-center"
      >
         <div className="absolute right-full mr-4 bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with us! 💬
         </div>
         <div className="w-16 h-16 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse-whatsapp cursor-pointer transition-transform group-hover:scale-110 active:scale-95">
            <MessageCircle className="w-10 h-10" />
         </div>
      </a>
    </div>
  );
}
